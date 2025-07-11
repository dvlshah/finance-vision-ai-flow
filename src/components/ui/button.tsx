
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // NEW: Finance-specific variants
        gradient: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md",
        warning: "bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-slate-900 dark:text-white hover:bg-white/20 shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2 min-w-[44px]",
        sm: "h-9 rounded-md px-3 min-w-[44px]",
        lg: "h-11 rounded-md px-8 min-w-[44px]",
        icon: "h-10 w-10 min-w-[44px] min-h-[44px]",
        // NEW: Mobile-optimized sizes
        touch: "h-12 px-6 min-w-[48px] min-h-[48px]", // 48px minimum for mobile
        "touch-sm": "h-10 px-4 min-w-[44px] min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
