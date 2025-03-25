

import { redirect } from "next/navigation";
import { ContactScreen } from "~/features/contact/ui/contact-screen";
import { currentUser } from "~/lib/auth";

const ContactPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Contact Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <ContactScreen />
  );
};

export default ContactPage;
