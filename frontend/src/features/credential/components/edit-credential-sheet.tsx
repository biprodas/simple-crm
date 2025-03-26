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
  useGetCredentialQuery,
  useUpdateCredentialMutation,
} from "../apis/queries";
import { useOpenCredential } from "../hooks/use-open-credential";
import { CredentialForm } from "./credential-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditCredentialSheet = () => {
  const { isOpen, onClose, id } = useOpenCredential();

  const credentialQuery = useGetCredentialQuery(id);
  const editMutation = useUpdateCredentialMutation();

  const defaultValues = {
    name: credentialQuery.data?.data.name || "",
  };

  const isLoading = credentialQuery.isLoading;

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
          <SheetTitle>Edit Credential</SheetTitle>

          <SheetDescription>Edit an existing credential.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <CredentialForm
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
