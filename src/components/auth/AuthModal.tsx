import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
}

type AuthView = 'signin' | 'signup' | 'forgot-password';

export const AuthModal = ({ isOpen, onClose, initialView = 'signin' }: AuthModalProps) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic when Supabase is connected
    console.log('Auth form submitted:', { currentView, formData });
  };

  const SignInForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setCurrentView('forgot-password')}
          className="text-sm text-primary hover:underline"
        >
          Forgot your password?
        </button>
      </div>

      <Separator />

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => setCurrentView('signup')}
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </button>
      </div>
    </form>
  );

  const SignUpForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>

      <div className="text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </div>

      <Separator />

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setCurrentView('signin')}
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </button>
      </div>
    </form>
  );

  const ForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center space-y-2 mb-4">
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setCurrentView('signin')}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </button>
      </div>
    </form>
  );

  const getTitle = () => {
    switch (currentView) {
      case 'signin': return 'Welcome back';
      case 'signup': return 'Create your account';
      case 'forgot-password': return 'Reset password';
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case 'signin': return 'Sign in to your FinanceVision account';
      case 'signup': return 'Start your journey to financial freedom';
      case 'forgot-password': return 'We\'ll help you get back in';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold">
            {getTitle()}
          </DialogTitle>
          <p className="text-muted-foreground">
            {getSubtitle()}
          </p>
        </DialogHeader>

        <div className="mt-6">
          {currentView === 'signin' && <SignInForm />}
          {currentView === 'signup' && <SignUpForm />}
          {currentView === 'forgot-password' && <ForgotPasswordForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};