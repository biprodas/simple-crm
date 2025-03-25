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
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../apis/queries";
import { useOpenInvoice } from "../hooks/use-open-invoice";
import { InvoiceForm } from "./invoice-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditInvoiceSheet = () => {
  const { isOpen, onClose, id } = useOpenInvoice();

  const invoiceQuery = useGetInvoiceQuery(id);
  const editMutation = useUpdateInvoiceMutation();

  const defaultValues = {
    name: invoiceQuery.data?.data.name || "",
  };

  const isLoading = invoiceQuery.isLoading;

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
          <SheetTitle>Edit Invoice</SheetTitle>

          <SheetDescription>Edit an existing invoice.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <InvoiceForm
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
