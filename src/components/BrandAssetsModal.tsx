import React, { useState } from 'react';
import { X, Download, Copy, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const assets = [
    {
      id: 'logo-large-transparent',
      title: 'Full Top Logo (Large PNG - Transparent)',
      description: 'Ultra high-resolution master horizontal logo with transparent background for websites, banners, and letterheads.',
      dimensions: '2460 × 600 px',
      fileFormat: 'PNG (Lossless RGBA)',
      fileSize: '~62 KB',
      filePath: '/essendaar-logo-large.png',
      downloadName: 'essendaar-logo-large-transparent.png',
      previewBg: 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] bg-slate-50',
    },
    {
      id: 'logo-large-white',
      title: 'Full Top Logo (Large PNG - White Background)',
      description: 'Ultra high-resolution horizontal logo framed on clean solid white canvas for presentations, invoices, and documents.',
      dimensions: '2460 × 600 px',
      fileFormat: 'PNG (Lossless RGB)',
      fileSize: '~66 KB',
      filePath: '/essendaar-logo-large-white-bg.png',
      downloadName: 'essendaar-logo-large-white.png',
      previewBg: 'bg-white shadow-inner',
    },
    {
      id: 'logo-medium',
      title: 'Full Top Logo (Medium PNG)',
      description: 'Medium format horizontal logo optimized for web headers, email templates, and standard cards.',
      dimensions: '1230 × 300 px',
      fileFormat: 'PNG (Lossless RGBA)',
      fileSize: '~26 KB',
      filePath: '/essendaar-logo-medium.png',
      downloadName: 'essendaar-logo-medium.png',
      previewBg: 'bg-slate-100',
    },
    {
      id: 'emblem-large',
      title: 'Brand Emblem Icon (Square Large PNG)',
      description: 'High-res square emblem featuring the signature blue & green dual-gradient curves for app icons and social avatars.',
      dimensions: '1024 × 1024 px',
      fileFormat: 'PNG (Lossless RGBA)',
      fileSize: '~53 KB',
      filePath: '/essendaar-emblem-large.png',
      downloadName: 'essendaar-emblem-1024x1024.png',
      previewBg: 'bg-slate-50',
      isSquare: true,
    },
    {
      id: 'favicon-ico',
      title: 'Browser Favicon Multi-Resolution (.ico & PNG)',
      description: 'Production multi-layer favicon (16px, 32px, 48px) and apple-touch-icon (180px) for browser tabs and mobile bookmarks.',
      dimensions: '48 × 48 / 32 × 32 / 16 × 16 px',
      fileFormat: 'ICO & PNG',
      fileSize: '~3.8 KB',
      filePath: '/favicon.ico',
      downloadName: 'favicon.ico',
      previewBg: 'bg-slate-100',
      isSquare: true,
      extraDownload: {
        title: '32px PNG Favicon',
        filePath: '/favicon-32x32.png',
        downloadName: 'favicon-32x32.png'
      }
    },
  ];

  const handleCopyLink = (path: string, index: number) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00355f] text-white flex items-center justify-center shadow-sm">
              <ImageIcon className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="font-headline font-black text-lg text-[#00355f]">
                Download Official Brand Logos &amp; Favicon
              </h3>
              <p className="text-xs text-slate-500">
                High-resolution PNG formats (2460px), vector emblems, and browser favicons
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Asset Cards */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="bg-[#eff4ff] border border-sky-100 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-[#00355f]">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              All assets are rendered at high DPI for crisp print, digital marketing, and web usage. Click <strong>Download PNG</strong> to save directly to your device.
            </p>
          </div>

          {assets.map((asset, idx) => (
            <div 
              key={asset.id} 
              className="border border-slate-200 rounded-2xl p-4 hover:border-slate-300 hover:shadow-xs transition-all bg-white"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Visual Preview */}
                <div className={`w-full sm:w-44 h-20 rounded-xl ${asset.previewBg} border border-slate-200/80 flex items-center justify-center p-2 shrink-0 overflow-hidden`}>
                  <img
                    src={asset.filePath}
                    alt={asset.title}
                    className={`max-h-full object-contain ${asset.isSquare ? 'w-12 h-12' : 'w-auto'}`}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline font-bold text-sm text-slate-900 truncate">
                      {asset.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {asset.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-600">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                      {asset.dimensions}
                    </span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">
                      {asset.fileFormat}
                    </span>
                    <span className="text-slate-400">
                      {asset.fileSize}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                  <a
                    href={asset.filePath}
                    download={asset.downloadName}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#00355f] text-white hover:bg-[#002847] font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>

                  {asset.extraDownload && (
                    <a
                      href={asset.extraDownload.filePath}
                      download={asset.extraDownload.downloadName}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold text-[11px] transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      PNG 32px
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopyLink(asset.filePath, idx)}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold text-[11px] transition-colors cursor-pointer"
                    title="Copy direct file URL"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Official brand assets of Essendaar Suppliers &amp; Facility Care.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
