import { useEffect,useState } from "react";
import axios from "axios";

const useFetch =(url)=>{

    const [data,setData]=useState(null);
    const [isPending,setIspending]=useState(true);
    const [error,setError]=useState(null)

    useEffect(()=>{
        setTimeout(()=>{
            axios(url)
            .then(res=>{
                setData(res.data);
                setIspending(false);
                setError(null)
            })
            .catch((err)=>{
                setError(err.message)
                setIspending(false);
            })
        },1000);
    },[url]);
    return {data,isPending,error}
}
export default useFetch; 