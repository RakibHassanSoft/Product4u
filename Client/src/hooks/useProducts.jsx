import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAxiosSecure from './useAxiosSecure';




export const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure= useAxiosSecure();
    const {isLoading,data : products =[]} = useQuery({
        queryKey:['products'],
        queryFn: async ()=>{
           const res = await  axiosPublic.get('/products')
        //    console.log(res.data)
           return res.data;
        }
    })
    
    return [isLoading,products]
};

