import { create } from 'zustand'



interface useMemberModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMemberModal = create<useMemberModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));