

import { redirect } from "next/navigation";
import { ProjectScreen } from "~/features/project/ui/project-screen";
import { currentUser } from "~/lib/auth";

const ProjectsPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Project Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <ProjectScreen />
  );
};

export default ProjectsPage;
