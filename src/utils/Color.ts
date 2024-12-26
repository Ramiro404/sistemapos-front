import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

const PRIMARY = "#001220";
const SECONDARY = "#fbae3c";

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: SECONDARY,
      contrastText: "white",
    },
    secondary: {
      main: "#fbae3c",
      contrastText: "#000c16",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": SECONDARY,
          "--TextField-brandBorderHoverColor": SECONDARY,
          "--TextField-brandBorderFocusedColor": SECONDARY,
          "& label.Mui-focused": {
            color: SECONDARY,
          },
        },
        input:  {
          color: "white"
        },
        hiddenLabel: {
          color: "white"
        },
        
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: SECONDARY
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottom: "2px solid " + SECONDARY,
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid " + SECONDARY,
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid " + SECONDARY,
          },
        },
      },
    },
  },
});
