
import { Variants } from "framer-motion"

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Helper function to conditionally apply animations
export const conditionalAnimation = (animation: Variants): Variants => {
  if (prefersReducedMotion) {
    return {
      hidden: animation.visible || {},
      visible: animation.visible || {},
    }
  }
  return animation
}

// Container animations for staggered children
export const containerVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.1,
      delayChildren: prefersReducedMotion ? 0 : 0.2,
    },
  },
})

// Item animations for lists and cards
export const itemVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.3,
      ease: "easeOut",
    },
  },
})

// Card hover animations
export const cardVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: prefersReducedMotion ? { scale: 1, y: 0 } : {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

// Slide in from side
export const slideInVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.4,
      ease: "easeOut",
    },
  },
})

// Scale in animation
export const scaleInVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.3,
      ease: "easeOut",
    },
  },
})

// Modal/overlay animations
export const overlayVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
})

export const modalVariants: Variants = conditionalAnimation({
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.2,
    },
  },
})
