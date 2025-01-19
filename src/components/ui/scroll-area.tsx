import React from 'react'
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

export function ScrollArea({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAreaPrimitive.Root className={`relative overflow-hidden ${className}`}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        className="flex touch-none select-none bg-black/5 transition-colors hover:bg-black/10"
        orientation="vertical"
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-black/30" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
} 