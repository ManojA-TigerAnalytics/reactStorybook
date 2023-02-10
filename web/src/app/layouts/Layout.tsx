import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Footer from "app/components/common/footer/Footer";
import Header from "app/components/common/header/Header";
import { useAppSelector } from "app/store/hooks";
import { Outlet } from "react-router-dom";

function Layout() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: {
      mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
