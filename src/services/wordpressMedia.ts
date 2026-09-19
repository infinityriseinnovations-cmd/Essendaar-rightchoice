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
      error: 'WordPress Username and Application Password are required. Click "Connection Settings" to configure them.'
    };
  }

  // Determine base URL: If empty, use same-domain origin
  const baseUrl = (config.wpBaseUrl && config.wpBaseUrl.trim()) 
    ? config.wpBaseUrl.trim().replace(/\/+$/, '') 
    : (typeof window !== 'undefined' ? window.location.origin : '');

  // Endpoints to attempt:
  // 1. Query parameter REST route: index.php?rest_route=/wp/v2/media (bypasses Apache/cPanel SPA rewrites and works with any permalink settings)
  // 2. Pretty permalink: /wp-json/wp/v2/media
  const endpointsToTry = [
    `${baseUrl}/index.php?rest_route=/wp/v2/media`,
    `${baseUrl}/wp-json/wp/v2/media`
  ];

  const authHeader = 'Basic ' + btoa(`${username}:${rawPassword}`);
  let lastError = '';

  for (const endpoint of endpointsToTry) {
    try {
      // First attempt: Standard WordPress REST API raw binary upload with Content-Disposition
      let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Disposition': `attachment; filename="${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}"`,
          'Content-Type': file.type || 'image/jpeg',
          'Accept': 'application/json'
        },
        body: file
      });

      let contentType = response.headers.get('content-type') || '';
      let rawText = await response.text();

      // If this endpoint returned an HTML web page (e.g. index.html fallback), skip to next endpoint
      if (rawText.trim().startsWith('<') || (!contentType.includes('application/json') && !rawText.trim().startsWith('{'))) {
        console.warn(`[WordPress Upload] Endpoint ${endpoint} returned HTML, trying fallback endpoint...`);
        continue;
      }

      // If binary method resulted in 400 or 415, retry with multipart FormData
      if (response.status === 400 || response.status === 415) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', cleanTitle);

        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/json'
          },
          body: formData
        });

        contentType = response.headers.get('content-type') || '';
        rawText = await response.text();
      }

      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        lastError = 'Invalid response received from WordPress REST API (non-JSON).';
        continue;
      }

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
        if (data && data.message) {
          errorMsg = data.message.replace(/<[^>]+>/g, '');
        }

        if (response.status === 401 || response.status === 403) {
          return {
            success: false,
            error: `WordPress Authentication Failed (${response.status}): ${errorMsg}. Please verify your WordPress username and Application Password in Connection Settings.`
          };
        }

        lastError = errorMsg;
        continue;
      }

      const uploadedUrl = data.source_url || data.guid?.rendered || '';
      if (uploadedUrl) {
        return {
          success: true,
          url: uploadedUrl,
          id: data.id,
          title: data.title?.rendered || cleanTitle,
          source: 'wordpress'
        };
      }
    } catch (err: any) {
      lastError = err?.message || 'Network error connecting to WordPress REST API.';
    }
  }

  return {
    success: false,
    error: lastError || `WordPress REST API at "${baseUrl}" returned a web page (HTML) instead of JSON. Ensure WordPress is active at this URL and your Application Password has Editor or Admin rights.`
  };
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

  const endpoints = [
    `${baseUrl}/index.php?rest_route=/wp/v2/media&per_page=${perPage}&page=${page}&media_type=image`,
    `${baseUrl}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}&media_type=image`
  ];

  const headers: Record<string, string> = { 'Accept': 'application/json' };
  if (config.username && config.appPassword) {
    const cleanPass = config.appPassword.replace(/\s+/g, '');
    headers['Authorization'] = 'Basic ' + btoa(`${config.username.trim()}:${cleanPass}`);
  }

  let lastError = '';

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { headers });
      const contentType = response.headers.get('content-type') || '';
      const rawText = await response.text();

      if (rawText.trim().startsWith('<') || (!contentType.includes('application/json') && !rawText.trim().startsWith('['))) {
        continue;
      }

      const data = JSON.parse(rawText);
      if (response.ok && Array.isArray(data)) {
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
      } else if (!response.ok) {
        lastError = data?.message?.replace(/<[^>]+>/g, '') || `HTTP ${response.status}`;
      }
    } catch (err: any) {
      lastError = err?.message || 'Network connection failed';
    }
  }

  return {
    success: false,
    error: lastError || `Could not fetch WordPress media from ${baseUrl}.`
  };
}
