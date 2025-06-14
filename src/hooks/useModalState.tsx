
import { useState } from 'react';

export type QuickActionType = 'transaction' | 'budget' | 'receipt' | null;

export const useModalState = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [quickActionModal, setQuickActionModal] = useState<{
    isOpen: boolean;
    actionType: QuickActionType;
  }>({
    isOpen: false,
    actionType: null
  });

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const openQuickActionModal = (actionType: Exclude<QuickActionType, null>) => {
    setQuickActionModal({
      isOpen: true,
      actionType
    });
  };

  const closeQuickActionModal = () => {
    setQuickActionModal({
      isOpen: false,
      actionType: null
    });
  };

  return {
    uploadModal: {
      isOpen: isUploadModalOpen,
      open: openUploadModal,
      close: closeUploadModal
    },
    quickActionModal: {
      ...quickActionModal,
      open: openQuickActionModal,
      close: closeQuickActionModal
    }
  };
};
