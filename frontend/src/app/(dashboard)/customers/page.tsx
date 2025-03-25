import { redirect } from "next/navigation";
import { CustomerScreen } from "~/features/customer/ui/customer-screen";
import { currentUser } from "~/lib/auth";

const CustomersPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    console.log("Customers Page: Not authenticated");
    return redirect("/login");
  }

  return (
    <CustomerScreen />
  );
};

export default CustomersPage;
