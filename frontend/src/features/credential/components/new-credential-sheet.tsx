import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewCredential } from "../hooks/use-new-credential";
import { useCreateCredentialMutation } from "../apis/queries";
import { CredentialForm } from "./credential-form";
import toast from "react-hot-toast";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  loginUrl: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  secret: z.string().optional(),
  isEnabled2FA: z.boolean().optional(),
  owner2FA: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewCredentialSheet = () => {
  const { isOpen, onClose } = useNewCredential();

  const mutation = useCreateCredentialMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Credential created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Credential</SheetTitle>
          <SheetDescription>Create a credential.</SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <CredentialForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              loginUrl: "",
              username: "",
              email: "",
              password: "",
              secret: "",
              isEnabled2FA: false,
              owner2FA: "",
              notes: "",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
