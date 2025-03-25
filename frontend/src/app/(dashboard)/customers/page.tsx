import { redirect } from "next/navigation";
import { CustomerScreen } from "~/features/customer/ui/customer-screen";
import { currentUser } from "~/lib/auth";

const CustomerPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Customer Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <CustomerScreen />
  );
};

export default CustomerPage;
