import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewInvoice } from "../hooks/use-new-invoice";
import { useCreateInvoiceMutation } from "../apis/queries";
import { InvoiceForm } from "./invoice-form";
import toast from "react-hot-toast";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  invoiceNo: z.string().optional(),
  amount: z.string().optional(),
  discount: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  description: z.string().optional(),
  // status: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewInvoiceSheet = () => {
  const { isOpen, onClose } = useNewInvoice();

  const mutation = useCreateInvoiceMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Invoice created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Invoice</SheetTitle>
          <SheetDescription>
            Create a invoice.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <InvoiceForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              invoiceNo: "",
              amount: "",
              discount: "",
              issueDate: "",
              dueDate: "",
              description: "",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
