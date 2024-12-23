
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function InvoiceIndex(){
    const navigate = useNavigate();

    const goToSection = (name:string) => navigate({
        pathname: name
    });

    return <React.Fragment>
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => goToSection("")}>
                    <ListItemText primary="Facturar un pedido"/>
                </ListItemButton>
                <ListItemButton onClick={() => goToSection("print")}>
                    <ListItemText primary="Imprimir factura"/>
                </ListItemButton>
            </ListItem>
        </List>
        <Outlet/>
    </React.Fragment>
}
