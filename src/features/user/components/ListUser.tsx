import React, { useEffect, useState } from "react";
import { Usuario } from "../../../models/Usuario.model";
import { list } from "../services/UserService";
import { ItemUser } from "./ItemUser";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";

export function ListUser(): JSX.Element{

    const [usuarioList, setUsuarioList] = useState<Usuario[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        list()
        .then((value:Usuario[]) => setUsuarioList([...value]))
        .catch((error) => {
            setError(true);
            console.error(error);
        })
        .finally(()=> setLoading(false));
    }, []);

    const goToEdit = (userId:number) => {
        navigate({
            pathname: `../edit/${userId}`
        });
    }

    return <React.Fragment>
        {usuarioList &&  
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellido Paterno</TableCell>
                  <TableCell align="right">Apellido Materno</TableCell>
                  <TableCell align="right">Inicio de sesion</TableCell>
                  <TableCell align="right">Cierre de sesion</TableCell>
                  <TableCell align="right">---</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarioList.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="right">{row.apellidoPaterno}</TableCell>
                    <TableCell align="right">{row.apellidoMaterno}</TableCell>
                    <TableCell align="right">{row.fechaInicioSesion && row.fechaInicioSesion.toString()}</TableCell>
                    <TableCell align="right">{row.fechaCierreSesion && row.fechaCierreSesion.toString()}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" onClick={() => goToEdit(row.id)}>
                            Modificar
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        // usuarioList.map((usuario) => <ItemUser usuario={usuario} key={usuario.id}/>)
        }
        {error && <span>Ocurrio un error</span>}
        {loading && <Loader/>}

    </React.Fragment>
}