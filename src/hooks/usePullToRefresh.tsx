
import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = ({ 
  onRefresh, 
  threshold = 80, 
  resistance = 0.5 
}: UsePullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const scrollElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = scrollElement.current || document.documentElement;
    
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
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      setPullDistance(0);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, resistance, pullDistance, isRefreshing]);

  return {
    isRefreshing,
    pullDistance,
    setScrollElement: (element: HTMLElement | null) => {
      scrollElement.current = element;
    }
  };
};
