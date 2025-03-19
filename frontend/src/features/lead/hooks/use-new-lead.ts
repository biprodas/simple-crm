import { create } from "zustand";

type NewLeadStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewLead = create<NewLeadStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
