import { useEffect, useState } from "react";
import { BaseError } from "../models/BaseError";
import axios from "axios";

type Method = 'get' | 'post' | 'patch' | 'delete';

export interface FetchParam<T>{
    method: Method,
    url: string,
    data?: T | null
}

export function useFetch<T,U>(p0: () => Promise<void>, p1: never[], fetchParams: FetchParam<T> | null): [U | undefined, BaseError | undefined, boolean]{
    const [data, setData] = useState<U | undefined>(undefined);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async() => {
            if(!fetchParams?.data) return;
            setLoading(true);
            try{
                const response = await axios.request<U>(fetchParams);
                setData(response.data);
            } catch(err){
                setError(err);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchParams?.data]);

    return [data, error, loading];
};