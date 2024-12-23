import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#001220",
            contrastText: "white"
        },
        secondary: {
            main: "#fbae3c",
            contrastText: "#000c16"
        }
    }
});
