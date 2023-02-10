import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Logo from "assets/login/Login_Banner.png";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.scss";
import * as yup from "yup";

type UserSubmitForm = {
  email: string;
  password: string;
};
const defaultValues = {
  email: "",
  password: "",
};
function Login() {
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(9, "Password must be at least 9 characters")
      .max(20, "Password must not exceed 20 characters"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const loginUser = (data: UserSubmitForm) => {
    // TODO api call
    console.debug(JSON.stringify(data, null, 2)); // eslint-disable-line no-console
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="right-side">
        <div className="form-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(loginUser)} className="form">
          <TextField
            {...register("email")}
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            required
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register("password")}
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            required
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
