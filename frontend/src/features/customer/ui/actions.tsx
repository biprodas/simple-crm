"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DeleteCustomerDialog from "~/features/customer/components/delete-customer-dialog";
import { useDeleteCustomer } from "~/features/customer/hooks/use-delete-customer";
import { useOpenCustomer } from "~/features/customer/hooks/use-open-customer";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenCustomer();
  const customerModal = useDeleteCustomer();

  return (
    <>
      <DeleteCustomerDialog
        title="Delete Customer"
        description="Are you to delete this Customer? This will permanently remove from our servers. This action cannot be undone."
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
          <DropdownMenuItem onClick={() => customerModal.onOpen(id)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
