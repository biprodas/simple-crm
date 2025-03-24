import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewLead } from "../hooks/use-new-lead";
import { useCreateLeadMutation } from "../apis/queries";
import { LeadForm } from "./lead-form";
import toast from "react-hot-toast";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  contactName: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewLeadSheet = () => {
  const { isOpen, onClose } = useNewLead();

  const mutation = useCreateLeadMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Lead created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Lead</SheetTitle>
          <SheetDescription>
            Create a lead tour next destination.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <LeadForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              description: "",
              contactName: "",
              jobTitle: "",
              email: "",
              phone: "",
              source: "",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
