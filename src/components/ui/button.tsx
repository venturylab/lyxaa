"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"

function Button({
  className,
  ...props
}: ButtonPrimitive.Props) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn("button", className)}
      {...props}
    />
  )
}

export { Button }
