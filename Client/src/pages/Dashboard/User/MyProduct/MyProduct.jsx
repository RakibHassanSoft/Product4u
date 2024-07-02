import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const MyProduct = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { isLoading, refetch, data: products = [] } = useQuery({
        queryKey: ['userProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/products?email=${user.email}`)
            return res.data;
        }

    })
    // useEffect(() => {
    //     if (products?.tags) {
    //         const formattedTags = products.tags.filter(tag => typeof tag === 'string').map(tag => ({ id: tag, text: tag }));
    //         setTags(formattedTags);
    //     }
    // }, [id, products]); // Only run when id or product changes

    const deleteProduct = async (id) => {
        console.log(id)
        const res = await axiosPublic.delete(`/user/products/${id}`)
        // console.log(res)

        if (res.data.deletedCount
            > 0) {
            Swal.fire({
                title: "Congratulations",
                text: res.data.message,
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Sorry",
                text: "Pleasae try again!",
                icon: "error",
            });
        }
        refetch();

    }

    return (
        <div>
            <div>
                <h1 className='text-3xl text-center mt-10 mb-10 font-serif text-blue-700 border w-1/4 border-blue-400 m-auto p-4 shadow-sm rounded-xl'>My all products</h1>
            </div>
            <div>
                <div className="overflow-x-auto w-8/12 m-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Product Name</th>
                                <th>votes</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product, index) =>

                                    <tr key={index}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>

                                            <div className="avatar flex flex-col">
                                               
                                                <h2 className='mt-3 ml-2'>{product?.name}</h2>
                                            </div>


                                        </td>
                                        <td>
                                            {product?.upvote_count}

                                        </td>
                                        <td>
                                        {product?.status} 

                                        </td>
                                        <th>
                                            <Link to={`updateProduct/${product._id}`} className="btn btn-ghost btn-xs">Update</Link>
                                        </th>
                                        <th>
                                            <button onClick={() => deleteProduct(product._id)} className="btn btn-ghost btn-xs">Delete</button>
                                        </th>
                                    </tr>

                                )
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyProduct;