
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
}

export const AccessibilityEnhancer = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false
  });

  useEffect(() => {
    // Detect user preferences from system
    const mediaQueries = {
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      largeText: window.matchMedia('(prefers-font-size: large)'),
    };

    // Check for screen reader
    const isScreenReader = navigator.userAgent.includes('NVDA') ||
                          navigator.userAgent.includes('JAWS') ||
                          navigator.userAgent.includes('VoiceOver') ||
                          window.speechSynthesis !== undefined;

    const initialPreferences = {
      reduceMotion: mediaQueries.reduceMotion.matches,
      highContrast: mediaQueries.highContrast.matches,
      largeText: mediaQueries.largeText.matches,
      screenReader: isScreenReader
    };

    setPreferences(initialPreferences);

    // Apply initial accessibility enhancements
    applyAccessibilityEnhancements(initialPreferences);

    // Listen for preference changes
    const handleReduceMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({ ...prev, reduceMotion: e.matches }));
      applyAccessibilityEnhancements({ ...preferences, reduceMotion: e.matches });
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({ ...prev, highContrast: e.matches }));
      applyAccessibilityEnhancements({ ...preferences, highContrast: e.matches });
    };

    mediaQueries.reduceMotion.addEventListener('change', handleReduceMotionChange);
    mediaQueries.highContrast.addEventListener('change', handleHighContrastChange);

    // Set up keyboard navigation enhancement
    setupKeyboardNavigation();

    // Set up focus management
    setupFocusManagement();

    return () => {
      mediaQueries.reduceMotion.removeEventListener('change', handleReduceMotionChange);
      mediaQueries.highContrast.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  const applyAccessibilityEnhancements = (prefs: AccessibilityPreferences) => {
    const root = document.documentElement;

    // Reduce motion
    if (prefs.reduceMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.classList.add('reduce-motion');
    } else {
      root.style.removeProperty('--animation-duration');
      root.classList.remove('reduce-motion');
    }

    // High contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (prefs.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Screen reader optimizations
    if (prefs.screenReader) {
      root.classList.add('screen-reader');
      // Add more descriptive labels dynamically
      enhanceForScreenReaders();
    } else {
      root.classList.remove('screen-reader');
    }
  };

  const setupKeyboardNavigation = () => {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Skip links with 'Tab' key
      if (e.key === 'Tab' && e.shiftKey && document.activeElement === document.body) {
        const skipLink = document.getElementById('skip-to-main');
        if (skipLink) {
          skipLink.focus();
          e.preventDefault();
        }
      }

      // Quick navigation shortcuts
      if (e.altKey) {
        switch (e.key) {
          case '1':
            navigateToSection('header');
            e.preventDefault();
            break;
          case '2':
            navigateToSection('navigation');
            e.preventDefault();
            break;
          case '3':
            navigateToSection('main');
            e.preventDefault();
            break;
          case '4':
            navigateToSection('footer');
            e.preventDefault();
            break;
        }
      }
    });
  };

  const setupFocusManagement = () => {
    // Focus visible indicator
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Focus trap for modals
    const focusableElementsSelector = 
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])';

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(focusableElementsSelector);
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    });
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[role="${sectionId}"]`) ||
                   document.querySelector(sectionId);
    
    if (element) {
      (element as HTMLElement).focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      toast({
        title: "Navigation",
        description: `Navigated to ${sectionId}`,
        duration: 2000,
      });
    }
  };

  const enhanceForScreenReaders = () => {
    // Add missing labels to interactive elements
    const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    unlabeledButtons.forEach((button, index) => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', `Interactive button ${index + 1}`);
      }
    });

    // Add region landmarks
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
    }

    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
    }

    // Add live regions for dynamic content
    if (!document.getElementById('announcements')) {
      const announcements = document.createElement('div');
      announcements.id = 'announcements';
      announcements.setAttribute('aria-live', 'polite');
      announcements.setAttribute('aria-atomic', 'true');
      announcements.style.position = 'absolute';
      announcements.style.left = '-10000px';
      announcements.style.width = '1px';
      announcements.style.height = '1px';
      announcements.style.overflow = 'hidden';
      document.body.appendChild(announcements);
    }
  };

  return null; // This component doesn't render anything
};
