import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Producto } from "../../../models/Producto.model";
import { BaseError } from "../../../models/BaseError";
import { createProduct } from "../services/ProductService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { theme } from "../../../utils/Color";

export function CreateProduct(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Producto>();
  const navigate = useNavigate();

  const UNIT_OF_MEASUREMENT = [
    "Centrimetro",
    "Metro",
    "Metro Cuadrado",
    "Metro Cubico",
    "Litro",
    "Mililitro",
  ];

  const [error, setError] = useState<BaseError>();
  const onSubmit = (data: Producto) => {
    createProduct(data)
      .then(() => {
        showConfirmedDialog();
      })
      .catch((e: BaseError) => {
        setError({ ...e });
      });
  };

  const showConfirmedDialog = () => {
    Swal.fire({
      title: "El producto se creo correctamente",
      showConfirmButton: true,
    }).then(() => {
      navigate({
        pathname: "../../product",
      });
    });
  };

  const showErrorDialog = () => {
    Swal.fire({
      title: error?.message,
      showConfirmButton: true,
    }).then(() => {});
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <h1>Agregar un nuevo producto</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} spacing={3}>
            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.nombre}
              type="text"
              label="Nombre"
              variant="standard"
              {...register("nombre", { required: true })}
            />

            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.valorUnitario}
              type="number"
              label="Valor Unitario"
              variant="standard"
              {...register("valorUnitario", { required: true })}
            />
          </Stack>
          <br/>
          <Stack direction={"row"} spacing={3}>
            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.medida}
              type="text"
              label="Medida"
              variant="standard"
              {...register("medida", { required: true })}
            />
            <FormControl sx={{ width: 200 }}>
              <InputLabel>Unidad de medida</InputLabel>
              <Select
                variant="standard"
                margin="dense"
                {...register("unidadMedida", { required: true })}
              >
                {UNIT_OF_MEASUREMENT.map((unit) => (
                  <MenuItem value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.peso}
              type="number"
              label="Peso (kg)"
              variant="standard"
              {...register("peso", { required: true })}
            />
          </Stack>
                <br/>
          <Stack direction={"row"} spacing={3}>
            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.stock}
              type="number"
              label="Stock"
              variant="standard"
              {...register("stock", { required: true })}
            />

            <TextField
              sx={{ width: 200 }}
              margin="dense"
              error={!!errors.volumenEmpaque}
              type="text"
              label="Volumen"
              variant="standard"
              {...register("volumenEmpaque", { required: true })}
            />
          </Stack>

          <br />

          <Button type="submit" size="large" variant="contained">
            Guardar
          </Button>
        </form>
      </ThemeProvider>
    </React.Fragment>
  );
}
