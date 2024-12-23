import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Grid2 } from "@mui/material";

export function ProductPage(): JSX.Element {
  const navigate = useNavigate();

  const goToPage = (name: string) =>
    navigate({
      pathname: name,
    });

  return (
    <React.Fragment>
      <Grid2 container>
        <Grid2 size={2}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToPage("add")}>
                <ListItemText primary="Agregar producto" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToPage("list")}>
                <ListItemText primary="Listar productos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToPage("delete")}>
                <ListItemText primary="Eliminar productos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToPage("../panel")}>
                <ListItemText primary="Regresar al menu" />
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
