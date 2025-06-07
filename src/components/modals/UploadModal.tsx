
import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

  const handleFiles = (files: File[]) => {
    setUploadedFiles(files);
    setIsProcessing(true);
    
    // Simulate upload and processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setUploadProgress(0);
        }, 1000);
      }
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Financial Documents</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
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
              Support for bank statements, investment reports, tax documents, and more
            </p>
            <Button variant="outline">
              Choose Files
            </Button>
          </div>
          
          {isProcessing && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium">Processing documents with AI...</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-slate-500">
                Analyzing transactions, categorizing expenses, and extracting financial data
              </p>
            </div>
          )}
          
          {uploadedFiles.length > 0 && !isProcessing && (
            <div className="space-y-3">
              <h4 className="font-medium">Uploaded Files</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-green-600" />
                  <FileText size={16} className="text-slate-600" />
                  <span className="text-sm font-medium flex-1">{file.name}</span>
                  <span className="text-xs text-green-600">Processed</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} disabled={isProcessing}>
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
