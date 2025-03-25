"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DeleteInvoiceDialog from "~/features/invoice/components/delete-invoice-dialog";
import { useDeleteInvoice } from "~/features/invoice/hooks/use-delete-invoice";
import { useOpenInvoice } from "~/features/invoice/hooks/use-open-invoice";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenInvoice();
  const invoiceModal = useDeleteInvoice();

  return (
    <>
      <DeleteInvoiceDialog
        title="Delete Invoice"
        description="Are you to delete this Invoice? This will permanently remove from our servers. This action cannot be undone."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => invoiceModal.onOpen(id)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
