import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Logo from "assets/login/Login_Banner.png";
import { yupResolver } from "@hookform/resolvers/yup";
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
    <Grid container>
      <Grid item className="bg-cover bg-center">
        <img src={Logo} alt="Logo" />
      </Grid>
      <Grid
        item
        className="flex flex-col items-center justify-center p-3 sm:p-5"
      >
        <form
          onSubmit={handleSubmit(loginUser)}
          className="mt-5 w-full max-w-500"
        >
          <TextField
            {...register("email")}
            id="email"
            label="Email"
            variant="standard"
            size="small"
            required
            error={!!errors?.email}
            helperText={errors?.email?.message}
            className="mb-3"
          />
          <TextField
            {...register("password")}
            id="password"
            label="Password"
            variant="standard"
            size="small"
            required
            error={!!errors?.password}
            helperText={errors?.password?.message}
            className="mb-3"
          />
          <Button type="submit" variant="contained" className="w-full">
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
