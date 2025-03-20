import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { LoginForm } from "~/components/auth/login-form";

interface LoginPageProps {
  params: {};
  searchParams: {
    to?: string;
    error?: string;
  };
};

const LoginPage = async ({ params, searchParams }: LoginPageProps) => {
  const session = await authSession();
  const { error, to } = searchParams;

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
