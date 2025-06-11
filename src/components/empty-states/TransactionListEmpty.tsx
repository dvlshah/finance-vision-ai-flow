
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Plus, FileText, CreditCard } from 'lucide-react';

interface TransactionListEmptyProps {
  onUploadClick: () => void;
  onAddTransactionClick: () => void;
}

export const TransactionListEmpty = ({ onUploadClick, onAddTransactionClick }: TransactionListEmptyProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">No Transactions Yet</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Start tracking your finances by adding your first transaction or importing your bank statements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <Button 
              onClick={onUploadClick}
              className="h-20 flex flex-col gap-2"
            >
              <Upload className="h-5 w-5" />
              <div>
                <div className="font-medium text-xs">Upload Statements</div>
                <div className="text-xs opacity-80">Import CSV/PDF</div>
              </div>
            </Button>

            <Button 
              onClick={onAddTransactionClick}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <div>
                <div className="font-medium text-xs">Add Transaction</div>
                <div className="text-xs opacity-70">Manual entry</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <FileText className="h-5 w-5" />
              <div>
                <div className="font-medium text-xs">Scan Receipt</div>
                <div className="text-xs opacity-70">Photo capture</div>
              </div>
            </Button>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            Your financial data is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
