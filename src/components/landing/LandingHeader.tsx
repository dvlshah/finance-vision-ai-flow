
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Coins className="h-6 w-6 mr-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500" />
          <span className="font-bold">FinanceVision</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
            {/* Future nav links like "Features" or "Pricing" can be added here */}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default LandingHeader;
