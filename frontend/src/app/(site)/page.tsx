import { redirect } from "next/navigation";
import { currentUser } from "~/lib/auth";

export default function Home() {
  const user = currentUser();
  if (!user) {
    console.log("Not authenticated");
    return redirect("/login");
  }

  return redirect("/dashboard");

  return (
    <main className="p-3">
      <div>Home Page</div>
    </main>
  );
}
