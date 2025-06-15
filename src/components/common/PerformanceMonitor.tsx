
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  networkLatency: number;
  memoryUsage: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const memory = (performance as any).memory;
        
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const networkLatency = navigation.responseStart - navigation.requestStart;
        const memoryUsage = memory ? memory.usedJSHeapSize / (1024 * 1024) : 0;

        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          networkLatency: Math.round(networkLatency),
          memoryUsage: Math.round(memoryUsage * 10) / 10
        });
      }
    };

    // Measure after initial load
    setTimeout(measurePerformance, 1000);

    // Show metrics in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setShowMetrics(true), 3000);
      const hideTimer = setTimeout(() => setShowMetrics(false), 8000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!metrics || !showMetrics || process.env.NODE_ENV === 'production') {
    return null;
  }

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600 bg-green-100';
    if (value <= thresholds[1]) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 glass-card p-4 max-w-xs"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-slate-900">Performance</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-500" />
              <span>Load Time</span>
            </div>
            <span className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.loadTime, [100, 300])}`}>
              {metrics.loadTime}ms
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3 text-slate-500" />
              <span>Network</span>
            </div>
            <span className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.networkLatency, [50, 150])}`}>
              {metrics.networkLatency}ms
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Memory</span>
            <span className={`px-2 py-1 rounded-full ${getPerformanceColor(metrics.memoryUsage, [10, 25])}`}>
              {metrics.memoryUsage}MB
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
