import * as React from "react"
import { cn } from "@/lib/utils"

const Terminal = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("font-mono text-sm p-4 bg-black text-white overflow-auto", className)} {...props}>
      {children}
    </div>
  )
})

Terminal.displayName = "Terminal"

export { Terminal }

