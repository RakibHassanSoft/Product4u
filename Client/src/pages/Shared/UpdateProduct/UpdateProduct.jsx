
import React, { useEffect, useState } from 'react';

import { WithContext as ReactTags } from 'react-tag-input';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSingleProductById } from '../../../hooks/useSingleProductById';
import Swal from 'sweetalert2';



const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateProduct = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    // const [isLoading,refetch,product] = useSingleProductById(id)
    // console.log(product)
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

    const { user } = useAuth();
    const auxiosPublic = useAxiosPublic();
    const [tags, setTags] = useState([]);
    const [links, setLinks] = useState([]);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();



    useEffect(() => {
        if (product?.tags) {
            const formattedTags = product.tags.filter(tag => typeof tag === 'string').map(tag => ({ id: tag, text: tag }));
            setTags(formattedTags);
        }
    }, [ product]);

    const onSubmit = async (data) => {
        //    console.log(data)
        const tagIDs = tags.map(tag => tag.id);


        const iamgeFile = { image: data.productImage[0] }
        const res1 = await auxiosPublic.post(image_hosting_api, iamgeFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(res1)
        if (res1.data.success) {
            const productInfo = {
                name: data.productName || product.name,
                image: res1.data.data.display_url || product.image,
                tags: tagIDs || product.name,
                description: data.productDetails || product.tags,
                external_links: data.url || product.external_links,
                upvote_count: 0 || product.upvote_count


            }

            const res = await auxiosPublic.patch(`/user/products/${id}`, productInfo)
            console.log(res)
            if (res.data.modifiedCount
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

            // Reset form and tags
            refetch();
            reset();
            setTags([]);



        }

    };
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };


    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    return (
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">

            <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">

                <fieldset className="flex flex-col  lg:flex-row gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50 ">

                    <div className="grid grid-cols-6 w-full gap-4 col-span-full lg:col-span-3 ">
                        <div className="col-span-full sm:col-span-3 flex flex-col">
                            <label htmlFor="firstname" className="text-xl mb-2">First name</label>
                            <input {...register("productName", { required: true })} type="text" placeholder={product.name} className="input input-bordered input-info w-full max-w-xs" />
                        </div>
                        <div className="col-span-full sm:col-span-3 flex flex-col">
                            <label htmlFor="lastname" className="text-xl mb-2">Image</label>
                            <input {...register("productImage", { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="address" className="text-xl mt-2">Address</label>
                            <textarea {...register("productDetails", { required: true })} className="textarea textarea-info  w-full" placeholder={product.description}></textarea>
                        </div>
                        <div className="col-span-full sm:col-span-3 flex flex-col">
                            <label htmlFor="firstname" className="text-xl mb-2">Give important url</label>
                            <input {...register("url", { required: true })} type="text" placeholder={product.external_links} className="input input-bordered input-info w-full max-w-xs" />
                        </div>

                        <div className="border w-96 p-3">
                            <h1 className='text-2xl text-blue-700 font-bold mb-2'>Add tag here:</h1>
                            <div className="bg-white flex p-6 rounded shadow">

                                <ReactTags
                                    tags={tags}
                                    delimiters={delimiters}
                                    handleDelete={handleDelete}
                                    handleAddition={handleAddition}
                                    handleDrag={handleDrag}
                                    inputFieldPosition="bottom"
                                    autocomplete
                                    editable
                                    classNames={{
                                        tagInput: 'w-full',
                                        tagInputField: 'w-full h-12 text-lg border-2 border-gray-300 rounded p-2 bg-blue-300 text-white border-none',
                                    }}
                                />

                            </div>
                        </div>




                    </div>

                    {/* owner info  */}
                    <div className=' flex-col items-center w-full  lg:pl-10'>
                        <div className="col-span-full w-full sm:col-span-3 flex flex-col">
                            <label htmlFor="firstname" className="text-xl mb-2">Name</label>
                            <input type="" disabled placeholder={user?.displayName} className="input input-bordered input-info w-full max-w-xs " />
                        </div>
                        <div className="col-span-full w-full sm:col-span-3 flex flex-col">
                            <label htmlFor="firstname" className="text-xl mb-2">Email</label>
                            <input disabled placeholder={user?.email} type="email" className="input input-bordered input-info w-full max-w-xs" />
                        </div>
                        <div className="col-span-full  h-64 sm:col-span-3 flex flex-col">
                            <img className='h-44 w-44 text-left mt-10 ' src={user?.photoURL} alt="" />
                        </div>
                    </div>

                </fieldset>


                <div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Submit
                    </button>
                </div>


            </form>
        </section>
    );
};

export default UpdateProduct;



/**
     // const { isLoading, refetch, data: product = {} } = useQuery({
    //     queryKey: ['userProduct'], // Include id in the queryKey to make it unique per product
    //     queryFn: async () => {
    //         if (id) {
    //             const res = await axiosPublic.get(`/user/products/${id}`);
    //             return res.data;
    //         }
    //         return {};
    //     }
    // });
    // console.log(product)
 */