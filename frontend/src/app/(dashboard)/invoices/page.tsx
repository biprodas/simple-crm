import { redirect } from "next/navigation";
import { InvoiceScreen } from "~/features/invoice/ui/invoice-screen";
import { currentUser } from "~/lib/auth";

const InvoicesPage = async () => {
  const user = await currentUser();

  if (!user) {
    console.log("Invoices Page: Not authenticated");
    return redirect("/login");
  }

  return <InvoiceScreen />;
};

export default InvoicesPage;
