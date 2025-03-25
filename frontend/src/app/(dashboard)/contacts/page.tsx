

import { redirect } from "next/navigation";
import { ContactScreen } from "~/features/contact/ui/contact-screen";
import { currentUser } from "~/lib/auth";

const ContactsPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Contacts Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <ContactScreen />
  );
};

export default ContactsPage;
