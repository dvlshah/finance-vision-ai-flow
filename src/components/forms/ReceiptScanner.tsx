
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, Check, AlertCircle, Loader2, RefreshCw, Edit3, Eye, ArrowLeft } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';

interface ReceiptScannerProps {
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  value: string;
}

export const ReceiptScanner = ({ onSubmit, onCancel }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([]);
  const [showOCRVisualization, setShowOCRVisualization] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const generateMockBoundingBoxes = (imageWidth: number, imageHeight: number) => {
    // Mock bounding boxes for demonstration - in real app these would come from OCR service
    return [
      {
        x: imageWidth * 0.1,
        y: imageHeight * 0.15,
        width: imageWidth * 0.6,
        height: imageHeight * 0.08,
        label: 'Merchant',
        confidence: 92,
        value: 'Coffee Bean & Tea'
      },
      {
        x: imageWidth * 0.7,
        y: imageHeight * 0.35,
        width: imageWidth * 0.2,
        height: imageHeight * 0.05,
        label: 'Total',
        confidence: 96,
        value: '$24.67'
      },
      {
        x: imageWidth * 0.1,
        y: imageHeight * 0.25,
        width: imageWidth * 0.4,
        height: imageHeight * 0.04,
        label: 'Date',
        confidence: 88,
        value: '2024-06-11'
      },
      {
        x: imageWidth * 0.1,
        y: imageHeight * 0.45,
        width: imageWidth * 0.3,
        height: imageHeight * 0.04,
        label: 'Item',
        confidence: 85,
        value: 'Specialty Coffee'
      },
      {
        x: imageWidth * 0.1,
        y: imageHeight * 0.52,
        width: imageWidth * 0.25,
        height: imageHeight * 0.04,
        label: 'Item',
        confidence: 82,
        value: 'Pastry'
      }
    ];
  };

  const simulateAdvancedScanning = (fileName?: string, file?: File) => {
    setIsScanning(true);
    setProgress(0);

    // If there's a file, create an image URL for visualization
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }

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
          
          // Show OCR visualization step
          setShowOCRVisualization(true);
          
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
      
      simulateAdvancedScanning(file.name, file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const boxes = generateMockBoundingBoxes(img.naturalWidth, img.naturalHeight);
    setBoundingBoxes(boxes);
  };

  const handleProceedFromOCR = () => {
    setShowOCRVisualization(false);
  };

  const handleBackToOCR = () => {
    setShowOCRVisualization(true);
    setEditMode(false);
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
    setShowOCRVisualization(false);
    setUploadedImage(null);
    setBoundingBoxes([]);
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
            {uploadedImage && (
              <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded receipt" 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              </div>
            )}
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

  // OCR Visualization Step
  if (showOCRVisualization && uploadedImage && scannedData) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-blue-500" />
              OCR Analysis Results
            </div>
            <Button variant="outline" size="sm" onClick={handleProceedFromOCR}>
              Continue <ArrowLeft size={16} className="ml-1 rotate-180" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <img 
              src={uploadedImage} 
              alt="Receipt with OCR overlay" 
              className="w-full max-h-96 object-contain rounded-lg border"
              onLoad={handleImageLoad}
            />
            
            {/* Bounding boxes overlay */}
            <div className="absolute inset-0">
              {boundingBoxes.map((box, index) => (
                <div
                  key={index}
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-10 rounded"
                  style={{
                    left: `${(box.x / 800) * 100}%`,
                    top: `${(box.y / 600) * 100}%`,
                    width: `${(box.width / 800) * 100}%`,
                    height: `${(box.height / 600) * 100}%`,
                  }}
                >
                  <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                    {box.label}: {box.value}
                    <ConfidenceBadge confidence={box.confidence} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Detected Fields:</h4>
              {boundingBoxes.map((box, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{box.label}:</span>
                  <div className="flex items-center gap-2">
                    <span>{box.value}</span>
                    <ConfidenceBadge confidence={box.confidence} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Processing Summary:</h4>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                <div className="flex items-center gap-2 text-green-800">
                  <Check size={16} />
                  <span className="font-medium">OCR Complete</span>
                </div>
                <div className="mt-2 space-y-1 text-green-700">
                  <div>• Merchant: {scannedData.merchant}</div>
                  <div>• Total: ${scannedData.amount}</div>
                  <div>• {scannedData.items?.length || 0} items detected</div>
                  <div>• Overall confidence: {scannedData.confidence}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
            <Button onClick={handleProceedFromOCR} className="w-full">
              Continue to Review
            </Button>
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
              <Button variant="ghost" size="sm" onClick={handleBackToOCR}>
                <Eye size={16} />
              </Button>
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
