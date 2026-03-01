"use client";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ToolUIPart } from "ai";
import {
  CheckCircle,
  CaretDown,
  Circle,
  Clock,
  XCircle,
} from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";
import { CodeBlock } from "./code-block";

export type ToolProps = ComponentProps<typeof Collapsible>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    className={cn(
      "not-prose mb-3 w-full rounded-lg border border-border bg-muted/30 overflow-hidden",
      className
    )}
    {...props}
  />
);

export type ToolHeaderProps = {
  title?: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  className?: string;
};

const getStatusBadge = (status: ToolUIPart["state"]) => {
  const labels: Record<ToolUIPart["state"], string> = {
    "input-streaming": "Pending",
    "input-available": "Running",
    "approval-requested": "Awaiting Approval",
    "approval-responded": "Responded",
    "output-available": "Completed",
    "output-error": "Error",
    "output-denied": "Denied",
  };

  const icons: Record<ToolUIPart["state"], ReactNode> = {
    "input-streaming": <Circle className="size-3" weight="fill" />,
    "input-available": <Clock className="size-3 animate-pulse" weight="duotone" />,
    "approval-requested": <Clock className="size-3 text-yellow-500" weight="duotone" />,
    "approval-responded": <CheckCircle className="size-3 text-blue-400" weight="duotone" />,
    "output-available": <CheckCircle className="size-3 text-green-400" weight="duotone" />,
    "output-error": <XCircle className="size-3 text-destructive" weight="duotone" />,
    "output-denied": <XCircle className="size-3 text-orange-400" weight="duotone" />,
  };

  return (
    <Badge
      className="gap-1 rounded-full text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground border-0"
      variant="secondary"
    >
      {icons[status]}
      {labels[status]}
    </Badge>
  );
};

export const ToolHeader = ({
  className,
  title,
  type,
  state,
  ...props
}: ToolHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex w-full items-center justify-between gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors group",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      <span className="font-medium text-sm text-foreground">
        {title ?? type.split("-").slice(1).join("-")}
      </span>
      {getStatusBadge(state)}
    </div>
    <CaretDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" weight="bold" />
  </CollapsibleTrigger>
);

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in border-t border-border",
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div className={cn("space-y-2 overflow-hidden px-3 py-3", className)} {...props}>
    <h4 className="font-medium text-muted-foreground text-[10px] uppercase tracking-wider">
      Parameters
    </h4>
    <div className="rounded-md bg-background/50">
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
    </div>
  </div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  if (typeof output === "object" && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />
    );
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn("space-y-2 px-3 py-3", className)} {...props}>
      <h4 className="font-medium text-muted-foreground text-[10px] uppercase tracking-wider">
        {errorText ? "Error" : "Result"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto rounded-md text-xs [&_table]:w-full",
          errorText
            ? "bg-destructive/10 text-destructive"
            : "bg-background/50 text-foreground"
        )}
      >
        {errorText && <div className="p-2 text-sm">{errorText}</div>}
        {Output}
      </div>
    </div>
  );
};
