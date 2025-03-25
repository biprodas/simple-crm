import { create } from "zustand";

type NewCustomerStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewCustomer = create<NewCustomerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
