import { Checkbox, TextField } from "@mui/material";
// import EmailIcon from '@mui/icons-material/Email'
import { useForm } from "react-hook-form";
import Logo from "assets/login/Login_Banner.png";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.scss";
import * as yup from "yup";
// import IconTextField from '../../components/IconTextField'
type UserSubmitForm = {
  email: string;
  password: string;
};
const defaultValues = {
  email: "",
  password: "",
};

function Login() {
  const test = () => {
    console.log("test");
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
  } = useForm<UserSubmitForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const loginUser = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };
  console.log(errors);
  const rememberMe = () => {
    console.log("clicked remember me");
  };

  return (
    <section id="login">
      <form onSubmit={handleSubmit(loginUser)}>
        <div className="divheight">
          <div className="leftside">
            <h1 className="title">Welcome!</h1>
            <div className="form_cont" style={{ marginTop: "59px" }}>
              {/* <EmailIcon className="emailicon" /> */}
              {/* <input
                                {...register('email')}
                                id="email"
                                type="text"
                                className="form_input inputemail"
                                placeholder="Email"
                            /> */}

              <TextField
                {...register("email")}
                id="email"
                className="form_input inputemail"
                label="Email"
                variant="outlined"
                size="small"
                required
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
              {/* <IconTextField
                                id="email"
                                className="form_input inputemail"
                                label="Email"
                                variant="outlined"
                                size="small"
                                required
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                iconStart={<EmailIcon className="emailicon" />}
                            /> */}
            </div>

            <div className="form_cont">
              {/* <input
                                {...register('password')}
                                type="password"
                                name="password"
                                id="password"
                                className="form_input inputemail password_field"
                                placeholder="Password"
                            /> */}
              <TextField
                {...register("password")}
                id="password"
                className="form_input inputemail password_field"
                label="Password"
                variant="outlined"
                size="small"
                required
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              {/* <div className="text-left">Password Error</div> */}
            </div>

            <div className="form_cont remember_box">
              <div className="rember">
                <Checkbox className="example-margin" onChange={rememberMe} />
              </div>
              {/* <p
                                className="usererrmsg text-center mt-3 p-0"
                                aria-disabled
                            >
                                Login Error
                            </p> */}
            </div>

            <div className="">
              <button color="warn" className="signinbtn" type="submit">
                Sign In
              </button>
            </div>
            <button onClick={test} type="submit" className="forgot cursorhand">
              Forgot Password?
            </button>
          </div>
          <div className="leftright">
            <div className="imgdiv">
              <img src={Logo} alt="Logo" height="300px" className="VITlogo" />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
