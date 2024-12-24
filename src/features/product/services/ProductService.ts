import { BaseError } from "../../../models/BaseError";
import { BaseResponse, IBaseResponse } from "../../../models/BaseResponse.model";
import { BaseSuccess } from "../../../models/BaseSuccess.model";
import { Producto } from "../../../models/Producto.model";
import axios, { AxiosResponse } from "axios";
import { ProductoInventario } from "../../../models/ProductoInventario.model";

const baseUrl = process.env.REACT_APP_BASE_URL + "/Producto";

async function  createProduct(product:Producto):Promise<BaseResponse<void>> {
    return await axios.post(
        baseUrl,
        product
    );
}

async function listProduct(): Promise<BaseResponse<Producto[]>>{
    const { data } = await axios.get<BaseResponse<Producto[]>>(
        baseUrl
    );
    return data;
}

async function editProduct( id:number,product:Producto) {
    return await axios.patch(
        baseUrl + "/" + id,
        product
    );
}

async function getProductById( id:number): Promise<BaseResponse<Producto>> {
    const { data }:AxiosResponse<BaseResponse<Producto>> = await axios.get(
        baseUrl + "/" + id
    );
    return data;
}

async function deleteProduct(id:number): Promise<BaseResponse<void>> {
    const { data }:AxiosResponse<BaseResponse<void>> = await axios.delete(
        baseUrl + "/" + id
    );
    return data;
}

async function addProductInventory(productInventory:ProductoInventario): Promise<BaseResponse<void>>{
    const { data }:AxiosResponse<BaseResponse<void>> = await axios.patch(
        baseUrl + "/ingresarInventario",
        productInventory
    );
    return data;
}

export { createProduct, listProduct, editProduct, getProductById, deleteProduct, addProductInventory };