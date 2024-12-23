import axios, { AxiosResponse } from "axios";
import { Cliente } from "../../../models/Cliente.model";
import { BaseResponse } from "../../../models/BaseResponse.model";

export class ClientService{
    private readonly url = process.env.REACT_APP_BASE_URL + "/Cliente";
    private static clienService:ClientService | null = null;

    private constructor(){}

    public static get instance(): ClientService{
        if(this.clienService == null){
            this.clienService = new ClientService();
        }
        return this.clienService;
    }

    public async listClient(): Promise<Cliente[]>{
            const response: AxiosResponse<BaseResponse<Cliente[]>> = 
                await axios.get<BaseResponse<Cliente[]>>(this.url);
            return response.data.data;
    }
}