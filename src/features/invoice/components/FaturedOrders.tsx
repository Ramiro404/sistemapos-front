import React, { useEffect, useState } from "react";
import { OrderService } from "../../order/services/OrderService";
import {
  FacturedOrder,
  PendingOrder,
} from "../../../models/PendingOrder.model";
import { useAlert } from "../../../hooks/useAlert";
import { Loader } from "../../../components/Loader";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InvoiceService } from "../services/InvoiceService";
import { Base64ToFileDownload } from "../../../utils/Base64ToFileDownload";
import TableBody from "@mui/material/TableBody";
import { InvoiceOrder } from "../../../models/InvoiceOrder.model";

export function FacturedOrders(): JSX.Element {
  const orderService = OrderService.instance;
  const invoiceService = InvoiceService.Instance;
  const [orderList, setOrderList] = useState<InvoiceOrder[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { errorAlert } = useAlert();

  const print = (order: InvoiceOrder) => {
    setLoading(true);
    invoiceService
      .print(order.id)
      .then(({ data }) => {
        const { facturaBase64 } = data;
        const fileName = `${order.numeroDocumento}_${order.fechaFacturacion.getDay} ${order.fechaFacturacion.getMonth} ${order.fechaFacturacion.getFullYear}`;
        Base64ToFileDownload.downloadFile(facturaBase64, fileName);
      })
      .catch((e) => {
        console.error(e);
        errorAlert("Ocurrio un error al imprimir la factura");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    invoiceService.list()
      .then(({ data }) => {
        setOrderList(data);
      })
      .catch((e) => {
        errorAlert("Ocurrio un error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {orderList && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Numero documento</TableCell>
                <TableCell>Unidades</TableCell>
                <TableCell>Imprimir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{row.numeroDocumento}</TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right">
                      {row.fechaFacturacion.toString()}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => print(row)}>Imprimir</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {loading && <Loader />}
    </React.Fragment>
  );
}
