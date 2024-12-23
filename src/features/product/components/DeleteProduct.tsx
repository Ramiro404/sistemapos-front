import React, { useEffect, useState } from "react";
import { Producto } from "../../../models/Producto.model";
import { deleteProduct, listProduct } from "../services/ProductService";
import { BaseError } from "../../../models/BaseError";
import { ItemProduct } from "./ItemProduct";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function DeleteProduct(): JSX.Element {
  const [productList, setProductList] = useState<Producto[]>();
  const [error, setError] = useState<BaseError>();
  const navigation = useNavigate();

  const remove = (id: number) => {
    deleteProduct(id)
      .then(() => {
        Swal.fire({
          title: "Eliminado correctamente",
          showConfirmButton: true,
          confirmButtonText: "Continuar",
        }).finally(() => {
          navigation({
            pathname: "../../product",
          });
        });
      })
      .catch((e: BaseError) => {
        Swal.fire({
          title: e.message,
        });
      });
  };

  const showConfirmDelete = (product: Producto) => {
    Swal.fire({
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      title: `Eliminar el producto ${product.nombre}?`,
    }).then((value) => {
      if (value.isConfirmed) {
        remove(product.id);
      }
    });
  };

  useEffect(() => {
    listProduct()
      .then(({ data }) => {
        setProductList(data);
      })
      .catch((e: BaseError) => {
        setError(e);
      });
  }, []);

  return (
    <React.Fragment>
      {productList && (
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
                <TableCell>---</TableCell>
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
                    <Button type="button" onClick={() => remove(row.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {error && <span>{error.message}</span>}
    </React.Fragment>
  );
}
