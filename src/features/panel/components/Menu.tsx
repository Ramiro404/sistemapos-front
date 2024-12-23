import React from "react";
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export function Menu(): JSX.Element {
    const navigate = useNavigate();
    const goToSection = (name:string) => {
        navigate({
            pathname: "../" + name
        })
    }
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => goToSection("usuario")}>Usuario</Button>
            <Button color="inherit" onClick={() => goToSection("product")}>Producto</Button>
            <Button color="inherit" onClick={() => goToSection("order")}>Pedido</Button>
            <Button color="inherit" onClick={() => goToSection("invoice")}>Facturar</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <nav>
        <ul>
          <li>
            <Link to="">Page 1</Link>
          </li>
          <li>
            <Link to="/usuario">Usuario</Link>
          </li>
          <li>
            <Link to="/product">Producto</Link>
          </li>
          <li>
            <Link to="/order">Pedido</Link>
          </li>
        </ul>
      </nav> */}
    </React.Fragment>
  );
}
