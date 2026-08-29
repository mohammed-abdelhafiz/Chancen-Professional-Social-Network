"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!controlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={className} data-value={currentValue}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error("TabsList must be used within Tabs");
    }
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, onClick, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error("TabsTrigger must be used within Tabs");
    }
    const isActive = context.value === value;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onValueChange?.(value);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          isActive && "bg-background text-foreground shadow-sm",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error("TabsContent must be used within Tabs");
    }
    const isActive = context.value === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
