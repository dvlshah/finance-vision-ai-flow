
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  animated?: boolean;
}

const Skeleton = ({ className, animated = true }: SkeletonProps) => {
  return (
    <div 
      className={cn(
        "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg",
        animated && "animate-shimmer bg-[length:200%_100%]",
        className
      )}
    />
  );
};

interface CardSkeletonProps {
  showHeader?: boolean;
  showChart?: boolean;
  lines?: number;
}

export const CardSkeleton = ({ showHeader = true, showChart = false, lines = 3 }: CardSkeletonProps) => {
  return (
    <motion.div 
      className="glass-card p-6 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      )}
      
      {showChart && (
        <Skeleton className="h-64 w-full rounded-xl" />
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export const DashboardSkeletonGrid = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      
      {/* Main grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton showHeader showChart />
        </div>
        <CardSkeleton lines={4} />
      </div>
      
      {/* Secondary grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <CardSkeleton lines={2} />
          </motion.div>
        ))}
      </div>
      
      {/* Chart grid skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CardSkeleton showChart />
        </div>
        <CardSkeleton showHeader lines={5} />
      </div>
    </div>
  );
};

export { Skeleton };
