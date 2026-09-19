// WordPress Media Library Integration Service for Essendaar
export interface WpMediaConfig {
  wpBaseUrl: string; // e.g. 'https://essendaar.com' or empty string for same-origin relative
  username: string;  // WP Username or email
  appPassword: string; // WordPress Application Password (from wp-admin > Users > Profile)
}

const STORAGE_KEY = 'essendaar_wp_credentials';

export function getStoredWpMediaConfig(): WpMediaConfig {
  if (typeof window === 'undefined') {
    return { wpBaseUrl: '', username: '', appPassword: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        wpBaseUrl: parsed.wpBaseUrl ?? '',
        username: parsed.username ?? '',
        appPassword: parsed.appPassword ?? ''
      };
    }
  } catch (err) {
    console.warn('Could not load WP Media config', err);
  }
  return { wpBaseUrl: '', username: '', appPassword: '' };
}

export function saveStoredWpMediaConfig(config: WpMediaConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Could not save WP Media config', err);
  }
}

export interface WpMediaItem {
  id: number;
  title: string;
  source_url: string;
  thumbnail_url: string;
  date: string;
  mime_type: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a file to WordPress Media Library (proxied through backend or direct REST API)
 */
export async function uploadImageToWordPressMedia(
  file: File,
  overrideConfig?: Partial<WpMediaConfig>
): Promise<{
  success: boolean;
  url?: string;
  id?: number;
  title?: string;
  source?: string;
  warning?: string;
  error?: string;
}> {
  const config = { ...getStoredWpMediaConfig(), ...overrideConfig };
  
  // Clean credentials
  const username = config.username.trim();
  const rawPassword = config.appPassword.replace(/\s+/g, ''); // Remove spaces
  
  const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  // 1. Try server-side upload proxy (/api/wp-media/upload)
  // This completely bypasses browser CORS issues and gracefully falls back to local staging if WordPress is unreachable
  try {
    const base64Data = await fileToBase64(file);
    const proxyRes = await fetch('/api/wp-media/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type || 'image/jpeg',
        base64: base64Data,
        wpBaseUrl: config.wpBaseUrl,
        username,
        appPassword: rawPassword
      })
    });

    const proxyContentType = proxyRes.headers.get('content-type') || '';
    if (proxyContentType.includes('application/json')) {
      const proxyJson = await proxyRes.json();
      if (proxyJson.success && proxyJson.url) {
        return {
          success: true,
          url: proxyJson.url,
          id: proxyJson.id,
          title: proxyJson.title || cleanTitle,
          source: proxyJson.source,
          warning: proxyJson.warning
        };
      } else if (proxyJson.error) {
        console.warn('[Proxy upload error response]:', proxyJson.error);
      }
    }
  } catch (proxyErr) {
    console.warn('[Backend proxy unavailable, falling back to direct browser fetch]:', proxyErr);
  }

  // 2. Direct browser fetch fallback
  if (!username || !rawPassword) {
    return {
      success: false,
      error: 'WordPress Username and Application Password are required. Click "Configure WordPress Credentials" to set them up.'
    };
  }

  // Determine base URL: If empty, use same-domain origin
  const baseUrl = (config.wpBaseUrl && config.wpBaseUrl.trim()) 
    ? config.wpBaseUrl.trim().replace(/\/+$/, '') 
    : (typeof window !== 'undefined' ? window.location.origin : '');

  const endpoint = `${baseUrl}/wp-json/wp/v2/media`;

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', cleanTitle);

    const authHeader = 'Basic ' + btoa(`${username}:${rawPassword}`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
      },
      body: formData
    });

    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();

    // Check if the response is an HTML document instead of JSON
    if (rawText.trim().startsWith('<') || !contentType.includes('application/json')) {
      return {
        success: false,
        error: `WordPress REST API at "${endpoint}" returned a web page (HTML) instead of JSON. This usually occurs when:
1. WordPress is not installed at "${baseUrl}" or domain DNS is still propagating.
2. Pretty Permalinks are not enabled in WP Admin > Settings > Permalinks.
3. Your site redirects unauthenticated REST requests to wp-login.php.`
      };
    }

    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch {
      return {
        success: false,
        error: 'Invalid response received from WordPress REST API (could not parse JSON).'
      };
    }

    if (!response.ok) {
      let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
      if (data && data.message) {
        errorMsg = data.message.replace(/<[^>]+>/g, '');
      }

      if (response.status === 401 || response.status === 403) {
        errorMsg = 'Authentication Failed: Please check that your WordPress Username and Application Password are correct and have editor/admin permissions.';
      } else if (response.status === 404) {
        errorMsg = `WordPress REST API endpoint not found at ${endpoint}.`;
      }

      return {
        success: false,
        error: errorMsg
      };
    }

    const uploadedUrl = data.source_url || data.guid?.rendered || '';

    if (!uploadedUrl) {
      return {
        success: false,
        error: 'Upload succeeded, but WordPress did not return a valid source_url.'
      };
    }

    return {
      success: true,
      url: uploadedUrl,
      id: data.id,
      title: data.title?.rendered || cleanTitle,
      source: 'wordpress'
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error connecting to WordPress REST API.'
    };
  }
}

/**
 * Fetches recent images from the WordPress Media Library to browse and pick
 */
export async function fetchWordPressMediaLibrary(
  overrideConfig?: Partial<WpMediaConfig>,
  page = 1,
  perPage = 24
): Promise<{
  success: boolean;
  items?: WpMediaItem[];
  totalPages?: number;
  source?: string;
  error?: string;
}> {
  const config = { ...getStoredWpMediaConfig(), ...overrideConfig };
  
  // 1. Try server-side proxy first
  try {
    const params = new URLSearchParams({
      wpBaseUrl: config.wpBaseUrl || '',
      username: config.username || '',
      appPassword: config.appPassword || '',
      page: String(page),
      perPage: String(perPage)
    });

    const proxyRes = await fetch(`/api/wp-media/library?${params.toString()}`);
    const proxyContentType = proxyRes.headers.get('content-type') || '';
    if (proxyContentType.includes('application/json')) {
      const proxyData = await proxyRes.json();
      if (proxyData.success && Array.isArray(proxyData.items)) {
        return {
          success: true,
          items: proxyData.items,
          totalPages: proxyData.totalPages || 1,
          source: proxyData.source
        };
      }
    }
  } catch (proxyErr) {
    console.warn('[Proxy library fetch failed, trying direct]:', proxyErr);
  }

  // 2. Direct browser fetch fallback
  const baseUrl = (config.wpBaseUrl && config.wpBaseUrl.trim()) 
    ? config.wpBaseUrl.trim().replace(/\/+$/, '') 
    : (typeof window !== 'undefined' ? window.location.origin : '');

  const endpoint = `${baseUrl}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}&media_type=image`;

  try {
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    if (config.username && config.appPassword) {
      const cleanPass = config.appPassword.replace(/\s+/g, '');
      headers['Authorization'] = 'Basic ' + btoa(`${config.username.trim()}:${cleanPass}`);
    }

    const response = await fetch(endpoint, { headers });
    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();

    if (rawText.trim().startsWith('<') || !contentType.includes('application/json')) {
      return {
        success: false,
        error: `Could not fetch WordPress media (server at ${baseUrl} returned a web page instead of REST API JSON).`
      };
    }

    const data = JSON.parse(rawText);
    if (!response.ok || !Array.isArray(data)) {
      return {
        success: false,
        error: `Could not fetch media from WordPress (HTTP ${response.status})`
      };
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const items: WpMediaItem[] = data.map((item: any) => ({
      id: item.id,
      title: item.title?.rendered || item.slug || `Media #${item.id}`,
      source_url: item.source_url || item.guid?.rendered,
      thumbnail_url: item.media_details?.sizes?.medium?.source_url || item.media_details?.sizes?.thumbnail?.source_url || item.source_url,
      date: item.date || '',
      mime_type: item.mime_type || 'image/jpeg'
    })).filter(i => !!i.source_url);

    return {
      success: true,
      items,
      totalPages,
      source: 'wordpress'
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network connection failed'
    };
  }
}
