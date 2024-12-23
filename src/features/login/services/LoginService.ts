import axios, { AxiosResponse } from "axios";
import { jwtDecode } from 'jwt-decode';
import { Token, TokenResult } from "../../../models/Token";
import { TokenService } from "./TokenService";
const tokenService = TokenService.instance;

const baseUrl: string = "https://localhost:44355/api";

async function login(usuario: string, password: string): Promise<Token> {
  const response: AxiosResponse<Token> = await axios.post(
    baseUrl + "/InicioSesion",
    { usuario, password }
  );
  return response.data;
}

 function decodeJwtLogin(jwt: string): TokenResult{
    const decoded = jwtDecode(jwt);
    const decodedJson = decoded as any;
    const result:TokenResult = {
        id: decodedJson.id,
        exp: decoded.exp ?? 0,
        iat: decoded.iat ?? 0,
        nbf: decoded.nbf ?? 0
    };
    tokenService.saveToken(jwt);
    return result;
}

export { login, decodeJwtLogin };
