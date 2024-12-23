import React, { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { BaseResponse } from "../../../models/BaseResponse.model";
import { Producto } from "../../../models/Producto.model";
import { BaseError } from "../../../models/BaseError";
import { ItemProduct } from "./ItemProduct";

export function ListProduct(): JSX.Element{
    const [productList, setProductList] = useState<Producto[]>([]);
    const [error, setError] = useState<BaseError>();
    useEffect(() => {
        listProduct()
            .then((value:BaseResponse<Producto[]>)=>{
                setProductList([...value.data]);
            })
            .catch((e:BaseError) => {
                setError({...e});
            });
    }, []);
    
    return <React.Fragment>
        {productList.length > 0 && productList.map((product) => {
            return <ItemProduct 
                key={product.id} 
                product={product}
                action="edit"/>
        })}

        {productList.length === 0 && <span>No hay productos</span>}
        {error && <span>{error.message}</span>}
    </React.Fragment>
}