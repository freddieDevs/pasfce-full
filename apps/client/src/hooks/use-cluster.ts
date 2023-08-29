import { create } from 'zustand'



interface useClusterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useClusterModal = create<useClusterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));