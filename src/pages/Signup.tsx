
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthButton } from "@/components/AuthButton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      
      console.log("✅ UID:", user.uid);
      toast.success("Account created successfully");
      navigate(`/admin/${user.uid}`);
    } catch (error: any) {
      console.error("❌ Signup failed:", error.message);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Admin Account" 
      subtitle="Enter your details to create an admin account"
    >
      <form onSubmit={handleSignup} className="space-y-4">
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
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
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
        
        <div className="space-y-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <AuthButton type="submit" loading={loading} fullWidth>
          Create Account
        </AuthButton>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">Already have an account?</span>{" "}
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
