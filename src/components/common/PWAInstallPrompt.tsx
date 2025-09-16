import React, { useState, useEffect } from 'react';
import { XMarkIcon, ArrowDownTrayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showPrompt || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-6 text-white border border-amber-300">
        <div className="flex items-start justify-between mb-4">
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <div className="text-right flex-1 mr-3">
            <h3 className="text-lg font-bold font-cairo mb-2">
              📱 تثبيت التطبيق
            </h3>
            <p className="text-sm opacity-90 font-cairo leading-relaxed">
              ثبت مدرسة الشمامسة على جهازك للوصول السريع والعمل بدون إنترنت!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-cairo">أسرع</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs font-cairo">مثل التطبيق</div>
          </div>
        </div>

        <div className="flex space-x-3 space-x-reverse">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-medium font-cairo"
          >
            لاحقاً
          </button>
          <button
            onClick={handleInstallClick}
            className="flex-1 px-4 py-2 bg-white text-amber-600 hover:bg-gray-100 rounded-xl transition-colors font-medium font-cairo flex items-center justify-center space-x-2 space-x-reverse shadow-lg"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>تثبيت</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;