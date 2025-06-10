
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileText, Download, Mail, Calendar, BarChart3, PieChart } from 'lucide-react';
import { useState } from 'react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  type: 'summary' | 'detailed' | 'category' | 'budget';
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Overview of income, expenses, and savings for the month',
    icon: <BarChart3 className="h-5 w-5" />,
    type: 'summary'
  },
  {
    id: 'category-breakdown',
    name: 'Category Breakdown',
    description: 'Detailed spending analysis by category',
    icon: <PieChart className="h-5 w-5" />,
    type: 'category'
  },
  {
    id: 'budget-performance',
    name: 'Budget Performance',
    description: 'Budget vs actual spending analysis',
    icon: <BarChart3 className="h-5 w-5" />,
    type: 'budget'
  },
  {
    id: 'transaction-detail',
    name: 'Transaction Details',
    description: 'Complete list of all transactions with filters',
    icon: <FileText className="h-5 w-5" />,
    type: 'detailed'
  }
];

export const ReportsGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [timeRange, setTimeRange] = useState('current-month');
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Generating report:', {
      template: selectedTemplate,
      timeRange,
      format,
      options: {
        includeCharts,
        includeInsights,
        emailReport
      }
    });
    
    setIsGenerating(false);
    
    // In a real app, this would download the file or send email
    alert('Report generated successfully!');
  };

  const getSelectedTemplate = () => {
    return reportTemplates.find(t => t.id === selectedTemplate);
  };

  const handleChartsChange = (checked: boolean | "indeterminate") => {
    setIncludeCharts(checked === true);
  };

  const handleInsightsChange = (checked: boolean | "indeterminate") => {
    setIncludeInsights(checked === true);
  };

  const handleEmailChange = (checked: boolean | "indeterminate") => {
    setEmailReport(checked === true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Report Template</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-slate-600 mt-0.5">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-slate-600">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="current-year">Current Year</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="html">HTML Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Report Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-charts" 
                  checked={includeCharts}
                  onCheckedChange={handleChartsChange}
                />
                <Label htmlFor="include-charts" className="text-sm">Include charts and visualizations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-insights" 
                  checked={includeInsights}
                  onCheckedChange={handleInsightsChange}
                />
                <Label htmlFor="include-insights" className="text-sm">Include financial insights and recommendations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-report" 
                  checked={emailReport}
                  onCheckedChange={handleEmailChange}
                />
                <Label htmlFor="email-report" className="text-sm">Email report to my address</Label>
              </div>
            </div>
          </div>

          {selectedTemplate && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">Report Preview</h4>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                {getSelectedTemplate()?.icon}
                <span>{getSelectedTemplate()?.name}</span>
                <span>•</span>
                <span>{timeRange.replace('-', ' ')}</span>
                <span>•</span>
                <span>{format.toUpperCase()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleGenerateReport}
              disabled={!selectedTemplate || isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
            {emailReport && (
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="font-medium text-slate-900">Monthly Summary Report</div>
                <div className="text-sm text-slate-600">Every 1st of the month • PDF • Email</div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="font-medium text-slate-900">Weekly Budget Check</div>
                <div className="text-sm text-slate-600">Every Sunday • Excel • Download</div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
