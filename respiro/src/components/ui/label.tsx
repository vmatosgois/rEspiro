"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "flex items-center mb-1 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "font-medium",
        bold: "font-bold",
      },
      size: {
        xs: "text-xm",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    },
  }
)

function Label({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"label"> &
  VariantProps<typeof labelVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "label"

  return (
    <Comp
      data-slot="label"
      className={cn(labelVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Label, labelVariants }