import React, { useEffect, useState } from "react";
import { addProductInventory, listProduct } from "../services/ProductService";
import { BaseResponse } from "../../../models/BaseResponse.model";
import { Producto } from "../../../models/Producto.model";
import { BaseError } from "../../../models/BaseError";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import { ProductoInventario } from "../../../models/ProductoInventario.model";
import { useAlert } from "../../../hooks/useAlert";
import { Loader } from "../../../components/Loader";

export function ListProduct(): JSX.Element {
  const [productList, setProductList] = useState<Producto[]>([]);
  const [error, setError] = useState<BaseError>();
  const [loading, setLoading] = useState<boolean>(false);
  const { successAlert, errorAlert, confirmAlert } = useAlert();

  const addStock = async(product: Producto) => {
    const { value: stock} = await Swal.fire({
      title: "Agregar stock para " + product.nombre,
      input: "number",
      inputLabel: "Cantidad de stock a agregar",
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value){
          return "Introduce un valor";
        }
        const valueNumber = parseInt(value);
        if(valueNumber === 0){
          return "El valor no puede ser cero"
        }
      }
    });
    const productInventory: ProductoInventario = {
      cantidad: parseInt(stock),
      productoId: product.id
    };
    console.log(productInventory)
    setLoading(true);
    addProductInventory(productInventory)
      .then((data) => {
        successAlert("Se agrego el stock");
      })
      .catch((e) => {
        errorAlert("Ocurrio un error");
      })
      .finally(() => {
        setLoading(false);
      })
  }

  
  useEffect(() => {
    listProduct()
      .then((value: BaseResponse<Producto[]>) => {
        setProductList([...value.data]);
      })
      .catch((e: BaseError) => {
        setError({ ...e });
      });
  }, []);
  return (
    <React.Fragment>

      {productList.length > 0 &&
        <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Medida</TableCell>
                    <TableCell>Peso</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Unidad Medida</TableCell>
                    <TableCell>Valor Unitario</TableCell>
                    <TableCell>Volumen Empaque</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productList.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.medida}</TableCell>
                        <TableCell>{row.peso}</TableCell>
                        <TableCell>{row.stock}</TableCell>
                        <TableCell>{row.unidadMedida}</TableCell>
                        <TableCell>{row.valorUnitario}</TableCell>
                        <TableCell>{row.volumenEmpaque}</TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => addStock(row)}>
                            Agregar stock
                          </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>}
        

      {productList.length === 0 && <span>No hay productos</span>}
      {error && <span>{error.message}</span>}
      {loading && <Loader/>}
    </React.Fragment>
  );
}
