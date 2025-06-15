
import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BrowserFeature {
  name: string;
  supported: boolean;
  fallback?: string;
  critical: boolean;
}

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  platform: string;
  mobile: boolean;
}

// Extend window interface for polyfills
declare global {
  interface Window {
    IntersectionObserver?: any;
    ResizeObserver?: any;
  }
}

export const BrowserCompatibility = () => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [features, setFeatures] = useState<BrowserFeature[]>([]);
  const [showWarnings, setShowWarnings] = useState(false);

  useEffect(() => {
    detectBrowser();
    checkFeatureSupport();
    setupPolyfills();
  }, []);

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const mobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    let browserName = 'Unknown';
    let version = '';
    let engine = '';

    // Detect browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browserName = 'Chrome';
      version = userAgent.match(/Chrome\/(\d+)/)?.[1] || '';
      engine = 'Blink';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      version = userAgent.match(/Firefox\/(\d+)/)?.[1] || '';
      engine = 'Gecko';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browserName = 'Safari';
      version = userAgent.match(/Version\/(\d+)/)?.[1] || '';
      engine = 'WebKit';
    } else if (userAgent.includes('Edg')) {
      browserName = 'Edge';
      version = userAgent.match(/Edg\/(\d+)/)?.[1] || '';
      engine = 'Blink';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
      browserName = 'Internet Explorer';
      version = userAgent.match(/(?:MSIE|rv:)\s?(\d+)/)?.[1] || '';
      engine = 'Trident';
    }

    setBrowserInfo({
      name: browserName,
      version,
      engine,
      platform,
      mobile
    });
  };

  const checkFeatureSupport = () => {
    const featureTests: BrowserFeature[] = [
      {
        name: 'CSS Grid',
        supported: CSS.supports('display', 'grid'),
        fallback: 'Flexbox layout',
        critical: true
      },
      {
        name: 'CSS Custom Properties',
        supported: CSS.supports('--custom-property', 'value'),
        fallback: 'Static CSS values',
        critical: true
      },
      {
        name: 'Intersection Observer',
        supported: 'IntersectionObserver' in window,
        fallback: 'Scroll event listeners',
        critical: false
      },
      {
        name: 'Web Animations API',
        supported: 'animate' in document.createElement('div'),
        fallback: 'CSS transitions',
        critical: false
      },
      {
        name: 'Backdrop Filter',
        supported: CSS.supports('backdrop-filter', 'blur(10px)'),
        fallback: 'Solid backgrounds',
        critical: false
      },
      {
        name: 'Container Queries',
        supported: CSS.supports('container-type', 'inline-size'),
        fallback: 'Media queries',
        critical: false
      },
      {
        name: 'Local Storage',
        supported: (() => {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
          } catch {
            return false;
          }
        })(),
        fallback: 'Session storage',
        critical: true
      },
      {
        name: 'Fetch API',
        supported: 'fetch' in window,
        fallback: 'XMLHttpRequest',
        critical: true
      },
      {
        name: 'ES6 Modules',
        supported: 'noModule' in document.createElement('script'),
        fallback: 'Bundled JavaScript',
        critical: true
      },
      {
        name: 'WebP Images',
        supported: (() => {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          return canvas.toDataURL('image/webp').indexOf('webp') !== -1;
        })(),
        fallback: 'JPEG/PNG images',
        critical: false
      }
    ];

    setFeatures(featureTests);

    // Show warnings for critical unsupported features
    const criticalIssues = featureTests.filter(f => !f.supported && f.critical);
    if (criticalIssues.length > 0 && process.env.NODE_ENV === 'development') {
      setShowWarnings(true);
      
      toast({
        title: "Browser Compatibility Warning",
        description: `${criticalIssues.length} critical features not supported`,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const setupPolyfills = () => {
    // Intersection Observer polyfill
    if (!('IntersectionObserver' in window)) {
      // Simple fallback for intersection observer
      (window as any).IntersectionObserver = class {
        constructor(callback: any) {
          this.callback = callback;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        callback: any;
      };
    }

    // ResizeObserver polyfill
    if (!('ResizeObserver' in window)) {
      (window as any).ResizeObserver = class {
        constructor(callback: any) {
          this.callback = callback;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        callback: any;
      };
    }

    // CSS.supports polyfill
    if (!CSS?.supports) {
      (window as any).CSS = {
        supports: () => false
      };
    }

    // Smoothscroll polyfill for Safari
    if (!('scrollBehavior' in document.documentElement.style)) {
      const smoothscroll = () => {
        // Simple polyfill for smooth scrolling
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector((link as HTMLAnchorElement).hash);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      };
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', smoothscroll);
      } else {
        smoothscroll();
      }
    }
  };

  if (!showWarnings || process.env.NODE_ENV === 'production') {
    return null;
  }

  const unsupportedFeatures = features.filter(f => !f.supported);
  const criticalIssues = unsupportedFeatures.filter(f => f.critical);

  return (
    <div className="fixed top-4 left-4 z-50 max-w-md glass-card p-4" role="alert">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <h3 className="font-semibold text-slate-900">Browser Compatibility</h3>
      </div>
      
      {browserInfo && (
        <div className="text-sm text-slate-600 mb-3">
          {browserInfo.name} {browserInfo.version} on {browserInfo.platform}
          {browserInfo.mobile && ' (Mobile)'}
        </div>
      )}

      {criticalIssues.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-900">Critical Issues</span>
          </div>
          {criticalIssues.map(feature => (
            <div key={feature.name} className="text-xs text-red-700 mb-1">
              {feature.name} - using {feature.fallback}
            </div>
          ))}
        </div>
      )}

      {unsupportedFeatures.filter(f => !f.critical).length > 0 && (
        <div>
          <div className="flex items-center gap-1 mb-2">
            <CheckCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">Enhanced Features</span>
          </div>
          {unsupportedFeatures.filter(f => !f.critical).map(feature => (
            <div key={feature.name} className="text-xs text-amber-700 mb-1">
              {feature.name} - using {feature.fallback}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowWarnings(false)}
        className="mt-3 text-xs text-slate-500 hover:text-slate-700 underline"
      >
        Dismiss
      </button>
    </div>
  );
};
