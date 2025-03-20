"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DeleteLeadDialog from "~/features/lead/components/delete-lead-dialog";
import { useDeleteLead } from "~/features/lead/hooks/use-delete-lead";
import { useOpenLead } from "~/features/lead/hooks/use-open-lead";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenLead();
  const departmentModal = useDeleteLead();

  return (
    <>
      <DeleteLeadDialog
        title="Delete Department"
        description="Are you to delete this department? This will permanently remove from our servers. This action cannot be undone."
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
          <DropdownMenuItem onClick={() => departmentModal.onOpen(id)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
