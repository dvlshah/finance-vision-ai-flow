
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Upload, FileText, Camera, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Upload = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Documents</h1>
          <p className="text-slate-600">Upload and manage your financial documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Bank Statements</CardTitle>
              <CardDescription>Upload PDF or image files of your bank statements</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Statements
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Camera className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Receipts</CardTitle>
              <CardDescription>Scan or upload receipt images for expense tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Scan Receipt
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Folder className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>Upload W-2s, 1099s, and other tax-related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Tax Docs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
