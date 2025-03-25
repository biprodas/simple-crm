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
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../apis/queries";
import { useOpenProject } from "../hooks/use-open-project";
import { ProjectForm } from "./project-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditProjectSheet = () => {
  const { isOpen, onClose, id } = useOpenProject();

  const projectQuery = useGetProjectQuery(id);
  const editMutation = useUpdateProjectMutation();

  const defaultValues = {
    name: projectQuery.data?.data.name || "",
    acronym: projectQuery.data?.data.acronym || "",
  };

  const isLoading = projectQuery.isLoading;

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
          <SheetTitle>Edit Project</SheetTitle>

          <SheetDescription>Edit an existing project.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ProjectForm
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
