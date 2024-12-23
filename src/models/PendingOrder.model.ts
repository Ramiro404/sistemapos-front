export interface PendingOrder {
    clienteId: number
    numeroDocumento: string
    unidades: number
  }

  export interface FacturedOrder{
    id:number
    numeroDocumento:string
    unidades:number
    fechaFacturacion:Date
  }