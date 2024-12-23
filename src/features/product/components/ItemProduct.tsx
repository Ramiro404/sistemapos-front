import React from "react";
import { Producto } from "../../../models/Producto.model";
import { Link } from "react-router-dom";
export type ActionButton = 'none' | 'edit' | 'delete';
interface ItemProductProps{
    product: Producto,
    action?:ActionButton,
    actionFn?: Function
}

export function ItemProduct({ product, action = "none", actionFn = ()=>{} }: ItemProductProps): JSX.Element{
    return <React.Fragment>
        {product.nombre} {product.medida}
        {product.peso} {product.stock}
        {product.unidadMedida} {product.valorUnitario}
        {product.volumenEmpaque}

        {action === 'edit' && 
            <Link to={"/edit/" + product.id}>Editar</Link>}

        {action === 'delete' &&
            <button onClick={() => actionFn(product.id)}>Eliminar</button>}
    </React.Fragment>
}