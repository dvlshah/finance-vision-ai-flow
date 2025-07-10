
import { Button } from "@/components/ui/button";
import { Coins, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; view: 'signin' | 'signup' }>({
    isOpen: false,
    view: 'signin'
  });
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const openAuthModal = (view: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, view });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, view: 'signin' });
  };

  const handleAuthSuccess = () => {
    closeAuthModal();
    setOnboardingOpen(true);
  };

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
    // TODO: Redirect to dashboard when Supabase is connected
    console.log('Onboarding completed');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Coins className="h-8 w-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              FinanceVision
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-blue-600"
              onClick={() => openAuthModal('signin')}
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/25"
              onClick={() => openAuthModal('signup')}
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200/20 bg-white/95 backdrop-blur-lg">
          <nav className="container py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <hr className="border-slate-200" />
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-slate-600 hover:text-blue-600"
                onClick={() => openAuthModal('signin')}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => openAuthModal('signup')}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialView={authModal.view}
      />

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </header>
  );
};

export default LandingHeader;
