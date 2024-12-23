import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Usuario } from "../../../models/Usuario.model";
import { useNavigate, useParams } from "react-router-dom";
import { edit, getOne } from "../services/UserService";

export function EditUser(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Usuario>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const idNumber = parseInt(id ?? "0");

  useEffect(()=> {
    getOne(idNumber)
        .then((value:Usuario) => {
            console.log(value);
            setValue('nombre', value.nombre);
            setValue('apellidoPaterno', value.apellidoPaterno);
            setValue('apellidoMaterno', value.apellidoMaterno);
            setValue('horaEntrada', value.horaEntrada);
            setValue('horaSalida', value.horaSalida);
        })
        .catch((e) => {
            setError(true);
            console.error(e);
        });
  }, []);

  const onSubmit:SubmitHandler<Usuario> = (data:Usuario) => {
    edit(idNumber, data)
        .then(() => navigate({
            pathname: "/usuario"
        }))
        .catch((error) => {
            console.error(error);
            setError(true);
        });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre</label>
        <input type="text"  {...register("nombre", { required: true })} />
        {errors.nombre && <span>Este campo es requerido</span>}
        <br />

        <label>Apellido paterno</label>
        <input
          type="text" 
          {...register("apellidoPaterno", { required: true })}
        />
        {errors.apellidoPaterno && <span>Este campo es requerido</span>}
        <br />

        <label>Apellido materno</label>
        <input
          type="text" 
          {...register("apellidoMaterno", { required: true })}
        />
        {errors.apellidoMaterno && <span>Este campo es requerido</span>}
        <br />

        {/* <label>Usuario</label>
        <input type="text" defaultValue={usuario?.user} {...register("user", { required: true })} />
        {errors.user && <span>Este campo es requerido</span>}
        <br />

        <label>Contrasena</label>
        <input type="text" defaultValue={usuario?.password} {...register("password", { required: true })} />
        {errors.password && <span>Este campo es requerido</span>}
        <br /> */}

        <label>Hora entrada</label>
        <input type="time"  {...register("horaEntrada", { required: true })} />
        {errors.horaEntrada && <span>Este campo es requerido</span>}
        <br />

        <label>Hora salida</label>
        <input type="time"  {...register("horaSalida", { required: true })} />
        {errors.horaSalida && <span>Este campo es requerido</span>}
        <br />

        <input type="submit" />
      </form>

      {error && <span>Ocurrio un error</span>}
    </React.Fragment>
  );
}
