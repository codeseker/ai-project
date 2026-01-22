import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/auth/useLogin";

function Login() {
  const {handleLogin, loading} = useLogin();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
