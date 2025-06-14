
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced machine learning analyzes your spending patterns and provides personalized recommendations.",
      badge: "Smart",
      gradient: "from-purple-500 to-purple-600",
      benefits: ["Automatic categorization", "Spending predictions", "Smart budgeting"]
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description: "Beautiful, interactive charts and graphs that make your financial data easy to understand.",
      badge: "Visual",
      gradient: "from-blue-500 to-blue-600",
      benefits: ["Real-time dashboards", "Custom reports", "Trend analysis"]
    },
    {
      icon: TrendingUp,
      title: "Goal Tracking",
      description: "Set and monitor financial goals with intelligent progress tracking and milestone celebrations.",
      badge: "Goals",
      gradient: "from-green-500 to-green-600",
      benefits: ["Smart goal setting", "Progress monitoring", "Achievement rewards"]
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security protocols.",
      badge: "Secure",
      gradient: "from-red-500 to-red-600",
      benefits: ["256-bit encryption", "SOC 2 compliant", "Zero data sharing"]
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Access your financial insights anywhere with our responsive design and mobile app.",
      badge: "Mobile",
      gradient: "from-indigo-500 to-indigo-600",
      benefits: ["iOS & Android apps", "Offline access", "Push notifications"]
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Connect multiple accounts and get real-time updates across all your financial institutions.",
      badge: "Fast",
      gradient: "from-yellow-500 to-yellow-600",
      benefits: ["Real-time sync", "Multi-bank support", "Automatic updates"]
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-clash-display text-slate-900">
            Everything you need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              master your finances
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful tools and intelligent insights designed to help you take control of your financial future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Ready to transform your financial life?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their finances with FinanceVision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-600/25 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-lg font-medium transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
