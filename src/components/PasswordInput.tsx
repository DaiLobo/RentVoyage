"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <div
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {React.createElement(showPassword ? EyeOffIcon : EyeIcon, {
            className: "h-6 w-6"
          })}
        </div>
      </div>
    );
  }
);
