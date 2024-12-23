import React from "react";
import "./App.css";
import { LoginPage } from "./features/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PanelPage } from "./features/panel";
import { CreateUser } from "./features/user/components/CreateUser";
import { UserPage } from "./features/user";
import { ListUser } from "./features/user/components/ListUser";
import { EditUser } from "./features/user/components/EditUser";
import { DeleteUser } from "./features/user/components/DeleteUser";
import { CreateProduct } from "./features/product/components/CreateProduct";
import { ProductPage } from "./features/product";
import { ListProduct } from "./features/product/components/ListProduct";
import { DeleteProduct } from "./features/product/components/DeleteProduct";
import { OrderIndex } from "./features/order";
import { CreateOrder } from "./features/order/components/CreateOrder";
import { InvoiceIndex } from "./features/invoice/InvoiceIndex";
import { FacturedOrders } from "./features/invoice/components/FaturedOrders";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/usuario" element={<UserPage />}>
            <Route index path="list" element={<ListUser />} />
            <Route path="add" element={<CreateUser />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="delete" element={<DeleteUser />} />
          </Route>

          <Route path="/product" element={<ProductPage />}>
            <Route path="list" element={<ListProduct />} />
            <Route path="add" element={<CreateProduct />} />
            <Route path="delete" element={<DeleteProduct />} />
          </Route>

          <Route path="/order" element={<OrderIndex />}>
            <Route path="add" element={<CreateOrder />} />
          </Route>

          <Route path="/invoice" element={<InvoiceIndex/>}>
            <Route path="print" element={<FacturedOrders/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
