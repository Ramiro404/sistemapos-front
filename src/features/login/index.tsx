import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { Loader } from "../../components/Loader";
import { login } from "./services/LoginService";
import { Button, TextField } from "@mui/material";

import "./index.css";

interface LoginForm {
  usuario: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { errorAlert } = useAlert();

  // const [loginForm, setLoginForm] = useState<LoginForm | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.add("login-bg");

    return () => {
      document.body.classList.remove("login-bg");
    }
  }, []);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userInput, passwordInput)
      .then((res) => {
        navigate({
          pathname: "/panel",
        });
      })
      .catch((err) => errorAlert("Usuario o password incorrecto"))
      .finally(() => setLoading(false));
  };

  const onChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit} className="flex">
          <TextField
            id="user"
            label="Usuario"
            variant="outlined"
            onChange={onChangeUser}
          />
          <br/>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={onChangePassword}
          />
          <br/>
          <Button variant="contained" type="submit">
            Ingresar
          </Button>
        </form>
      </div>

      {loading && <Loader />}
    </React.Fragment>
  );
}
