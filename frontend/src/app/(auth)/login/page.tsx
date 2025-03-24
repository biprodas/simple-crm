import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { LoginForm } from "~/components/auth/login-form";

interface LoginPageProps {
  params: {};
  searchParams: {
    to?: string;
    error?: string;
  };
}

const LoginPage = async () => {
  const session = await authSession();

  if (session?.user) {
    console.log("LoginPage: Already authenticated");
    return redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
