

import { redirect } from "next/navigation";
import { LeadScreen } from "~/features/lead/ui/lead-screen";
import { currentUser } from "~/lib/auth";

const LeadPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Lead Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <LeadScreen />
  );
};

export default LeadPage;
