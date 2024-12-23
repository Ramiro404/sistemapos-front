export interface BaseResponse<T>{
    status:number,
    message:string,
    data:T
}

export interface IBaseResponse{
    status:number,
    message:string,
}