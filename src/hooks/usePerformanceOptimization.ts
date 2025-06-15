
import { useEffect, useState } from 'react'

export function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Check device capabilities
    const connection = (navigator as any)?.connection || (navigator as any)?.mozConnection || (navigator as any)?.webkitConnection
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'
    const isLowEndDevice = navigator.hardwareConcurrency <= 2
    const hasLimitedMemory = (navigator as any)?.deviceMemory <= 2

    setIsLowPerformance(isSlowConnection || isLowEndDevice || hasLimitedMemory)
  }, [])

  return { isLowPerformance }
}
