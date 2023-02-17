import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Logo from "assets/images/logo.svg";
import LeftLogo from "assets/images/leftlogo.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "services/authentication/authentication.service";
import { useState } from "react";
import { EmailOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { loggedIn } from "app/store/slice/authSlice";

type ILogin = {
  email: string;
  password: string;
};
const defaultValues = {
  email: "",
  password: "",
};
function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (login: ILogin) => {
    setIsLoading(true);
    const { status, data } = await AuthenticationService.login(login);
    if (status === 200) {
      setIsLoading(false);
      dispatch(loggedIn(data));
      navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
  };
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
  } = useForm<ILogin>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const loginUser = (data: ILogin) => {
    login(data);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
      <div className="relative hidden md:flex flex-auto items-center justify-center w-1/2 h-screen p-16 lg:px-28 overflow-hidden dark:border-l bg-primary-500">
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="text-gray-100 opacity-25"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="200" cx="196" cy="23" />
            <circle r="200" cx="790" cy="491" />
          </g>
        </svg>
        <svg
          className="absolute -top-16 -right-16 text-gray-100"
          viewBox="0 0 220 192"
          width="220"
          height="192"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </svg>
        <div className="flex flex-col">
          <div>
            <img src={LeftLogo} alt="side logo" />
          </div>
          <div>
            <Typography className="text-gray-100 text-2xl text-center">
              Price tool
            </Typography>
            <Typography className="text-gray-100 text-sm text-center">
              Create and compare scenarios to get things done
            </Typography>
          </div>
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-4 sm:p-12 md:p-16 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none sm:bg-card">
        <div className="w-full max-w-80 sm:w-80 mx-auto sm:mx-0">
          <div className="w-full flex justify-center">
            <div className="w-30">
              <img src={Logo} alt="Tiger Analytics" />
            </div>
          </div>

          <Typography className="mt-8 text-3xl font-extrabold tracking-tight leading-tight text-center">
            Sign in
          </Typography>

          <form className="mt-8" onSubmit={handleSubmit(loginUser)}>
            <TextField
              {...register("email")}
              id="email"
              label="Email"
              variant="filled"
              size="small"
              required
              error={!!errors?.email}
              helperText={errors?.email?.message}
              className="mb-3 w-full"
            />
            <TextField
              {...register("password")}
              id="password"
              label="Password"
              variant="filled"
              size="small"
              type="password"
              required
              error={!!errors?.password}
              helperText={errors?.password?.message}
              className="mb-3 w-full"
            />

            {/* <div className='inline-flex items-end justify-between w-full mt-1.5'> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* </div> */}
            {/* <Button
              variant='contained'
              color='primary'
              className='rounded-3xl bg-primary-600 px-4 py-2 hover:bg-primary-500 w-full'
              type='submit'
            >
              Sign In
            </Button> */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<EmailOutlined />}
              variant="outlined"
              className="rounded-3xl bg-primary-600 px-4 py-2 hover:bg-primary-500 w-full text-white text-center"
            >
              Sign In
            </LoadingButton>
          </form>

          <div className="flex justify-center items-baseline mt-3 font-medium">
            <Typography>Dont have an account?</Typography>
            {/* <a className='ml-1 text-orange-500 hover:underline'>Sign up</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
