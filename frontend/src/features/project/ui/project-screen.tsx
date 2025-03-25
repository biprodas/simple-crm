"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { ProjectClient } from "./client";
import { useNewProject } from "../hooks/use-new-project";

export const ProjectScreen = () => {
  const newProject = useNewProject();

  return (
    <div className="p-3">
      <Heading
        title="Projects"
        description="List of projects"
        extra={
          <Button onClick={newProject.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <ProjectClient />
    </div>
  );
};
