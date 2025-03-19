import { redirect } from "next/navigation";
import { currentUser } from "~/lib/auth";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    console.log("Not authenticated");
    return redirect("/login");
  }
  
  redirect("/dashboard");
  return null;
}
