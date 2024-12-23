import React from "react";
import { Usuario } from "../../../models/Usuario.model";
import { Link } from "react-router-dom";

interface ItemUserProps {
    usuario: Usuario
}

export function ItemUser({ usuario }: ItemUserProps): JSX.Element{
    return <React.Fragment>
        {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}
        {usuario.fechaInicioSesion && usuario.fechaInicioSesion.toString()} 
        {usuario.fechaCierreSesion && usuario.fechaCierreSesion.toString()}
        <Link to={"../edit/" + usuario.id}>Modificar</Link>
    </React.Fragment>
}