
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                <Sparkles className="w-4 h-4" />
                AI-Powered Financial Intelligence
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-clash-display leading-tight">
                <span className="block text-slate-900">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Financial Future
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Harness the power of AI to understand your spending, optimize your budgets, and achieve your financial goals with unprecedented clarity and confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 transform hover:scale-105 transition-all duration-200"
              >
                <Link to="/dashboard" className="inline-flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 hover:bg-slate-50 inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-green-500" />
                Bank-level security
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Zap className="w-4 h-4 text-yellow-500" />
                Setup in minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Real-time insights
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 p-1 border border-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="FinanceVision Dashboard Preview"
                  className="rounded-xl w-full h-auto"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-slate-200/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600">Live Updates</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-3">
                  <div className="text-xs font-medium">+$2,340</div>
                  <div className="text-xs opacity-80">This month</div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-3xl transform -rotate-6 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
