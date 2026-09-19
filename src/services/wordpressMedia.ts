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

/**
 * Uploads a file directly to the WordPress Media Library via REST API (/wp-json/wp/v2/media)
 */
export async function uploadImageToWordPressMedia(
  file: File,
  overrideConfig?: Partial<WpMediaConfig>
): Promise<{
  success: boolean;
  url?: string;
  id?: number;
  title?: string;
  error?: string;
}> {
  const config = { ...getStoredWpMediaConfig(), ...overrideConfig };
  
  // Clean credentials
  const username = config.username.trim();
  const rawPassword = config.appPassword.replace(/\s+/g, ''); // Application passwords often contain spaces like "xxxx yyyy zzzz"
  
  if (!username || !rawPassword) {
    return {
      success: false,
      error: 'WordPress Username and Application Password are required. Click "Configure WordPress Credentials" to set them up.'
    };
  }

  // Determine base URL: If empty, use same-domain origin (e.g. https://essendaar.com)
  const baseUrl = (config.wpBaseUrl && config.wpBaseUrl.trim()) 
    ? config.wpBaseUrl.trim().replace(/\/+$/, '') 
    : (typeof window !== 'undefined' ? window.location.origin : '');

  const endpoint = `${baseUrl}/wp-json/wp/v2/media`;

  try {
    const formData = new FormData();
    formData.append('file', file);
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    formData.append('title', cleanTitle);

    const authHeader = 'Basic ' + btoa(`${username}:${rawPassword}`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        // Let the browser set the multipart/form-data boundary automatically
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.message) {
          errorMsg = errJson.message.replace(/<[^>]+>/g, ''); // strip html tags
        }
      } catch {
        // use fallback errorMsg
      }

      if (response.status === 401 || response.status === 403) {
        errorMsg = 'Authentication Failed: Please check that your WordPress Username and Application Password are correct, and that your account has administrator or editor privileges.';
      } else if (response.status === 404) {
        errorMsg = `WordPress REST API not found at ${endpoint}. Check if WordPress is installed in a subdirectory (e.g. /wp) or check your Site URL.`;
      }

      return {
        success: false,
        error: errorMsg
      };
    }

    const data = await response.json();
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
      title: data.title?.rendered || cleanTitle
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error connecting to WordPress REST API. Check if your domain is accessible.'
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
  error?: string;
}> {
  const config = { ...getStoredWpMediaConfig(), ...overrideConfig };
  
  const baseUrl = (config.wpBaseUrl && config.wpBaseUrl.trim()) 
    ? config.wpBaseUrl.trim().replace(/\/+$/, '') 
    : (typeof window !== 'undefined' ? window.location.origin : '');

  const endpoint = `${baseUrl}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}&media_type=image`;

  try {
    const headers: Record<string, string> = {};
    if (config.username && config.appPassword) {
      const cleanPass = config.appPassword.replace(/\s+/g, '');
      headers['Authorization'] = 'Basic ' + btoa(`${config.username.trim()}:${cleanPass}`);
    }

    const response = await fetch(endpoint, { headers });
    if (!response.ok) {
      return {
        success: false,
        error: `Could not fetch media from WordPress (HTTP ${response.status})`
      };
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const data = await response.json();

    if (!Array.isArray(data)) {
      return { success: false, error: 'Invalid response format from WordPress Media API' };
    }

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
      totalPages
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network connection failed'
    };
  }
}
