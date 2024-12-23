import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PendingOrder } from "../../../models/PendingOrder.model";
import { OrderService } from "../services/OrderService";
import { useAlert } from "../../../hooks/useAlert";
import { Loader } from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

export function PendingOrders(): JSX.Element {
  const [pendingOrderList, setPendingOderList] = useState<PendingOrder[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { errorAlert, successAlert, confirmAlert } = useAlert();
  const orderService = OrderService.instance;
  const navigate = useNavigate();

  const initData = () => {
    setLoading(true);
    orderService
      .listPendingOrder()
      .then(({ data }) => {
        setPendingOderList(data);
      })
      .catch((err) => {
        errorAlert("Ocurrio un problema");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    initData();
  }, []);

  const closePendingOrder = (clientId:number) => {
    setLoading(true);
    orderService.closePendingOrderOfClient(clientId)
      .then((response) => {
        successAlert("El pedido se cerro exitosamente")
          .then(() => {
            navigate({
              pathname: "../../order"
            });
          });
      })
      .catch((err) => {
        errorAlert("Ocurrio un problema");
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <React.Fragment>
      {pendingOrderList && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numero documento</TableCell>
                <TableCell align="right">Unidades</TableCell>
                <TableCell align="right">Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingOrderList.map((row) => (
                <TableRow
                  key={row.clienteId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.numeroDocumento}</TableCell>
                  <TableCell align="right">{row.unidades}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => closePendingOrder(row.clienteId)}>Cerrar pedido</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {loading && <Loader />}
    </React.Fragment>
  );
}
