import React from "react";
import { Menu } from "./components/Menu";
import { Outlet } from "react-router-dom";
import "../../index.css";

export function PanelPage(): JSX.Element {
  return (
    <React.Fragment>
      <div>
        <Menu />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
