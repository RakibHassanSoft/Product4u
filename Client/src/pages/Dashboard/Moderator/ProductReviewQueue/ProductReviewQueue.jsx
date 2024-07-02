import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const ProductReviewQueue = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, refetch, data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/moderoator/products`);
            return res.data;
        }
    });

    const markFeatured = async (id) => {
        try {
            const res = await axiosPublic.put(`/product/featured/${id}`);
            refetch();
        } catch (error) {
            console.error("Error marking as featured:", error);
        }
    };

    const rejectProduct = async (id) => {
        try {
            const res = await axiosPublic.put(`/product/reject/${id}`);
            refetch();
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };

    const acceptProduct = async (id) => {
        try {
            const res = await axiosPublic.put(`/product/accept/${id}`);
            refetch();
        } catch (error) {
            console.error("Error accepting product:", error);
        }
    };

    const sortedProducts = products.sort((a, b) => (a.status === 'Pending' ? -1 : 1));

    return (
        <div>
            <div>
                <h1 className='text-center mt-10 text-3xl font-serif w-4/12 m-auto border p-7 rounded-lg shadow-md border-blue-400'>
                    Product Review
                </h1>
            </div>
            <div className='mt-10'>
                <div className="w-1/2 m-auto">
                    {isLoading ? (
                        <h1 className='text-3xl text-center mt-44 font-bold text-blue-400'>Loading...</h1>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Details</th>
                                    <th>Featured</th>
                                    <th>Accept</th>
                                    <th>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedProducts.length > 0 ? (
                                    sortedProducts.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                <Link to={`/products/details/${product._id}`} className="btn btn-ghost btn-xs">
                                                    View Details
                                                </Link>
                                            </td>
                                            <td>
                                                {product.featured && product.status !== 'Rejected' ? (
                                                    'Already Featured'
                                                ) : (
                                                    <button
                                                        onClick={() => markFeatured(product._id)}
                                                        className="btn btn-ghost btn-xs"
                                                        disabled={product.featured || product.status === 'Rejected'}
                                                    >
                                                        Feature
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => acceptProduct(product._id)}
                                                    className="btn btn-ghost btn-xs"
                                                    disabled={product.status === 'Accepted'}
                                                >
                                                    {product.status === 'Accepted' ? 'Accepted' : 'Accept'}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => rejectProduct(product._id)}
                                                    className="btn btn-ghost btn-xs"
                                                    disabled={product.status === 'Rejected'}
                                                >
                                                    {product.status === 'Rejected' ? 'Rejected' : 'Reject'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-green-400 text-2xl mt-5">
                                            No pending products
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviewQueue;












// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosPublic from '../../../../hooks/useAxiosPublic';
// import { Link } from 'react-router-dom';

// const ProductReviewQueue = () => {
//     const axiosPublic = useAxiosPublic();

//     const { isLoading, refetch, data: pendingProducts = {} } = useQuery({
//         queryKey: ['pendingProducts'], // Include id in the queryKey to make it unique per product
//         queryFn: async () => {

//             const res = await axiosPublic.get(`/moderoator/products`);
//             return res.data;


//         }
//     });
//     console.log(pendingProducts)
//     const upvoted = async (id) => {
//         console.log(id);
//         try {
//             const res = await axiosPublic.put(`/product/featured/${id}`);
//             console.log(res.data);
//             refetch()
//         } catch (error) {
//             console.error("Error deleting review:", error);
//         }
//     };

//     const rejected = async (id) => {
//         console.log(id);
//         try {
//             const res = await axiosPublic.put(`/product/reject/${id}`);
//             console.log(res.data);
//             refetch();
//         } catch (error) {
//             console.error("Error deleting review:", error);
//         }
//     };
//     const accepted = async (id) => {
//         console.log(id);
//         try {
//             const res = await axiosPublic.put(`/product/accept/${id}`);
//             console.log(res.data);
//             refetch();
//         } catch (error) {
//             console.error("Error deleting review:", error);
//         }
//     };
//     return (
//         <div>
//             <div>
//                 <h1 className='text-center mt-10 text-3xl font-serif w-4/12 m-auto border p-7 rounded-lg shadow-md border-blue-400'>Product Revew</h1>
//             </div>
//             <div className='mt-10  '>
//                 <div className="w-1/2 m-auto">
//                     {
//                         isLoading && <>
//                             <h1 className='text-3xl text-center mt-44 font-bold text-blue-400'>Loading.........</h1>
//                         </>
//                     }
//                     <table className="table ">
//                         {/* head */}
//                         <thead>
//                             <tr>
//                                 <th>
//                                     #
//                                 </th>
//                                 <th> Product Name</th>
//                                 <th>Details </th>
//                                 <th>Featured </th>
//                                 <th>Action </th>
//                                 <th>Action </th>


//                             </tr>
//                         </thead>

//                         <tbody>


//                             {
//                                 pendingProducts.length > 0 && pendingProducts.map((singleProduct, index) =>
//                                     <tr key={singleProduct._id}>
//                                         <th>
//                                             #
//                                         </th>
//                                         <td>
//                                             {singleProduct?.name}
//                                         </td>
//                                         <th>
//                                             <Link to={`/products/details/${singleProduct._id}`} className="btn btn-ghost btn-xs">details</Link>
//                                         </th>

//                                         {/* featured section  */}
//                                         {(singleProduct.featured === true && singleProduct?.status !== "Rejected") &&
//                                             <th>alredey featured</th>
//                                         }
//                                         {(singleProduct.featured === false && singleProduct?.status !== "Rejected") &&
//                                             <th>
//                                                 <button onClick={() => upvoted(singleProduct._id)} className="btn btn-ghost btn-xs">Feature</button>
//                                             </th>
//                                         }
//                                         {singleProduct?.status === "Rejected" &&
//                                             <th>Rejected</th>
//                                         }


//                                         {/* for reject  */}
//                                         {singleProduct?.status === "Rejected" ?
//                                             <th>
//                                                 <button disabled className="btn bg-green-500 text-white btn-xs rounded-md">Rejected</button>
//                                             </th>
//                                             : <th>
//                                                 <button onClick={() => rejected(singleProduct._id)} className="btn btn-ghost btn-xs">Reject</button>
//                                             </th>}
//                                         {/* for accept  */}
//                                         {singleProduct?.status === "Accepted" ?
//                                             <th>
//                                                 <button disabled className="btn bg-green-500 text-white btn-xs rounded-md">Accepted</button>
//                                             </th>
//                                             : <th>
//                                                 <button onClick={() => accepted(singleProduct._id)} className="btn btn-ghost btn-xs">Accept</button>
//                                             </th>}
//                                     </tr>
//                                 )
//                             }



//                         </tbody>


//                     </table>
//                     {
//                              pendingProducts.length === 0 && <h1 className='text-center text-green-400 text-2xl mt-5 '> No pending products</h1>
//                         }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductReviewQueue;