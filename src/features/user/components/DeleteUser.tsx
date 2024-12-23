import React, { useEffect, useState } from "react";
import { Usuario } from "../../../models/Usuario.model";
import { deleteUser, list } from "../services/UserService";
import { BaseError } from "../../../models/BaseError";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

export function DeleteUser(): JSX.Element {
  const [usuarioLista, setUsuarioLista] = useState<Usuario[]>([]);
  const [error, setError] = useState<BaseError>();
  const navigate = useNavigate();
  useEffect(() => {
    list()
      .then((value: Usuario[]) => {
        setUsuarioLista([...value]);
      })
      .catch((e: BaseError) => {
        setError({ ...e });
      });
  }, []);

  const onDelete = (id: number) => {
    const usuarioSelected = usuarioLista.find((u) => u.id === id);
    if (usuarioSelected) {
      const { id, nombre, apellidoPaterno, apellidoMaterno } = usuarioSelected;
      Swal.fire({
        title: `Eliminar a ${nombre} ${apellidoPaterno} ${apellidoMaterno} ?`,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          confirmDelete(id);
        }
      });
    }
  };

  const confirmDelete = (id: number) => {
    deleteUser(id)
      .then(() => {
        Swal.fire("Eliminado!", "", "success");
        navigate({
          pathname: "/usuario/list",
        });
      })
      .catch((e: BaseError) => {
        setError({ ...e });
        Swal.fire("Ocurrio u error", error?.message, "info");
      });
  };

  return (
    <React.Fragment>
      {usuarioLista && 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellido Materno</TableCell>
                  <TableCell align="right">Apellido Paterno</TableCell>
                  <TableCell align="right">---</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarioLista.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="right">{row.nombre}</TableCell>
                    <TableCell align="right">{row.apellidoPaterno}</TableCell>
                    <TableCell align="right">{row.apellidoMaterno}</TableCell>
                    <TableCell align="right">
                        <Button size="large" onClick={() => onDelete(row.id)}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      {error && <span>{error.message}</span>}
    </React.Fragment>
  );
}
