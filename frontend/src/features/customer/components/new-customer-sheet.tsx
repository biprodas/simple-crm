import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewCustomer } from "../hooks/use-new-customer";
import { useCreateCustomerMutation } from "../apis/queries";
import { CustomerForm } from "./customer-form";
import toast from "react-hot-toast";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  type: z.enum(["Personal", "Company"]).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  billRate: z.string().optional(),
  tier: z.enum(["Bronze", "Silver", "Gold"]).optional(),
  leadId: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewCustomerSheet = () => {
  const { isOpen, onClose } = useNewCustomer();

  const mutation = useCreateCustomerMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Customer created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Customer</SheetTitle>
          <SheetDescription>Create a customer or account</SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <CustomerForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              type: undefined,
              email: "",
              phone: "",
              address: "",
              billRate: "",
              tier: undefined,
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
