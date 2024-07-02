import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Registration = () => {
    const { user, createUser, updateUser, signInByGoolge } = useAuth();
    // console.log(signInByGoolge)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = async (data) => {
    //     try {
    //         console.log(data);
    //         const result = await createUser(data.email, data.password);
    //         console.log("User reust",result);
    //         await updateUser(data.username, data.url);

    //         const newUser = {
    //             Name: data.username,
    //             Image: data.url,
    //             Email: data.email,
    //             Password: data.password,
    //             Membership: false,
    //             user_Status: "user",
    //         };

    //         const resp = await axiosPublic.post(`/user?email=${data.email}`, newUser); // Use data.email instead of user.email
    //         console.log(resp);
    //         if (resp.data.insertedId) {
    //             Swal.fire({
    //                 title: "congratulations",
    //                 text: "Welcome to our website!",
    //                 icon: "success"
    //             });
    //         } else {
    //             Swal.fire({
    //                 title: "Sorry",
    //                 text: "Please try again!",
    //                 icon: "error"
    //             });
    //         }
    //         navigate('/');
    //     } catch (err) {
    //         // console.log(err);
    //     // Handle Firebase error (auth/email-already-in-use)
    //     if (err.code === 'auth/email-already-in-use') {
    //         Swal.fire({
    //             title: "Email Already in Use",
    //             text: "This email is already registered. Please login or use a different email.",
    //             icon: "error"
    //         });
    //     } else {
    //         // Handle other errors
    //         Swal.fire({
    //             title: "Error",
    //             text: err.message,
    //             icon: "error"
    //         });
    //     }
    //     }
    // };
    const onSubmit = async (data) => {
        try {
            console.log(data);
    
            // Check if all required fields are provided
            if (!data.email || !data.password || !data.username || !data.url) {
                Swal.fire({
                    title: "Error",
                    text: "All fields are required. Please fill in all the fields.",
                    icon: "error"
                });
                return;
            }
    
            const result = await createUser(data.email, data.password);
            console.log("User result", result);
            await updateUser(data.username, data.url);
    
            const newUser = {
                Name: data.username,
                Image: data.url,
                Email: data.email,
                Password: data.password,
                Membership: false,
                user_Status: "user",
            };
    
            const resp = await axiosPublic.post(`/user?email=${data.email}`, newUser); // Use data.email instead of user.email
            console.log(resp);
            if (resp.data.insertedId) {
                Swal.fire({
                    title: "Congratulations",
                    text: "Welcome to our website!",
                    icon: "success"
                });
                navigate('/');
            } else {
                Swal.fire({
                    title: "Sorry",
                    text: "Please try again!",
                    icon: "error"
                });
            }
        } catch (err) {
            // Handle Firebase error (auth/email-already-in-use)
            if (err.code === 'auth/email-already-in-use') {
                Swal.fire({
                    title: "Email Already in Use",
                    text: "This email is already registered. Please login or use a different email.",
                    icon: "error"
                });
            } else {
                // Handle other errors
                Swal.fire({
                    title: "Error",
                    text: err.message,
                    icon: "error"
                });
            }
        }
    };
    
    const handleGoogleLogin = async () => {
        signInByGoolge()
            .then(async (res) => {
                console.log(res)
                const { email, displayName, photoURL } = res.user;
                const user = {
                    email, displayName, photoURL
                }
                const result = await axiosPublic.post('http://localhost:3000/auth/google', user)
                // console.log(result)
                // console.log(email, displayName, photoURL)
                if (result.data._id) {
                    await Swal.fire({
                        title: "Congratulations",
                        text: "Welcome to our website!",
                        icon: "success"
                   
                    });
                    await navigate('/')
                } else {
                    await Swal.fire({
                        title: "Sorry",
                        text: "Please try again!",
                        icon: "error"
                    });
                }
                    
                
            })
            .catch(err => {
                console.log("error is", err.message)
            })
    }
    return (
        <div className="max-w-md mx-auto pt-44 pb-44">
            <h1 className="text-4xl font-bold mb-5 text-center text-blue-300">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Repassword</label>
                    <input
                        type="password"
                        {...register('repassword', { required: 'Password is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        type="text"
                        {...register('url', { required: 'URL is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
                </div>
                <div className='flex gap-3 mt-2 mb-3'>
                    <h1>Already have an account? </h1>
                    <Link to='/login' className='text-red-400 '><i>Please login</i> </Link>
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className=" py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Submit
                    </button>
                </div>
            </form>
            <div className="divider">OR</div>
            <div className=''>
                <button onClick={handleGoogleLogin} className="flex w-1/2 m-auto justify-between   py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <h1>
                        Sign in  by google
                    </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Registration;
