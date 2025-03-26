import { create } from "zustand";

type NewCredentialStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewCredential = create<NewCredentialStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
