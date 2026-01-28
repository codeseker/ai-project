import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/auth/useLogin";

function Login() {
  const { handleLogin, loading } = useLogin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Signing you in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
