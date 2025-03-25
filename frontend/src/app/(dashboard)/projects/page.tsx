

import { redirect } from "next/navigation";
import { currentUser } from "~/lib/auth";

const ProjectsPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Project Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <div>Project screen</div>
  );
};

export default ProjectsPage;
