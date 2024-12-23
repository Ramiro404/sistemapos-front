export interface Order{
    clienteId:number
    pedidos: ProductQuantiy[]
};

export interface ProductQuantiy{
    productoId: number
    cantidad: number
}