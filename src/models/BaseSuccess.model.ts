import { IBaseResponse } from "./BaseResponse.model";

export interface BaseSuccess<T> extends IBaseResponse{
    data: T
}