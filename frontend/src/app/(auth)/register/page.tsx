import { RegisterForm } from "~/components/auth/register-form";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-3">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
