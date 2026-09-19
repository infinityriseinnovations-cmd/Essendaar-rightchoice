import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Settings, 
  Key, 
  Globe, 
  User, 
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Search,
  Lock
} from 'lucide-react';
import { 
  WpMediaConfig, 
  WpMediaItem, 
  getStoredWpMediaConfig, 
  saveStoredWpMediaConfig, 
  uploadImageToWordPressMedia, 
  fetchWordPressMediaLibrary 
} from '../services/wordpressMedia';

interface WordPressMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, title?: string) => void;
  targetLabel?: string; // e.g. "Primary Product Image" or "Gallery Photo"
}

export const WordPressMediaModal: React.FC<WordPressMediaModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  targetLabel = "Product Image"
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'settings'>('upload');
  
  // Credentials
  const [config, setConfig] = useState<WpMediaConfig>(() => getStoredWpMediaConfig());
  const [isSaved, setIsSaved] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessUrl, setUploadSuccessUrl] = useState<string | null>(null);

  // Library state
  const [mediaItems, setMediaItems] = useState<WpMediaItem[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial validation
  useEffect(() => {
    const current = getStoredWpMediaConfig();
    const ready = !!(current.username && current.appPassword);
    setHasCredentials(ready);
    if (!ready) {
      setActiveTab('settings');
    } else {
      setActiveTab('upload');
    }
  }, [isOpen]);

  // Load preview when file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setUploadError(null);
    setUploadSuccessUrl(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Perform upload to WordPress
  const handlePerformUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select an image file first.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessUrl(null);

    try {
      const result = await uploadImageToWordPressMedia(selectedFile, config);
      if (result.success && result.url) {
        setUploadSuccessUrl(result.url);
        // Wait a brief moment to show success indicator, then pass to parent
        setTimeout(() => {
          onSelectImage(result.url!, result.title);
          onClose();
        }, 700);
      } else {
        setUploadError(result.error || 'Failed to upload to WordPress Media Library.');
      }
    } catch (err: any) {
      setUploadError(err?.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch library items
  const loadLibrary = async () => {
    setIsLoadingLibrary(true);
    setLibraryError(null);
    try {
      const result = await fetchWordPressMediaLibrary(config);
      if (result.success && result.items) {
        setMediaItems(result.items);
      } else {
        setLibraryError(result.error || 'Could not load images from WordPress.');
      }
    } catch (err: any) {
      setLibraryError(err?.message || 'Network error fetching library.');
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'library') {
      loadLibrary();
    }
  }, [activeTab]);

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredWpMediaConfig(config);
    setIsSaved(true);
    setHasCredentials(!!(config.username && config.appPassword));
    setTimeout(() => {
      setIsSaved(false);
      setActiveTab('upload');
    }, 800);
  };

  const filteredLibrary = mediaItems.filter(item => 
    !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1d2327] text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0073aa] flex items-center justify-center text-white font-serif font-bold text-base shadow-sm ring-2 ring-white/20">
              W
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <span>WordPress Media Library</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-sky-900/60 text-sky-200 border border-sky-700">
                  {targetLabel}
                </span>
              </h3>
              <p className="text-[11px] text-stone-300">
                Direct integration with {config.wpBaseUrl ? config.wpBaseUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '') : 'WordPress'} Media REST API
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'upload' 
                ? 'border-[#0073aa] text-[#0073aa] bg-white' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Photo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'library' 
                ? 'border-[#0073aa] text-[#0073aa] bg-white' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Browse Media Library</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ml-auto ${
              activeTab === 'settings' 
                ? 'border-[#0073aa] text-[#0073aa] bg-white' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Connection Settings</span>
            {!hasCredentials && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Configuration needed" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* TAB 1: UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {!hasCredentials && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">WordPress credentials not configured yet</p>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      To upload directly into your WordPress media library, please configure your WordPress username and Application Password in the Settings tab.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 text-[11px] cursor-pointer"
                  >
                    Configure
                  </button>
                </div>
              )}

              {/* Upload Drop/Select Area */}
              <div className="border-2 border-dashed border-slate-300 hover:border-[#0073aa] transition-colors rounded-2xl p-6 text-center bg-slate-50/70">
                <input 
                  type="file" 
                  id="wp-media-file-input"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden" 
                />

                {filePreview ? (
                  <div className="space-y-3">
                    <div className="w-40 h-40 mx-auto rounded-xl border border-slate-200 bg-white p-2 flex items-center justify-center overflow-hidden shadow-xs">
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">{selectedFile?.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0} KB
                      </p>
                    </div>
                    <label 
                      htmlFor="wp-media-file-input"
                      className="inline-block text-xs text-[#0073aa] hover:underline cursor-pointer font-semibold"
                    >
                      Choose a different photo
                    </label>
                  </div>
                ) : (
                  <label htmlFor="wp-media-file-input" className="cursor-pointer block py-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-sky-100 flex items-center justify-center text-[#0073aa] mb-3">
                      <Upload className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">
                      Choose a photo to upload to WordPress
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">
                      Supports JPG, PNG, WebP. High resolution bottle &amp; package photos recommended.
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0073aa] hover:bg-[#005177] text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Local Image File</span>
                    </span>
                  </label>
                )}
              </div>

              {/* Status alerts */}
              {uploadError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold">Upload Notice</p>
                      <p className="text-[11px] mt-0.5 whitespace-pre-line text-rose-900">{uploadError}</p>
                    </div>
                  </div>

                  {filePreview && (
                    <div className="pt-2 border-t border-rose-200/70 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-rose-700 font-medium">Want to use this image on your product now?</span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectImage(filePreview, selectedFile?.name?.replace(/\.[^/.]+$/, ''));
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-[#00355f] hover:bg-[#0A2540] text-white font-bold rounded-lg text-[11px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Use Photo (Instant Staging)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {uploadSuccessUrl && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Image ready and assigned to product!</span>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Images are saved permanently to your cPanel /wp-content/uploads/</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!selectedFile || isUploading}
                    onClick={handlePerformUpload}
                    className="px-5 py-2.5 bg-[#0073aa] hover:bg-[#005177] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading to WordPress...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload &amp; Use Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BROWSE MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search WordPress media items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0073aa]"
                  />
                </div>
                <button
                  type="button"
                  onClick={loadLibrary}
                  disabled={isLoadingLibrary}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLibrary ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {libraryError && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Could not fetch Media Library</p>
                    <p className="text-[11px] mt-0.5">{libraryError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="text-[11px] font-bold text-amber-800 underline cursor-pointer"
                  >
                    Check Settings
                  </button>
                </div>
              )}

              {isLoadingLibrary ? (
                <div className="py-16 text-center text-slate-400">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-[#0073aa]" />
                  <p className="text-xs font-semibold">Connecting to WordPress Media API...</p>
                </div>
              ) : filteredLibrary.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold text-slate-600">No media found in WordPress</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Upload your first photo using the &quot;Upload New Photo&quot; tab.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto p-1">
                  {filteredLibrary.map((item) => {
                    const isSelected = selectedMediaUrl === item.source_url;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedMediaUrl(item.source_url)}
                        className={`group relative rounded-xl border-2 p-1.5 bg-slate-50 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#0073aa] ring-2 ring-[#0073aa]/20 bg-sky-50/50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-full h-24 rounded-lg bg-white overflow-hidden flex items-center justify-center">
                          <img 
                            src={item.thumbnail_url || item.source_url} 
                            alt={item.title} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-[10px] font-medium text-slate-700 truncate mt-1.5" title={item.title}>
                          {item.title}
                        </p>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-[#0073aa] text-white p-1 rounded-full shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selection footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <p className="text-[11px] text-slate-500">
                  {selectedMediaUrl ? '1 image selected' : 'Click an image to select'}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!selectedMediaUrl}
                    onClick={() => {
                      if (selectedMediaUrl) {
                        onSelectImage(selectedMediaUrl);
                        onClose();
                      }
                    }}
                    className="px-5 py-2.5 bg-[#0073aa] hover:bg-[#005177] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Use Selected Image</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-900 flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#0073aa] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">WordPress Connection Guide</h5>
                  <p className="text-[11px] text-sky-800 mt-1 leading-relaxed">
                    Connects directly to your WordPress REST API. Enter your site URL (e.g. <code>https://rightchoiceindia.com</code>) along with an Application Password generated under <strong>WordPress Admin &gt; Users &gt; Profile</strong>. If hosted on the same domain as WordPress, you can leave Site URL blank.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>WordPress Site URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://rightchoiceindia.com (or leave blank for current domain)"
                  value={config.wpBaseUrl}
                  onChange={(e) => setConfig({ ...config, wpBaseUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#0073aa]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Both direct REST API (<code>index.php?rest_route=/wp/v2/media</code>) and pretty permalinks (<code>/wp-json/</code>) are supported automatically.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>WordPress Username</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. admin or editor"
                    value={config.username}
                    onChange={(e) => setConfig({ ...config, username: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0073aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-slate-400" />
                    <span>WordPress Application Password</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={config.appPassword}
                    onChange={(e) => setConfig({ ...config, appPassword: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#0073aa]"
                  />
                </div>
              </div>

              {/* How to get an Application Password */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
                <h6 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#0073aa]" />
                  <span>How to generate an Application Password in WordPress:</span>
                </h6>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                  <li>Log into WordPress Admin (<code>/wp-admin</code>)</li>
                  <li>Navigate to <strong>Users &gt; Profile</strong></li>
                  <li>Scroll down to the <strong>Application Passwords</strong> section</li>
                  <li>Type a name (e.g. <code>Essendaar App</code>) and click <strong>Add New Application Password</strong></li>
                  <li>Copy the generated 16-character code and paste it above!</li>
                </ol>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-[11px] text-slate-400">Stored safely in your local browser session</span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0073aa] hover:bg-[#005177] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Connection Settings</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
