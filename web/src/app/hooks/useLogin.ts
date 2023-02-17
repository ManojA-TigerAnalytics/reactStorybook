import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "services/authentication/authentication.service";

type ILogin = {
  email: string;
  password: string;
};
async function useLogin(login: ILogin) {
  const [isLoading, setIsLoading] = useState(false);
  setIsLoading(true);
  const { status, data } = await AuthenticationService.login(login);
  if (status === 200) {
    setIsLoading(false);
    const navigate = useNavigate();
    navigate("/dashboard");
  } else {
    setIsLoading(false);
  }

  return { data, isLoading };
}

export default useLogin;
