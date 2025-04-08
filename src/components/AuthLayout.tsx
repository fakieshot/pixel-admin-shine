
import React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
