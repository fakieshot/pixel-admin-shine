
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthButton } from "@/components/AuthButton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      toast.success("Successfully logged in");
      navigate(`/admin/${user.uid}`);
    } catch (error: any) {
      console.error("❌ Login failed:", error.message);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <AuthButton type="submit" loading={loading} fullWidth>
          Sign In
        </AuthButton>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">Don't have an account?</span>{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
}
