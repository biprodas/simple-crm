import { ReactNode } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useDeleteInvoice } from "../hooks/use-delete-invoice";
import { useDeleteInvoiceMutation } from "../apis/queries";

interface DeleteModalProps {
  title?: string;
  description?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  trigger?: ReactNode;
}

const DeleteInvoiceDialog = ({
  title = "Delete",
  description = "Are you sure ?",
  confirmBtnLabel = "Delete",
  cancelBtnLabel = "Cancel",
}: DeleteModalProps) => {
  const invoiceModal = useDeleteInvoice();

  const { mutateAsync: deleteInvoice, isPending } =
    useDeleteInvoiceMutation();

  const handleClose = () => {
    invoiceModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteInvoice(invoiceModal.id ?? "");
      invoiceModal.onClose();
      toast.success(`Invoice removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog
      open={invoiceModal.isOpen}
      onOpenChange={invoiceModal.onClose}
    >
      {/* {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>} */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={isPending}>
            {cancelBtnLabel}
          </AlertDialogCancel>
          {/* <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction> */}
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {confirmBtnLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInvoiceDialog;
