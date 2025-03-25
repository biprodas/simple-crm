import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useCreateContactMutation } from "../apis/queries";
import { ContactForm } from "./contact-form";
import toast from "react-hot-toast";
import { useCreateContact } from "../hooks/use-create-contact";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const CreateContactSheet = () => {
  const { isOpen, onClose } = useCreateContact();

  const mutation = useCreateContactMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Contact created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Contact</SheetTitle>
          <SheetDescription>Create a contact.</SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <ContactForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              email: "",
              phone: "",
              jobTitle: "",
              companyName: "",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
