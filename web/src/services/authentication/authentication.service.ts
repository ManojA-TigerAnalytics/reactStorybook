import client from "../../axios";

type ICredentials = {
  email: string;
  password: string;
};
const AuthenticationService = {
  async login(credentials: ICredentials) {
    return client.post("/login", credentials);
  },
};

export default AuthenticationService;
