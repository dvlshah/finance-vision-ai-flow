
import { useEffect, useRef } from 'react';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

interface MobileGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onRefresh?: () => Promise<void>;
  enablePullToRefresh?: boolean;
}

export const MobileGestures = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onRefresh,
  enablePullToRefresh = true 
}: MobileGesturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced swipe gesture support
  useSwipeGesture(containerRef, {
    onSwipeLeft,
    onSwipeRight,
    threshold: 50,
    velocity: 0.3
  });

  // Pull-to-refresh functionality
  const { isPulling, pullDistance } = usePullToRefresh(containerRef, {
    onRefresh,
    enabled: enablePullToRefresh,
    threshold: 60
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-pan-y"
      style={{
        transform: isPulling ? `translateY(${Math.min(pullDistance * 0.5, 40)}px)` : 'translateY(0)',
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (
        <div 
          className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isPulling ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
          style={{ height: Math.min(pullDistance, 60) }}
        >
          <div className="glass-card p-2 rounded-full shadow-level-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};
