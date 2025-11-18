import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, ExternalLink, Check, Sparkles, Shield, Printer, Copy } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  qr_code: string;
}

interface QRCodeModalProps {
  pet: Pet;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ pet, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [qrSrc, setQrSrc] = useState<string>('');
  
  const baseUrl = useMemo(() => {
    // Prefer configured frontend URL if provided (useful when backend generates with a different origin)
    const envUrl = (import.meta as any).env?.VITE_FRONTEND_URL as string | undefined;
    return envUrl?.trim() || window.location.origin;
  }, []);
  const petUrl = `${baseUrl}/pet/${pet.id}`;

  useEffect(() => {
    let isMounted = true;
    const prepareQr = async () => {
      // If backend already provided a valid data URL, use it. Otherwise, generate locally from petUrl
      const backendQr = pet.qr_code || '';
      const isDataUrl = backendQr.startsWith('data:image/png;base64') || backendQr.startsWith('data:image/');
      const isHttpUrl = backendQr.startsWith('http://') || backendQr.startsWith('https://');
      try {
        if (isDataUrl) {
          if (isMounted) setQrSrc(backendQr);
          return;
        }
        // Some older records may have stored the profile URL itself. If so, still generate a QR from it
        const textForQr = isHttpUrl ? backendQr : petUrl;
        const dataUrl = await QRCode.toDataURL(textForQr, { width: 300, margin: 2 });
        if (isMounted) setQrSrc(dataUrl);
      } catch (e) {
        // As a last resort, fall back to attempting to render whatever we have
        if (isMounted) setQrSrc(backendQr || '');
        // eslint-disable-next-line no-console
        console.warn('QR generation failed on client, falling back to backend value.');
      }
    };
    prepareQr();
    return () => {
      isMounted = false;
    };
  }, [pet.qr_code, petUrl]);

  const downloadQRCode = async () => {
    setDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = qrSrc || pet.qr_code || '';
      link.download = `${pet.name}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download QR code:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const copyPetUrl = async () => {
    try {
      await navigator.clipboard.writeText(petUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 z-50 animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full border border-white/20 animate-in slide-in-from-bottom-4 duration-500 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 md:p-8 pb-4 md:pb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 rounded-t-3xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{pet.name}'s QR Code</h3>
                <p className="text-slate-600 font-medium">Digital Pet Guardian</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 max-h-[80vh] overflow-y-auto">
          {/* QR Code Display */}
          <div className="relative mb-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-3 border-l-3 border-blue-500 rounded-tl-xl"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-3 border-r-3 border-blue-500 rounded-tr-xl"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-3 border-l-3 border-blue-500 rounded-bl-xl"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-3 border-r-3 border-blue-500 rounded-br-xl"></div>
              
              <div className="text-center">
                <img
                  src={qrSrc || pet.qr_code}
                  alt={`QR Code for ${pet.name}`}
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl shadow-lg"
                  onError={() => setQrSrc('')}
                />
                <div className="mt-4 px-4 py-2 bg-slate-50 rounded-xl inline-block">
                  <p className="text-slate-600 text-sm font-medium">Scan to connect with {pet.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 p-5 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mt-1">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">How it works</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Attach this QR code to {pet.name}'s collar or tag. When someone finds your pet and scans the code, 
                  you'll instantly receive their location and contact information. It's like a digital lifeline for your furry friend!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={downloadQRCode}
              disabled={downloading}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-3">
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span className="font-semibold">Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Download QR Code</span>
                    <Printer className="w-4 h-4 opacity-70" />
                  </>
                )}
              </div>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={copyPetUrl}
                className="group relative overflow-hidden bg-white border-2 border-slate-200 text-slate-700 px-4 py-3 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-center space-x-2">
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span className="font-medium">Copy Link</span>
                    </>
                  )}
                </div>
              </button>

              <a
                href={petUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl hover:border-emerald-300 hover:bg-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">View Profile</span>
              </a>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="mt-8 space-y-4">
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mt-0.5">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-amber-800 text-sm space-y-1.5">
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Print on waterproof material for durability</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Keep backup copies at home</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Test the QR code before attaching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* URL Display */}
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Pet Profile URL</p>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-200">
              <code className="text-sm text-slate-600 truncate flex-1 mr-3">{petUrl}</code>
              <button
                onClick={copyPetUrl}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;