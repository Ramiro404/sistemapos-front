import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../../models/BaseResponse.model";
import { FacturaImpresion } from "../../../models/FacturaImpresion.model";
import { InvoiceOrder } from "../../../models/InvoiceOrder.model";

export class InvoiceService{
    private static instanceService: InvoiceService | null = null;
    private readonly url = process.env.REACT_APP_BASE_URL + "/Factura";

    private constructor(){}

    public static get Instance(): InvoiceService{
        if(this.instanceService == null){
            this.instanceService = new InvoiceService();
        }
        return this.instanceService;
    }

    public async list(): Promise<BaseResponse<InvoiceOrder[]>>{
        const response:AxiosResponse<BaseResponse<InvoiceOrder[]>> = await axios.get(
            this.url
        );
        return response.data;
    }

    public async print(pedidoId:number): Promise<BaseResponse<FacturaImpresion>>{
        const response:AxiosResponse<BaseResponse<FacturaImpresion>> = await axios.get(
            this.url + "/Impresion/" + pedidoId
        );
        return response.data;
    }
}