
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

export function AuthButton({ 
  children, 
  className, 
  loading, 
  fullWidth, 
  disabled, 
  ...props 
}: AuthButtonProps) {
  return (
    <Button
      className={cn(
        "relative", 
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}
