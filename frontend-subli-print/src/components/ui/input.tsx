import * as React from "react";

import { cn } from "../../shared/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `flex h-10 w-full rounded-md border border-input bg-primary-foreground/60 px-3 py-2 text-xs 
        ring-offset-accent file:border-0 file:bg-transparent file:text-xs file:font-medium
        placeholder:text-foreground focus-visible:outline-none focus-visible:ring-1
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
