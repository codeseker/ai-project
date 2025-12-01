import { login } from "@/actions/user";
import { LoginForm, type LoginSchema } from "@/components/login-form";
import { setUser } from "@/store/slices/user";

import { useDispatch } from "react-redux";

function Login() {

  const dispatch = useDispatch();



  const handleLogin = async (data: LoginSchema) => {
    const result = await login(data);

    if (!result) return;

    const finalUser = result.data;



    console.log('HEY: ', finalUser);

    dispatch(setUser(finalUser));
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
