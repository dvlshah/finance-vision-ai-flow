
import { Coins } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-muted-foreground" />
          <span className="font-bold">FinanceVision</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
          © {new Date().getFullYear()} FinanceVision. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
