import axios, { AxiosResponse } from "axios";
import { Order } from "../../../models/Order.model";
import { BaseResponse } from "../../../models/BaseResponse.model";
import { FacturedOrder, PendingOrder } from "../../../models/PendingOrder.model";

export class OrderService{
    private readonly url = process.env.REACT_APP_BASE_URL + "/Pedido";
    private static instanceService: OrderService | null = null;
    private constructor(){
    }

    public static get instance(): OrderService{
        if(OrderService.instanceService == null){
            OrderService.instanceService = new OrderService();
        }
        return OrderService.instanceService;
    }

    public async addOrder(order: Order): Promise<BaseResponse<void>>{
            const response:AxiosResponse<BaseResponse<void>> = await axios.post(
                this.url,
                order
            );
            const { data } = response;
            return data;
    }

    public async listPendingOrder(): Promise<BaseResponse<PendingOrder[]>>{
        const response: AxiosResponse<BaseResponse<PendingOrder[]>> = await axios.get(
            this.url + "/Pendientes"
        );
        const { data } = response;
        return data;
    }

    public async listFacturedOrder(): Promise<BaseResponse<FacturedOrder[]>>{
        const response: AxiosResponse<BaseResponse<FacturedOrder[]>> = await axios.get(
            this.url + "/Facturados"
        )
        const { data } = response;
        return data;
    }

    public async closePendingOrderOfClient(clientId:number): Promise<BaseResponse<void>>{
        const response: AxiosResponse<BaseResponse<void>> = await axios.post(
            this.url + "/Pendientes",
            { clientId }
        );
        const { data } = response;
        return data;
    }
}
