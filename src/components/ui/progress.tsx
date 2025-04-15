import * as React from "react";
import { cn } from "@/lib/utils"; // or your className utility if different

declare module "react" {
  interface CSSProperties {
    "--progress-foreground"?: string;
  }
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative h-2 w-full bg-muted rounded", className)}
        style={style}
        {...props}
      >
        <div
          className="absolute left-0 top-0 h-full bg-primary rounded"
          style={{
            width: `${value}%`,
            backgroundColor: style?.["--progress-foreground"] as string ?? "currentColor",
          }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";
