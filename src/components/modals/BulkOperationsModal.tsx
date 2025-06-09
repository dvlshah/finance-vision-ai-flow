
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Archive, Trash2, Tag } from 'lucide-react';

interface BulkOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onBulkEdit: (category: string) => void;
  onBulkDelete: () => void;
  onBulkArchive: () => void;
}

export const BulkOperationsModal = ({ 
  isOpen, 
  onClose, 
  selectedCount, 
  onBulkEdit,
  onBulkDelete,
  onBulkArchive 
}: BulkOperationsModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  const categories = [
    'Food', 'Income', 'Entertainment', 'Transportation', 'Shopping', 
    'Housing', 'Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const handleCategoryChange = () => {
    if (selectedCategory) {
      onBulkEdit(selectedCategory);
      setSelectedCategory('');
      onClose();
    }
  };

  const handleDelete = () => {
    onBulkDelete();
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleArchive = () => {
    onBulkArchive();
    setShowArchiveConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Operations</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              {selectedCount} transaction{selectedCount !== 1 ? 's' : ''} selected
            </p>

            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Tag size={16} />
                  Change Category
                </h4>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select new category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleCategoryChange}
                    disabled={!selectedCategory}
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Archive size={16} />
                  Archive Transactions
                </h4>
                <Button 
                  variant="outline" 
                  onClick={() => setShowArchiveConfirm(true)}
                  className="w-full justify-start"
                >
                  Archive {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-600 flex items-center gap-2">
                  <Trash2 size={16} />
                  Delete Transactions
                </h4>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full justify-start"
                >
                  Delete {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Confirmation */}
      <AlertDialog open={showArchiveConfirm} onOpenChange={setShowArchiveConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Transactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}? 
              Archived transactions can be restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchive}>
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
