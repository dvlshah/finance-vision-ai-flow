
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Goal, Wallet } from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Wallet />,
    title: "All Accounts in One Place",
    description: "Connect all your bank accounts and credit cards for a complete, unified view of your financial life.",
  },
  {
    icon: <Zap />,
    title: "AI-Powered Insights",
    description: "Our smart AI analyzes your spending patterns and provides actionable insights to help you save more.",
  },
  {
    icon: <Goal />,
    title: "Track Financial Goals",
    description: "Set, track, and achieve your financial goals, from saving for a vacation to planning for retirement.",
  },
];

const Features = () => {
  return (
    <section className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Key{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          Features
        </span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }) => (
          <Card key={title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default Features;
