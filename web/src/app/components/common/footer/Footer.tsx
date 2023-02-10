import { Box, Container, Paper, Toolbar, Typography } from "@mui/material";
import Logo from "assets/login/Vit_white.png";

function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
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
    </Paper>
  );
}

export default Footer;
