import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Grid2 } from "@mui/material";

export function UserPage(): JSX.Element {
  const navigation = useNavigate();
  const goToSection = (name: string) => {
    navigation({
      pathname: name,
    });
  };
  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        <Grid2 size={2}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToSection("add")}>
                <ListItemText primary="Crear nuevo usuario" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToSection("list")}>
                <ListItemText primary="Modificar usuario" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goToSection("delete")}>
                <ListItemText primary="Eliminar usuario" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goToSection("../panel")}>
                <ListItemText primary="Regresar a inicio" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid2>
        <Grid2 size={10}>
          <Outlet />
        </Grid2>
      </Grid2>
    </React.Fragment>
  );
}
