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

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewLeadSheet = () => {
  const { isOpen, onClose } = useNewLead();

  const mutation = useCreateLeadMutation();

  const onSubmit = (values: FormValues) => {
    console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="">
          <SheetTitle>New Lead</SheetTitle>
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
              acronym: "",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
