import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Producto } from "../../../models/Producto.model";
import { BaseError } from "../../../models/BaseError";
import { createProduct, editProduct, getProductById } from "../services/ProductService";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { BaseResponse, IBaseResponse } from "../../../models/BaseResponse.model";
import { BaseSuccess } from "../../../models/BaseSuccess.model";

export function EditProductForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Producto>();
  const navigate = useNavigate();

  const UNIT_OF_MEASUREMENT = [
    "Centrimetro", "Metro", "Metro Cuadrado", "Metro Cubico", "Litro", "Mililitro"
  ]


  const { id } = useParams();
  const [error, setError] = useState<BaseError>();
  const [product, setProduct] = useState<Producto>();

  const onSubmit = (data: Producto) => {
    createProduct(data)
        .then(() => {
            showConfirmedDialog();
        })
        .catch((e: BaseError) => {
            setError({...e});
        });
  };

  const showConfirmedDialog = () => {
    Swal.fire({
        title: "El producto se creo correctamente",
        showConfirmButton: true
    }).then(()=> {
        navigate({
            pathname: "../../product"
        })
    });
  };

  const showErrorDialog = () => {
    Swal.fire({
        title: error?.message,
        showConfirmButton: true
    }).then(()=> {
    });
  };

  useEffect(() => {
    const idNumber = parseInt(id + "");
    getProductById(idNumber)
        .then(({ data }) => {
            setProduct(data);
            setValue('nombre', data.nombre);
            setValue('medida', data.medida);
            setValue('peso', data.peso);
            setValue('stock', data.stock);
            setValue('unidadMedida', data.unidadMedida);
            setValue('valorUnitario', data.valorUnitario);
            setValue('volumenEmpaque', data.volumenEmpaque);

        })
        .catch((e:IBaseResponse) => {
            setError(e);
        })
  }, [id, setValue]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Nombre</label>
        <input type="text" {...register("nombre", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <label>Valor unitario</label>
        <input type="number" {...register("valorUnitario", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <label>Medida</label>
        <input type="number" {...register("medida", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <select {...register("unidadMedida", { required: true })}>
            {UNIT_OF_MEASUREMENT.map((unit:string) => {
                return <option key={unit} value={unit}>{unit}</option>
            })}
        </select>

        <label>Peso (kg)</label>
        <input type="number" {...register("peso", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <label>Volumen</label>
        <input type="number" {...register("peso", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <label>Stock</label>
        <input type="number" {...register("stock", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <button type="submit">Guardar producto</button>
      </form>

      {error && <span>Ocurrio un error</span>}
    </React.Fragment>
  );
}
