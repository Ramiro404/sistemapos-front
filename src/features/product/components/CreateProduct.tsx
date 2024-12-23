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
  TextField,
} from "@mui/material";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
        sx={{width: 200}}
          error={!!errors.nombre}
          type="text"
          label="Nombre"
          variant="standard"
          {...register("nombre", { required: true })}
        />

        <TextField
        sx={{width: 200}}
          error={!!errors.valorUnitario}
          type="number"
          label="Valor Unitario"
          variant="standard"
          {...register("valorUnitario", { required: true })}
        />
        <br /><br/>
        <FormControl sx={{width: 200}}>
          <InputLabel>Unidad de medida</InputLabel>
          <Select variant="standard" {...register("unidadMedida", { required: true })}>
            {UNIT_OF_MEASUREMENT.map((unit) => (
              <MenuItem value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
        sx={{width: 200}}
          error={!!errors.medida}
          type="text"
          label="Medida"
          variant="standard"
          {...register("medida", { required: true })}
        />
        <br />
        <TextField
        sx={{width: 200}}
          error={!!errors.peso}
          type="number"
          label="Peso (kg)"
          variant="standard"
          {...register("peso", { required: true })}
        />

        <TextField
          sx={{width: 200}}
          error={!!errors.volumenEmpaque}
          type="text"
          label="Volumen"
          variant="standard"
          {...register("volumenEmpaque", { required: true })}
        />
        <br />
        <TextField
        sx={{width: 200}}
          error={!!errors.stock}
          type="number"
          label="Stock"
          variant="standard"
          {...register("stock", { required: true })}
        />
        <br />

        <Button type="submit" size="large" variant="contained">
          Guardar
        </Button>
      </form>
    </React.Fragment>
  );
}
