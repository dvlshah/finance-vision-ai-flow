
import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, X, FileText, CheckCircle, AlertTriangle, Camera, CreditCard, DollarSign, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProcessedFile {
  id: string;
  file: File;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  type: 'bank_statement' | 'credit_card' | 'investment' | 'tax_document' | 'receipt' | 'other';
  extractedData?: {
    institution?: string;
    accountNumber?: string;
    dateRange?: string;
    transactionCount?: number;
    confidence?: number;
  };
  error?: string;
}

const getFileTypeIcon = (type: ProcessedFile['type']) => {
  switch (type) {
    case 'bank_statement': return CreditCard;
    case 'credit_card': return CreditCard;
    case 'investment': return DollarSign;
    case 'tax_document': return FileText;
    case 'receipt': return Camera;
    default: return FileText;
  }
};

const detectFileType = (file: File): ProcessedFile['type'] => {
  const name = file.name.toLowerCase();
  if (name.includes('bank') || name.includes('statement')) return 'bank_statement';
  if (name.includes('credit') || name.includes('card')) return 'credit_card';
  if (name.includes('investment') || name.includes('portfolio')) return 'investment';
  if (name.includes('tax') || name.includes('w2') || name.includes('1099')) return 'tax_document';
  if (file.type.startsWith('image/')) return 'receipt';
  return 'other';
};

export const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const simulateAIExtraction = (file: File, type: ProcessedFile['type']) => {
    // Simulate AI extraction based on file type
    const mockData = {
      bank_statement: {
        institution: 'Chase Bank',
        accountNumber: '****1234',
        dateRange: 'Jan 1 - Jan 31, 2024',
        transactionCount: 45,
        confidence: 94
      },
      credit_card: {
        institution: 'Capital One',
        accountNumber: '****5678',
        dateRange: 'Dec 1 - Dec 31, 2023',
        transactionCount: 28,
        confidence: 89
      },
      investment: {
        institution: 'Vanguard',
        accountNumber: '****9012',
        dateRange: 'Q4 2023',
        transactionCount: 12,
        confidence: 96
      }
    };

    return mockData[type] || {
      institution: 'Unknown',
      dateRange: 'Unknown',
      transactionCount: 0,
      confidence: 60
    };
  };

  const handleFiles = (files: File[]) => {
    setIsProcessing(true);
    
    const newFiles: ProcessedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'processing' as const,
      progress: 0,
      type: detectFileType(file)
    }));
    
    setProcessedFiles(newFiles);

    // Simulate processing each file
    newFiles.forEach((processedFile, index) => {
      const interval = setInterval(() => {
        setProcessedFiles(prev => prev.map(f => {
          if (f.id === processedFile.id) {
            const newProgress = Math.min(f.progress + 15, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              return {
                ...f,
                status: 'completed' as const,
                progress: 100,
                extractedData: simulateAIExtraction(f.file, f.type)
              };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 300 + index * 100); // Stagger processing
    });

    // Stop processing when all files are done
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000 + newFiles.length * 500);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (fileId: string) => {
    setProcessedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'bg-gray-100 text-gray-800';
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Financial Documents</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium mb-2">Drop your documents here</h3>
            <p className="text-slate-500 mb-4">
              Support for bank statements, investment reports, tax documents, receipts, and more
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.csv,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
            </div>
            
            {/* File Type Hints */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CreditCard size={12} /> Bank Statements
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={12} /> Investment Reports
              </span>
              <span className="flex items-center gap-1">
                <FileText size={12} /> Tax Documents
              </span>
              <span className="flex items-center gap-1">
                <Camera size={12} /> Receipts
              </span>
            </div>
          </div>
          
          {/* Processing Status */}
          {isProcessing && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium">Processing documents with AI...</span>
              </div>
              <p className="text-xs text-slate-500">
                Analyzing content, extracting transactions, and categorizing data
              </p>
            </div>
          )}
          
          {/* Processed Files */}
          {processedFiles.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Document Analysis Results</h4>
              {processedFiles.map((file) => {
                const IconComponent = getFileTypeIcon(file.type);
                return (
                  <div key={file.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <IconComponent size={20} className="text-slate-600 mt-1" />
                        <div>
                          <h5 className="font-medium text-sm">{file.file.name}</h5>
                          <p className="text-xs text-slate-500 capitalize">
                            {file.type.replace('_', ' ')} • {(file.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {file.status === 'completed' && (
                          <CheckCircle size={16} className="text-green-600" />
                        )}
                        {file.status === 'error' && (
                          <AlertTriangle size={16} className="text-red-600" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {file.status === 'processing' && (
                      <Progress value={file.progress} className="w-full h-2" />
                    )}
                    
                    {file.status === 'completed' && file.extractedData && (
                      <div className="bg-slate-50 rounded-md p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Extraction Results</span>
                          <Badge className={getConfidenceColor(file.extractedData.confidence)}>
                            {file.extractedData.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Institution:</span>
                            <p className="font-medium">{file.extractedData.institution}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Account:</span>
                            <p className="font-medium">{file.extractedData.accountNumber}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Period:</span>
                            <p className="font-medium">{file.extractedData.dateRange}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Transactions:</span>
                            <p className="font-medium">{file.extractedData.transactionCount}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={onClose} 
              disabled={isProcessing || processedFiles.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Import {processedFiles.filter(f => f.status === 'completed').length} Documents
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
