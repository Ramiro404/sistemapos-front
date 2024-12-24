import {
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function InvoiceIndex() {
  const navigate = useNavigate();

  const goToSection = (name: string) =>
    navigate({
      pathname: name,
    });

  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        <Grid2 size={2}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToSection("")}>
                <ListItemText primary="Facturar un pedido" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={() => goToSection("print")}>
                <ListItemText primary="Imprimir factura" />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemButton onClick={() => goToSection("../panel")}>
                <ListItemText primary="Regesar a panel" />
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
