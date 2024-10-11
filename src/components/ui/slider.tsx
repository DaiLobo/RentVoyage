"use client"

import * as React from "react";

import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-terceary" />
    </SliderPrimitive.Track>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded bg-[#1A80BF] px-2 py-1 text-white text-sm"
            side="top"
            align="center"
            sideOffset={5}
          >
            {props?.value && props?.value[0]}
            <Tooltip.Arrow className="fill-[#1A80BF]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>


      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded bg-[#1A80BF] px-2 py-1 text-white text-sm"
            side="top"
            align="center"
            sideOffset={5}
          >
            {props?.value && props?.value[1]}
            <Tooltip.Arrow className="fill-[#1A80BF]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>

  </SliderPrimitive.Root>
)
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
