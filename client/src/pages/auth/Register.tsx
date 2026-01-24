import { SignupForm, type RegisterSchema } from "@/components/signup-form";

function Register() {
  const handleRegister = async (data: RegisterSchema) => {
    console.log("Data: ", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <SignupForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}

export default Register;
