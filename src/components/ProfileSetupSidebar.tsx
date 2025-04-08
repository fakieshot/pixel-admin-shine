
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProfileSetupSidebarProps {
  currentStep: number;
  steps: Step[];
  onStepChange: (stepId: number) => void;
}

export function ProfileSetupSidebar({ currentStep, steps, onStepChange }: ProfileSetupSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <div className="mb-8">
        <h2 className="font-bold text-lg text-gray-900">Filoxenia</h2>
        <p className="text-sm text-gray-500">Profile Setup</p>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <li key={step.id}>
                <button
                  onClick={() => onStepChange(step.id)}
                  className={cn(
                    "flex items-center w-full p-3 rounded-lg text-sm",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100",
                    isCompleted && "text-gray-400"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={cn(
                        "rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs",
                        isActive
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span>{step.title}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
