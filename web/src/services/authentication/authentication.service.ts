import client from "../../axios";

type ICredentials = {
  email: string;
  password: string;
};
const AuthenticationService = {
  login(credentials: ICredentials) {
    return client.post("/login", credentials);
  },
};

export default AuthenticationService;
