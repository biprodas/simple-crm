import { create } from "zustand";

type NewInvoiceStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewInvoice = create<NewInvoiceStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
