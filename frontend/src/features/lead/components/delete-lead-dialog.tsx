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
import { useDeleteLead } from "../hooks/use-delete-lead";
import { useDeleteLeadMutation } from "../apis/queries";

interface DeleteModalProps {
  title?: string;
  description?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  trigger?: ReactNode;
}

const DeleteLeadDialog = ({
  title = "Delete",
  description = "Are you sure ?",
  confirmBtnLabel = "Delete",
  cancelBtnLabel = "Cancel",
}: DeleteModalProps) => {
  const leadModal = useDeleteLead();

  const { mutateAsync: deleteLead, isPending } =
    useDeleteLeadMutation();

  const handleClose = () => {
    leadModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteLead(leadModal.id ?? "");
      leadModal.onClose();
      toast.success(`Lead removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog
      open={leadModal.isOpen}
      onOpenChange={leadModal.onClose}
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

export default DeleteLeadDialog;
