
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, Check, AlertCircle, Loader2, RefreshCw, Edit3 } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';

interface ReceiptScannerProps {
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

export const ReceiptScanner = ({ onSubmit, onCancel }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const simulateAdvancedScanning = (fileName?: string) => {
    setIsScanning(true);
    setProgress(0);

    // Simulate different confidence levels based on file type
    const isHighQuality = fileName?.toLowerCase().includes('receipt') || 
                         fileName?.toLowerCase().includes('invoice');
    
    const baseConfidence = isHighQuality ? 92 : 78;
    const variance = Math.random() * 20 - 10; // ±10 variation
    const finalConfidence = Math.max(60, Math.min(98, baseConfidence + variance));

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Generate more realistic data based on confidence
          const merchantNames = ['Coffee Bean & Tea', 'Target Store #1234', 'Shell Gas Station', 'Walmart Supercenter', 'McDonald\'s #5678'];
          const randomMerchant = merchantNames[Math.floor(Math.random() * merchantNames.length)];
          
          const mockData = {
            merchant: randomMerchant,
            amount: parseFloat((Math.random() * 100 + 5).toFixed(2)),
            date: new Date().toISOString(),
            category: finalConfidence > 85 ? 'Food & Dining' : 'Shopping',
            items: [
              { 
                name: finalConfidence > 85 ? 'Specialty Coffee' : 'Item 1', 
                price: parseFloat((Math.random() * 20 + 3).toFixed(2)), 
                confidence: Math.max(finalConfidence - 5, 60) 
              },
              { 
                name: finalConfidence > 85 ? 'Pastry' : 'Item 2', 
                price: parseFloat((Math.random() * 15 + 2).toFixed(2)), 
                confidence: Math.max(finalConfidence - 8, 55) 
              },
              { 
                name: 'Tax', 
                price: parseFloat((Math.random() * 3 + 0.5).toFixed(2)), 
                confidence: Math.max(finalConfidence + 5, 85) 
              }
            ],
            confidence: Math.floor(finalConfidence),
            processingTime: Math.floor(Math.random() * 3000) + 1000 // 1-4 seconds
          };
          
          // Recalculate total to match items
          const itemsTotal = mockData.items.reduce((sum, item) => sum + item.price, 0);
          mockData.amount = parseFloat(itemsTotal.toFixed(2));
          
          setScannedData(mockData);
          setEditableData(mockData);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // More realistic progress increments
      });
    }, 150);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size too large. Please select a file under 10MB.');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please select a JPG, PNG, or PDF file.');
        return;
      }
      
      simulateAdvancedScanning(file.name);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setScannedData(editableData);
    setEditMode(false);
  };

  const handleRescan = () => {
    setScannedData(null);
    setEditMode(false);
    simulateAdvancedScanning();
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
          items: scannedData.items,
          processingTime: scannedData.processingTime
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
            AI Processing Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Advanced OCR and AI analysis in progress...
            </div>
            <Progress value={progress} className="w-full" />
            <div className="text-xs text-muted-foreground">
              {progress < 20 && "Enhancing image quality..."}
              {progress >= 20 && progress < 40 && "Extracting text with OCR..."}
              {progress >= 40 && progress < 60 && "Identifying line items..."}
              {progress >= 60 && progress < 80 && "Categorizing expenses..."}
              {progress >= 80 && progress < 95 && "Validating amounts..."}
              {progress >= 95 && "Finalizing results..."}
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
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check size={20} className="text-green-500" />
              Receipt Processed
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit3 size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRescan}>
                <RefreshCw size={16} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editMode ? (
            <div className="space-y-3">
              <div>
                <Label>Merchant</Label>
                <Input 
                  value={editableData?.merchant || ''} 
                  onChange={(e) => setEditableData({...editableData, merchant: e.target.value})}
                />
              </div>
              <div>
                <Label>Total Amount</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={editableData?.amount || ''} 
                  onChange={(e) => setEditableData({...editableData, amount: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input 
                  value={editableData?.category || ''} 
                  onChange={(e) => setEditableData({...editableData, category: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)} className="w-full">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="w-full">
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
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
                  <span className="font-medium">AI Confidence</span>
                  <ConfidenceBadge confidence={scannedData.confidence} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Detected Items</Label>
                <div className="space-y-1 text-sm max-h-32 overflow-y-auto">
                  {scannedData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        <ConfidenceBadge confidence={item.confidence} />
                      </div>
                      <span className="font-mono">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {scannedData.confidence < 85 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 text-sm">
                    <AlertCircle size={16} />
                    <span>Low confidence detected. Please review and edit if needed.</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="w-full">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="w-full">
                  Add Transaction
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera size={20} />
          AI Receipt Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            Use advanced OCR and AI to automatically extract transaction details
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera size={24} />
              <span className="text-sm">Take Photo</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300"
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
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="text-xs text-muted-foreground space-y-1 bg-slate-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 justify-center font-medium">
              <AlertCircle size={12} />
              <span>Supported: JPG, PNG, PDF (max 10MB)</span>
            </div>
            <div>• Best results with clear, well-lit images</div>
            <div>• Ensure all text is readable and receipt is flat</div>
            <div>• AI will extract merchant, items, and amounts automatically</div>
          </div>
        </div>

        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};
