import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#f7901d",
    },
  },
  shape: {
    borderRadius: 25,
  },
});

export default darkTheme;
