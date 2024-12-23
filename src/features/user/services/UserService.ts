import axios, { AxiosResponse } from "axios";
import { Usuario } from "../../../models/Usuario.model";
import { BaseResponse } from "../../../models/BaseResponse.model";

const baseUrl = "https://localhost:44355/api";

async function create(user: Usuario): Promise<void>{
    await axios.post(
        baseUrl + "/Usuario",
        user
    );
}

async function list(): Promise<Usuario[]>{
    const response: AxiosResponse<BaseResponse<Usuario[]>> = await axios.get(
        baseUrl + "/Usuario"
    );
    return response.data.data;
}

async function edit(id: number, usuario: Usuario):Promise<void> {
    await axios.patch(
        baseUrl + "/Usuario/" + id,
        usuario
    );
}

async function getOne(id: number): Promise<Usuario>{
    const response: AxiosResponse<BaseResponse<Usuario>> = await axios.get(
        baseUrl + "/Usuario/" + id
    );
    return response.data.data;
}

async function deleteUser(id: number): Promise<void>{
    await axios.delete(
        baseUrl + "/Usuario/" + id
    );
}

export { create, list, edit, getOne, deleteUser };