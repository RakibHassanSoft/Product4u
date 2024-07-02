import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useSingleProductById } from '../../hooks/useSingleProductById';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Reviews from './Reviews/Reviews';

const Details = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    // Dummy features for illustration purposes
    const features = [
        'High-quality design',
        'User-friendly interface',
        'Fast performance',
        'Secure transactions',
        'Customer support'
    ];

    // const [isLoading,refetch,product] = useSingleProductById(id)
    const { isLoading, refetch, data: product = {} } = useQuery({
        queryKey: ['userProduct'], // Include id in the queryKey to make it unique per product
        queryFn: async () => {
            if (id) {
                const res = await axiosPublic.get(`/user/products/${id}`);
                return res.data;
            }
            return {};
        }
    });
    // console.log(product)

    const { description, external_links, image, name, tags, upvote_count, _id } = product;
    // console.log(_id)

    const [upvote, setUpvote] = useState(false);

    const handleUpVote = async () => {
        const res = await axiosPublic.patch(`/user/products/${id}`, {
            upvote_count: upvote_count + 1
        })

        if (res.status == 200) {
            refetch()

        }
        setUpvote(true)
    }
    const handlAddReport = async () => {
        const productInfo = product;
        const res = await axiosPublic.post(`/product/report?email=${user.email}`, productInfo)
        // console.log(res.data)
        if(res.data.acknowledged == true){
            // console.log(res.data)
            Swal.fire({
                title: "Report done",
                text: "We will thing about this report. Thanks",
                icon: "success"
              });
        }else{
            Swal.fire({
                title: "Sorry",
                text: "We can not take any report right now. Thanks",
                icon: "error"
              });
        }
    }
    const onSubmit = async (data) => {
        //    console.log(data)
       
        const ReviewInfo = {
            reviewer_name: user.displayName,
            review_description: data.ReviewDiscription,
            reviewer_image: user.photoURL,
            rating: parseFloat(data.rating),
            productId: _id,
            product_Name: product.name,
            date: new Date()

        }

        const res = await axiosPublic.post(`/AddReviews?email=${user.email}`, ReviewInfo)
        // console.log(res)
        if (res.data.insertedId) {
            Swal.fire({
                title: "Product added",
                text: "You can see in your product list",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Sorry",
                text: "You can not add more than 1 review",
                icon: "error"
            });

        }

        reset();


    };
    return (

        <div className="bg-cover bg-center pb-24" style={{ backgroundImage: "url('https://free4kwallpapers.com/uploads/wallpaper/blue-moon-1024x768-wallpaper.jpg')" }}>


            <div className="w-full h-screen pt-44 my-10 flex flex-col lg:flex-row lg:justify-evenly" >
                <div className="bg-gray-100 rounded-lg  overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                        <div className="flex items-center justify-center md:justify-start">
                            <img className="w-full md:max-w-md rounded-lg" src={image} alt={name} />
                        </div>
                        <div className="flex flex-col mt-5">
                            <div>
                                <h1 className="text-3xl font-mono text-blue-800 mb-4">{name}</h1>
                                <p className="text-gray-600 mb-4">{description}</p>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <Link to={external_links} className="text-blue-600 hover:underline">External Link</Link>
                                </div>
                                <h1>{upvote_count}</h1>

                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <button onClick={handlAddReport} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                                        Report
                                    </button>
                                </div>
                                <div>
                                    {!upvote && <button onClick={handleUpVote} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Upvote
                                    </button>}
                                    {upvote && <button disabled onClick={handleUpVote} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Upvoted
                                    </button>}
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="bg-gray-200  p-4 flex items-center justify-between">
                        <p className="text-gray-700">Upvotes: {upvote_count}</p>
                    </div>
                </div>
                {/* Additional Section for Features or Highlights */}
                <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
                    <ul className="list-disc pl-6">
                        {features.map((feature, index) => (
                            <li key={index} className="text-gray-600 mb-2">{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* review area  */}

            <div className='border p-10 w-11/12  bg-white bg-opacity-60     m-auto rounded-lg '>
                <h1 className='mt-6 mb-6 text-center text-3xl text-blue-400'>Give review</h1>
                <form action="">

                    <div>
                        <label className="block text-white text-lg font-medium ">Reviewer Name</label>
                        <input
                            type="text"
                            disabled


                            value={user?.displayName}

                            className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />

                    </div>

                    <div>
                        <label className="block text-white text-lg font-medium ">Reviewer Image</label>
                        <input
                            type="tx"

                            disabled

                            value={user?.photoURL}
                            className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />

                    </div>
                </form>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">



                    <div>
                        <label className="block text-white text-lg font-medium ">Rating </label>
                        <input
                            type="number"
                            max={5}
                            min={0}

                            {...register('rating', {
                                required: true,
                                maxLength: 5,

                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />

                    </div>
                    <div className="col-span-full">
                        <label htmlFor="address" className="block text-white text-lg font-medium h">Review Description</label>
                        <textarea {...register("ReviewDiscription", { required: true })} className="textarea textarea-info h-44 w-full" ></textarea>
                    </div>
                    <div className='w-28 m-auto'>
                        {!(product?.owner_email === user.email) &&
                            <button type="submit" className="m-auto text-center py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Submit
                            </button>
                        }
                        {(product?.owner_email === user.email) &&
                            <button type="submit" disabled className="m-auto text-center py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Submit
                            </button>
                        }

                    </div>
                </form>
            </div>

            <div>
                <Reviews _id={_id}></Reviews>
            </div>
        </div>
    );
};

export default Details;
