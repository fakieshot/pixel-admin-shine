
import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProfileSetupProgressProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export function ProfileSetupProgress({ currentStep, steps, className }: ProfileSetupProgressProps) {
  const totalSteps = steps.length;
  const progress = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}
