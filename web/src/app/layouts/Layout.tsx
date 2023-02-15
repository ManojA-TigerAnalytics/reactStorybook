import { ThemeProvider } from "@emotion/react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Footer from "app/components/common/footer/Footer";
import Header from "app/components/common/header/Header";
import { useAppSelector } from "app/hooks/store-hooks";
import useGetTheme from "app/hooks/useGetTheme";
import { Outlet } from "react-router-dom";

function Layout() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useGetTheme(mode);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Outlet />

        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Layout;
