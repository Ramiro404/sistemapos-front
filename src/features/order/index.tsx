import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function OrderIndex(): JSX.Element{
    const navigate = useNavigate();

    const goToSecction = (name:string) => navigate({
        pathname: name
    });

    return <React.Fragment>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => goToSecction("add")}>
              <ListItemText primary="Iniciar pedido" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => goToSecction("../panel")}>
              <ListItemText primary="Regresar a inicio" />
            </ListItemButton>
          </ListItem>
          </List>
        {/* <nav>
            <ul>
                <li>
                    <Link to={"add"}>Iniciar pedido</Link>
                </li>
            </ul>
        </nav> */}

        <Outlet/>
    </React.Fragment>
}