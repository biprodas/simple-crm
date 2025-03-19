import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  useGetLeadQuery,
  useUpdateLeadMutation,
} from "../apis/queries";
import { useOpenLead } from "../hooks/use-open-lead";
import { LeadForm } from "./lead-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditLeadSheet = () => {
  const { isOpen, onClose, id } = useOpenLead();

  const leadQuery = useGetLeadQuery(id);
  const editMutation = useUpdateLeadMutation();

  const defaultValues = {
    name: leadQuery.data?.data.name || "",
    acronym: leadQuery.data?.data.acronym || "",
  };

  const isLoading = leadQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    console.log("values", values);
    editMutation.mutate(
      { ...values, id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Lead</SheetTitle>

          <SheetDescription>Edit an existing lead.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <LeadForm
            id={id}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            disabled={editMutation.isPending}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
