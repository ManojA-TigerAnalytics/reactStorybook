import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Logo from "assets/login/Vit_white.png";

function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "left",
              }}
            >
              <div>
                <img src={Logo} width={75} height={30} alt="Logo" />
              </div>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption">
                Copyright ©2022. Tiger Analytics Limited
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
