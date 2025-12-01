import { login } from "@/actions/user";
import { LoginForm, type LoginSchema } from "@/components/login-form";
import { setUser } from "@/store/slices/user";
import { successToast } from "@/utils/toaster";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginSchema) => {
    setLoading(true);
    const result = await login(data);
    setLoading(false);

    if (!result) return;

    const finalUser = result.data;

    dispatch(setUser(finalUser));
    successToast("Login successful");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6">
          <h1>Loading...</h1>
        </div>
      </div>
    )
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
