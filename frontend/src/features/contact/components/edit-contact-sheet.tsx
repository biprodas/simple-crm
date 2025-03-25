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
  useGetContactQuery,
  useUpdateContactMutation,
} from "../apis/queries";
import { useOpenContact } from "../hooks/use-open-contact";
import { ContactForm } from "./contact-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const EditContactSheet = () => {
  const { isOpen, onClose, id } = useOpenContact();

  const contactQuery = useGetContactQuery(id);
  const editMutation = useUpdateContactMutation();

  const defaultValues = {
    name: contactQuery.data?.data.name || "",
  };

  const isLoading = contactQuery.isLoading;

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
          <SheetTitle>Edit Contact</SheetTitle>

          <SheetDescription>Edit an existing contact.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ContactForm
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
