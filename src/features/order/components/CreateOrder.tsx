import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Cliente } from "../../../models/Cliente.model";

import "./CreateOrder.css";
import { Producto } from "../../../models/Producto.model";
import Swal from "sweetalert2";
import { OrderService } from "../services/OrderService";
import { ClientService } from "../../client/services/ClientService";
import { listProduct } from "../../product/services/ProductService";
import { useAlert } from "../../../hooks/useAlert";
import { Loader } from "../../../components/Loader";

import {
  Autocomplete,
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Order, ProductQuantiy } from "../../../models/Order.model";

interface ProductOrderList {
  product: Producto;
  cantidad: number;
}

interface CreateProductOrderForm {
  client: string;
  products: Producto[];
}

export function CreateOrder(): JSX.Element {
  const [clientList, setclientList] = useState<Cliente[]>([]);
  const [productList, setproductList] = useState<Producto[]>();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [productOrderList, setproductOrderList] = useState<ProductOrderList[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { errorAlert, successAlert } = useAlert();

  const orderService = OrderService.instance;
  const clientService = ClientService.instance;
  const initData = async () => {
    try {
      setLoading(true);
      const resClientList = await clientService.listClient();
      const resProductList = await listProduct();
      setclientList(resClientList);
      setproductList(resProductList.data);
    } catch (err) {
      errorAlert("Ocurrio un problema");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const isProductRepeated = (product: Producto): boolean => {
    const repeated = productOrderList.find(
      (order) => order.product.id === product.id
    );
    if (repeated) {
      errorAlert(
        "Ya has seleccionado este producto, eliminalo del pedido para cambiar la cantidad"
      );
      return true;
    }
    return false;
  };

  const addProduct = async (product: Producto): Promise<void> => {
    if (isProductRepeated(product)) {
      return;
    }

    const { value: quantity } = await Swal.fire({
      title: product.nombre,
      text: "Disponible(s): " + product.stock,
      input: "number",
      inputLabel: "Introduzca la cantidad",
      showCancelButton: true,
      inputValidator: (value) => {
        if (value === "") {
          return "Ingresa una cantidad";
        }
        const valueNumber = parseInt(value);
        if (valueNumber > product.stock) {
          return "La cantidad supera el stock disponible";
        }
        if (valueNumber < 0) {
          return "La cantidad no puede ser negativa";
        }
        if (valueNumber === 0) {
          return "La cantidad no puede ser cero";
        }
      },
    });

    if (quantity) {
      setproductOrderList([
        ...productOrderList,
        { product: product, cantidad: quantity },
      ]);
    }
  };

  const removeProduct = (product: Producto) => {
    setproductOrderList((state) =>
      state.filter((value) => value.product.id !== product.id)
    );
  };

  const selectClient = (client: string | null): void => {
    if (client) {
      setSelectedClient(client);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedClient === "") {
      errorAlert("Selecciona un cliente");
      return;
    }
    if (productOrderList.length === 0) {
      errorAlert("Selecciona al menos un producto");
      return;
    }
    try {
      setLoading(true);
      const productQuantity: ProductQuantiy[] =
        productOrderList.map<ProductQuantiy>((order) => {
          const product: ProductQuantiy = {
            cantidad: order.cantidad,
            productoId: order.product.id,
          };
          return product;
        });

      const client = clientList.find(
        (client) => client.numeroDocumento === selectedClient
      );

      const body: Order = {
        clienteId: client!.id,
        pedidos: productQuantity,
      };
      await orderService.addOrder(body);
      successAlert("El pedido se guardo exitosamente");
    } catch (e) {
      console.error(e);
      errorAlert("Ocurrio un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <Autocomplete
          disablePortal
          onChange={(event, value) => selectClient(value)}
          options={clientList.map((c) => c.numeroDocumento)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Client" />}
        />

        <Grid2 container>
          <Grid2 size={6}>
            {productList && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">---</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productList.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.nombre}</TableCell>
                        <TableCell align="right">{row.stock}</TableCell>
                        <TableCell align="right">
                          <Button onClick={() => addProduct(row)}>
                            Agregar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid2>
          <Grid2 size={4}>
            {productOrderList.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">---</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productOrderList.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.product.nombre}</TableCell>
                        <TableCell align="right">{row.cantidad}</TableCell>
                        <TableCell align="right">
                          <Button onClick={() => removeProduct(row.product)}>
                            Agregar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <h2>No hay productos en el pedido</h2>
            )}
          </Grid2>
          <Grid2 size={2}>
            <Button size="large" type="submit">Guardar pedido</Button>
          </Grid2>
        </Grid2>

      </form>

      {loading && <Loader />}
    </React.Fragment>
  );
}
