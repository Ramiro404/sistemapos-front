import React, { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { BaseResponse } from "../../../models/BaseResponse.model";
import { Producto } from "../../../models/Producto.model";
import { BaseError } from "../../../models/BaseError";
import { ItemProduct } from "./ItemProduct";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function ListProduct(): JSX.Element {
  const [productList, setProductList] = useState<Producto[]>([]);
  const [error, setError] = useState<BaseError>();

  
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>}
        

      {productList.length === 0 && <span>No hay productos</span>}
      {error && <span>{error.message}</span>}
    </React.Fragment>
  );
}
