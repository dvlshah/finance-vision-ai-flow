
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Wifi, Cpu, HardDrive, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  networkLatency: number;
  memoryUsage: number;
  fps: number;
  paintTime: number;
  accessibilityScore: number;
}

interface AccessibilityIssue {
  type: 'contrast' | 'aria' | 'keyboard' | 'semantic';
  element: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [accessibilityIssues, setAccessibilityIssues] = useState<AccessibilityIssue[]>([]);
  const [frameCount, setFrameCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // FPS monitoring
  const measureFPS = useCallback(() => {
    const now = Date.now();
    const elapsed = now - startTime;
    
    if (elapsed >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsed);
      setFrameCount(0);
      setStartTime(now);
      return fps;
    }
    
    setFrameCount(prev => prev + 1);
    return null;
  }, [frameCount, startTime]);

  // Accessibility audit
  const auditAccessibility = useCallback(() => {
    const issues: AccessibilityIssue[] = [];
    
    // Check for missing alt texts
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      issues.push({
        type: 'aria',
        element: 'img',
        description: `${images.length} images without alt text`,
        severity: 'high'
      });
    }

    // Check for interactive elements without ARIA labels
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    const unlabeledButtons = Array.from(buttons).filter(btn => !btn.textContent?.trim());
    if (unlabeledButtons.length > 0) {
      issues.push({
        type: 'aria',
        element: 'button',
        description: `${unlabeledButtons.length} buttons without accessible labels`,
        severity: 'medium'
      });
    }

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let prevLevel = 0;
    let hierarchyIssues = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > prevLevel + 1) {
        hierarchyIssues++;
      }
      prevLevel = level;
    });

    if (hierarchyIssues > 0) {
      issues.push({
        type: 'semantic',
        element: 'headings',
        description: `${hierarchyIssues} heading hierarchy violations`,
        severity: 'medium'
      });
    }

    // Check for low contrast (simplified check)
    const lowContrastElements = document.querySelectorAll('[style*="color"]');
    if (lowContrastElements.length > 0) {
      issues.push({
        type: 'contrast',
        element: 'various',
        description: 'Potential contrast issues detected',
        severity: 'low'
      });
    }

    setAccessibilityIssues(issues);
    return Math.max(0, 100 - (issues.length * 10));
  }, []);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const memory = (performance as any).memory;
        const paintEntries = performance.getEntriesByType('paint');
        
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const networkLatency = navigation.responseStart - navigation.requestStart;
        const memoryUsage = memory ? memory.usedJSHeapSize / (1024 * 1024) : 0;
        
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        const paintTime = firstPaint ? firstPaint.startTime : 0;

        // Measure FPS
        const currentFPS = measureFPS() || 60;
        
        // Audit accessibility
        const accessibilityScore = auditAccessibility();

        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          networkLatency: Math.round(networkLatency),
          memoryUsage: Math.round(memoryUsage * 10) / 10,
          fps: currentFPS,
          paintTime: Math.round(paintTime),
          accessibilityScore
        });
      }
    };

    // Measure after initial load
    const measureTimer = setTimeout(measurePerformance, 1000);
    
    // FPS monitoring loop
    const fpsInterval = setInterval(() => {
      measureFPS();
    }, 16); // ~60fps

    // Show metrics in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setShowMetrics(true), 2000);
      
      return () => {
        clearTimeout(measureTimer);
        clearTimeout(timer);
        clearInterval(fpsInterval);
      };
    }

    return () => {
      clearTimeout(measureTimer);
      clearInterval(fpsInterval);
    };
  }, [measureFPS, auditAccessibility]);

  if (!metrics || !showMetrics || process.env.NODE_ENV === 'production') {
    return null;
  }

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600 bg-green-100';
    if (value <= thresholds[1]) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-600 bg-green-100';
    if (fps >= 30) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getAccessibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const criticalIssues = accessibilityIssues.filter(issue => issue.severity === 'high').length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 glass-card max-w-sm"
        role="complementary"
        aria-label="Performance and accessibility monitor"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-900">Performance</span>
              {criticalIssues > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                  {criticalIssues} A11y Issues
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-auto"
              aria-label={isExpanded ? "Collapse metrics" : "Expand metrics"}
            >
              {isExpanded ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-slate-500" aria-hidden="true" />
                <span>Load Time</span>
              </div>
              <span 
                className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.loadTime, [100, 300])}`}
                aria-label={`Load time: ${metrics.loadTime} milliseconds`}
              >
                {metrics.loadTime}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-slate-500" aria-hidden="true" />
                <span>Network</span>
              </div>
              <span 
                className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.networkLatency, [50, 150])}`}
                aria-label={`Network latency: ${metrics.networkLatency} milliseconds`}
              >
                {metrics.networkLatency}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-slate-500" aria-hidden="true" />
                <span>Memory</span>
              </div>
              <span 
                className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.memoryUsage, [10, 25])}`}
                aria-label={`Memory usage: ${metrics.memoryUsage} megabytes`}
              >
                {metrics.memoryUsage}MB
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-slate-500" aria-hidden="true" />
                <span>FPS</span>
              </div>
              <span 
                className={`px-2 py-1 rounded-full ${getFPSColor(metrics.fps)}`}
                aria-label={`Frames per second: ${metrics.fps}`}
              >
                {metrics.fps}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>A11y Score</span>
              <span 
                className={`px-2 py-1 rounded-full ${getAccessibilityColor(metrics.accessibilityScore)}`}
                aria-label={`Accessibility score: ${metrics.accessibilityScore} percent`}
              >
                {metrics.accessibilityScore}%
              </span>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2 border-t border-slate-200"
                >
                  <div className="text-xs text-slate-600 mb-2 font-medium">Accessibility Issues:</div>
                  {accessibilityIssues.length === 0 ? (
                    <div className="text-xs text-green-600">No issues detected!</div>
                  ) : (
                    <div className="space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                      {accessibilityIssues.map((issue, index) => (
                        <div
                          key={index}
                          className={`text-xs p-2 rounded ${
                            issue.severity === 'high' 
                              ? 'bg-red-50 text-red-700' 
                              : issue.severity === 'medium'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          <div className="font-medium">{issue.element}</div>
                          <div>{issue.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
