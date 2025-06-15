
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const { isLowPerformance } = usePerformanceOptimization();

  if (isLowPerformance) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full will-change-transform gpu-accelerated"
    >
      {children}
    </motion.div>
  )
}
