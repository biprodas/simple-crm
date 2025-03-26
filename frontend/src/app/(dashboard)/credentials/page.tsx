

import { redirect } from "next/navigation";
import { CredentialScreen } from "~/features/credential/ui/credential-screen";
import { currentUser } from "~/lib/auth";

const CredentialsPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Lead Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <CredentialScreen />
  );
};

export default CredentialsPage;
