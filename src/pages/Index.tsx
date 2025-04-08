
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to Your Website</h1>
        <p className="text-xl text-slate-600 mb-8">Access your admin account by signing in or create a new account.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/login" className="min-w-[120px]">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/signup" className="min-w-[120px]">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
