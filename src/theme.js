import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      main: "#4361ee",
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
