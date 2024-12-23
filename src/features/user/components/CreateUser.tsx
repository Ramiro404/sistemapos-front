import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Usuario } from "../../../models/Usuario.model";
import { create } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { BaseError } from "../../../models/BaseError";
import { Button, TextField } from "@mui/material";

export function CreateUser(): JSX.Element{
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Usuario>();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const onSubmit: SubmitHandler<Usuario> = async(data:Usuario) => {
        try{
            await create(data);
            navigate({
                pathname: '/usuario'
            });
        }catch(e){
            const baseError = e as BaseError;
            console.error(baseError);
            setError(true);
        }
    };

    return <React.Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField 
                error={!!errors.nombre} 
                label="Nombre" 
                variant="standard" 
                
                helperText="Este campo es requerido"
                {...register("nombre", { required: true})} />

            <br/>
            <TextField 
                error={!!errors.apellidoPaterno} 
                label="Apellido Paterno" 
                variant="standard" 
                helperText="Este campo es requerido"
                {...register("apellidoPaterno", { required: true})} />

            <br/>
            <TextField 
                error={!!errors.apellidoMaterno} 
                label="Apellido Materno" 
                variant="standard" 
                helperText="Este campo es requerido"
                {...register("apellidoMaterno", { required: true})} />

            <br/>
            <TextField label="Nombre" variant="standard" />
            <TextField 
                error={!!errors.user} 
                label="Usuario" 
                variant="standard" 
                helperText="Este campo es requerido"
                {...register("user", { required: true})} />
            {/* <label>Usuario</label> */}
            {/* <input type="text" {...register("user", { required: true})}/> */}
            {/* {errors.user && <span>Este campo es requerido</span>} */}
            <br/>
            <TextField 
                error={!!errors.password} 
                label="Password" 
                variant="standard" 
                helperText="Este campo es requerido"
                {...register("password", { required: true})} />

            <br/>

            <TextField 
                error={!!errors.horaEntrada} 
                label="Hora Entrada" 
                variant="standard" 
                type="time"
                helperText="Este campo es requerido"
                {...register("horaEntrada", { required: true})} />

            <br/>

            <TextField 
                error={!!errors.horaSalida} 
                label="Hora Salida" 
                variant="standard" 
                helperText="Este campo es requerido"
                {...register("horaSalida", { required: true})} />
            <br/>

            <Button type="submit" variant="contained" size="large">
                Guardar
            </Button>

        </form>

        {error &&  <span>Ocurrio un error intentalo mas tarde</span>}
    </React.Fragment>
}