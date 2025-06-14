
import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh?: () => Promise<void>;
  enabled?: boolean;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = <T extends HTMLElement = HTMLDivElement>(
  elementRef: React.RefObject<T>,
  options: UsePullToRefreshOptions
) => {
  const { onRefresh, enabled = true, threshold = 80, resistance = 0.5 } = options;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (element.scrollTop === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (element.scrollTop > 0 || isRefreshing) return;
      
      const touchY = e.touches[0].clientY;
      const distance = Math.max(0, (touchY - touchStartY.current) * resistance);
      
      if (distance > 0) {
        e.preventDefault();
        setPullDistance(distance);
        setIsPulling(true);
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !isRefreshing && onRefresh) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      setPullDistance(0);
      setIsPulling(false);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, resistance, pullDistance, isRefreshing, enabled]);

  return {
    isRefreshing,
    pullDistance,
    isPulling
  };
};
