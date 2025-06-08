import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';

interface ReceiptScannerProps {
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

export const ReceiptScanner = ({ onSubmit, onCancel }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const simulateScanning = () => {
    setIsScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScannedData({
            merchant: 'Coffee Shop',
            amount: 12.45,
            date: new Date().toISOString(),
            category: 'Food & Dining',
            items: [
              { name: 'Latte', price: 5.50, confidence: 95 },
              { name: 'Croissant', price: 4.95, confidence: 88 },
              { name: 'Tax', price: 2.00, confidence: 92 }
            ],
            confidence: 91
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateScanning();
    }
  };

  const handleSubmit = () => {
    if (scannedData) {
      onSubmit({
        amount: scannedData.amount,
        description: `${scannedData.merchant} - Receipt scan`,
        category: scannedData.category,
        type: 'expense',
        date: scannedData.date,
        source: 'receipt_scan',
        confidence: scannedData.confidence,
        metadata: {
          merchant: scannedData.merchant,
          items: scannedData.items
        }
      });
    }
  };

  if (isScanning) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            Scanning Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Processing your receipt...
            </div>
            <Progress value={progress} className="w-full" />
            <div className="text-xs text-muted-foreground">
              {progress < 30 && "Reading text..."}
              {progress >= 30 && progress < 60 && "Identifying items..."}
              {progress >= 60 && progress < 90 && "Calculating totals..."}
              {progress >= 90 && "Almost done!"}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (scannedData) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check size={20} className="text-green-500" />
            Receipt Scanned
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Merchant</span>
              <span>{scannedData.merchant}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="text-lg font-mono">${scannedData.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Category</span>
              <span>{scannedData.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Confidence</span>
              <ConfidenceBadge confidence={scannedData.confidence} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Items Detected</Label>
            <div className="space-y-1 text-sm">
              {scannedData.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <ConfidenceBadge confidence={item.confidence} />
                  </div>
                  <span className="font-mono">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full">
              Add Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera size={20} />
          Scan Receipt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            Take a photo or upload an image of your receipt
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera size={24} />
              <span className="text-sm">Take Photo</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={24} />
              <span className="text-sm">Upload Image</span>
            </Button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-2 justify-center">
              <AlertCircle size={12} />
              <span>Supported formats: JPG, PNG, PDF</span>
            </div>
            <div>Best results with clear, well-lit images</div>
          </div>
        </div>

        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};
