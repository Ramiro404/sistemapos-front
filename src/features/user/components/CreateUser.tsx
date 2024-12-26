import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Usuario } from "../../../models/Usuario.model";
import { create } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { BaseError } from "../../../models/BaseError";
import { Button, Grid2, Stack, TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../../utils/Color";

export function CreateUser(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usuario>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onSubmit: SubmitHandler<Usuario> = async (data: Usuario) => {
    try {
      await create(data);
      navigate({
        pathname: "/usuario",
      });
    } catch (e) {
      const baseError = e as BaseError;
      console.error(baseError);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <h1>Crear un nuevo usuario</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} spacing={3}>
            <TextField
              margin="normal"
              color="primary"
              error={!!errors.nombre}
              label="Nombre"
              variant="standard"
              helperText="Este campo es requerido"
              {...register("nombre", { required: true })}
            />

            <TextField
              margin="normal"
              error={!!errors.apellidoPaterno}
              label="Apellido Paterno"
              variant="standard"
              helperText="Este campo es requerido"
              {...register("apellidoPaterno", { required: true })}
            />

            <TextField
              margin="normal"
              error={!!errors.apellidoMaterno}
              label="Apellido Materno"
              variant="standard"
              helperText="Este campo es requerido"
              {...register("apellidoMaterno", { required: true })}
            />
          </Stack>

          <Stack direction={"row"} spacing={3}>
            <TextField
              margin="normal"
              error={!!errors.user}
              label="Usuario"
              variant="standard"
              helperText="Este campo es requerido"
              {...register("user", { required: true })}
            />
            <TextField
              margin="normal"
              error={!!errors.password}
              label="Password"
              variant="standard"
              helperText="Este campo es requerido"
              {...register("password", { required: true })}
            />
          </Stack>

          <Stack direction={"row"} spacing={3}>
            <TextField
              margin="normal"
              error={!!errors.horaEntrada}
              label="Hora Entrada"
              variant="standard"
              type="time"
              helperText="Este campo es requerido"
              {...register("horaEntrada", { required: true })}
            />

            <TextField
              margin="normal"
              error={!!errors.horaSalida}
              label="Hora Salida"
              variant="standard"
              type="time"
              helperText="Este campo es requerido"
              {...register("horaSalida", { required: true })}
            />
          </Stack>

          <Button type="submit" variant="contained" size="large">
            Guardar
          </Button>
        </form>
      </ThemeProvider>

      {error && <span>Ocurrio un error intentalo mas tarde</span>}
    </React.Fragment>
  );
}
