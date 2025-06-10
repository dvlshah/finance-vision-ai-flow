
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Plus, FileText, TrendingUp } from 'lucide-react';

interface WelcomeHeroProps {
  onUploadClick: () => void;
}

export const WelcomeHero = ({ onUploadClick }: WelcomeHeroProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome to FinanceVision</h1>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              Get started by connecting your accounts or uploading financial statements to see your financial picture come to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <Button 
              onClick={onUploadClick}
              className="h-24 flex flex-col gap-2"
            >
              <Upload className="h-6 w-6" />
              <div>
                <div className="font-medium">Upload Statements</div>
                <div className="text-xs opacity-80">Import your data</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <Plus className="h-6 w-6" />
              <div>
                <div className="font-medium">Add Transaction</div>
                <div className="text-xs opacity-70">Manual entry</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <FileText className="h-6 w-6" />
              <div>
                <div className="font-medium">Scan Receipt</div>
                <div className="text-xs opacity-70">Photo capture</div>
              </div>
            </Button>
          </div>

          <div className="pt-4 text-sm text-slate-500">
            Your data is secure and private. We use bank-level encryption to protect your information.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
