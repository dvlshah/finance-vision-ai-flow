
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-base ring-offset-background focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 
          "bg-brand-500 text-white shadow-sm hover:bg-brand-600 focus-visible:ring-brand-500 active:bg-brand-700 active:scale-[0.98]",
        destructive:
          "bg-error-500 text-white shadow-sm hover:bg-error-600 focus-visible:ring-error-500 active:bg-error-600 active:scale-[0.98]",
        outline:
          "border border-gray-300 bg-surface-primary text-text-primary shadow-sm hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-brand-500 active:bg-gray-100 active:scale-[0.98]",
        secondary:
          "bg-gray-100 text-text-primary border border-gray-200 shadow-sm hover:bg-gray-200 focus-visible:ring-brand-500 active:bg-gray-300 active:scale-[0.98]",
        ghost: 
          "text-text-primary hover:bg-gray-100 focus-visible:ring-brand-500 active:bg-gray-200 active:scale-[0.98]",
        link: 
          "text-brand-500 underline-offset-4 hover:underline focus-visible:ring-brand-500",
        success:
          "bg-success-500 text-white shadow-sm hover:bg-success-600 focus-visible:ring-success-500 active:bg-success-600 active:scale-[0.98]",
        warning:
          "bg-warning-500 text-white shadow-sm hover:bg-warning-600 focus-visible:ring-warning-500 active:bg-warning-600 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
