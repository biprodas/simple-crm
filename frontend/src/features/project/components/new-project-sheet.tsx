import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewProject } from "../hooks/use-new-project";
import { useCreateProjectMutation } from "../apis/queries";
import { ProjectForm } from "./project-form";
import toast from "react-hot-toast";

enum ProjectType {
  Fixed = "Fixed",
  Hourly = "Hourly",
}

enum PriorityEnum {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

enum ProjectStatus {
  Open = "Open",
  InProgress = "In Progress",
  InReview = "In Review",
  AtRisk = "At Risk",
  NeedsRevisions = "Needs Revisions",
  Done = "Done",
  Canceled = "Canceled",
  Complete = "Complete",
}


export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  startDate: z.date().optional(),
  dueDate: z.date().optional(),
  priority: z.nativeEnum(PriorityEnum).optional(),
  timeEstimated: z.coerce.number().optional(),
  timeTracked: z.coerce.number().optional(),
  projectType: z.nativeEnum(ProjectType).optional(),
  projectValue: z.coerce.number().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewProjectSheet = () => {
  const { isOpen, onClose } = useNewProject();

  const mutation = useCreateProjectMutation();

  const onSubmit = (values: FormValues) => {
    // return console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Project created successfully");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[92%] sm:w-[540px] lg:w-[650] xl:w-[720px]">
        <SheetHeader className="">
          <SheetTitle className="text-xl">New Project</SheetTitle>
          <SheetDescription>
            Create a project.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 ">
          <ProjectForm
            onSubmit={onSubmit}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              description: "",
              startDate: undefined,
              dueDate: undefined,
              priority: undefined,
              timeEstimated: undefined,
              timeTracked: undefined,
              projectType: undefined,
              projectValue: undefined,
              status: undefined,
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
