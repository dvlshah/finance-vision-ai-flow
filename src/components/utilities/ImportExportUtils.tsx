
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, FileText, Database } from 'lucide-react';
import { useRef } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  reason?: string;
  account?: string;
  merchant?: string;
}

interface ImportExportUtilsProps {
  transactions: Transaction[];
  onImport: (transactions: Transaction[]) => void;
}

export const ImportExportUtils = ({ transactions, onImport }: ImportExportUtilsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Category', 'Account', 'Merchant'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        `"${t.description.replace(/"/g, '""')}"`,
        t.amount,
        t.category,
        t.account || '',
        t.merchant || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          const importedTransactions: Transaction[] = [];

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = line.split(',');
            if (values.length >= 4) {
              importedTransactions.push({
                id: `imported-${Date.now()}-${i}`,
                date: values[0],
                description: values[1].replace(/^"|"$/g, '').replace(/""/g, '"'),
                amount: parseFloat(values[2]),
                category: values[3] || 'Other',
                confidence: 90,
                reason: 'Imported from CSV',
                account: values[4] || '',
                merchant: values[5] || ''
              });
            }
          }

          onImport(importedTransactions);
        } else if (file.name.endsWith('.json')) {
          const importedTransactions = JSON.parse(content);
          onImport(importedTransactions);
        }
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file. Please check the format.');
      }
    };

    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={20} />
          Import & Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-3">Export Transactions</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="flex-1"
              size="sm"
            >
              <FileText size={16} className="mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={exportToJSON}
              className="flex-1"
              size="sm"
            >
              <Download size={16} className="mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-3">Import Transactions</h4>
          <div className="space-y-2">
            <Label htmlFor="file-import" className="text-xs text-slate-600">
              Upload CSV or JSON file
            </Label>
            <div className="flex gap-2">
              <Input
                id="file-import"
                type="file"
                accept=".csv,.json"
                onChange={handleFileImport}
                ref={fileInputRef}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                <Upload size={16} className="mr-2" />
                Browse
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              Supports CSV and JSON formats
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
