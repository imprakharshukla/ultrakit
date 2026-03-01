import { cn } from "@/lib/utils";
import { SpinnerGap } from "@phosphor-icons/react";
import type { HTMLAttributes } from "react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export const Loader = ({ className, size = 16, ...props }: LoaderProps) => (
  <div
    className={cn(
      "inline-flex animate-spin items-center justify-center",
      className
    )}
    {...props}
  >
    <SpinnerGap size={size} weight="duotone" />
  </div>
);
