import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageCupons = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // State to manage form values
    const [formValues, setFormValues] = useState({
        cupon: '',
        discout: '',
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleCupon = async (e) => {
        e.preventDefault();
        const { cupon, discout } = formValues;
        const data = {
            cupon,
            discout: parseInt(discout),
        };
        const res = await axiosSecure.post(`/coupons?email=${user.email}`, data);
        console.log(res);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Congratulations",
                text: "Your cupon is added!",
                icon: "success"
               
            });
        } else {
            Swal.fire({
                title: "Sorry",
                text: res.data.message,
                icon: "error"
            });
        }

        // Reset form values
        setFormValues({
            cupon: '',
            discout: '',
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Coupons</h1>
                <form onSubmit={handleCupon} className="space-y-4">
                    <div>
                        <label htmlFor="cupon" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                        <input
                            name='cupon'
                            type="text"
                            value={formValues.cupon}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter coupon code"
                        />
                    </div>
                    <div>
                        <label htmlFor="discout" className="block text-sm font-medium text-gray-700">Discount Amount</label>
                        <input
                            name='discout'
                            type="number"
                            value={formValues.discout}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter discount amount"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Add Coupon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageCupons;





// import React, { useState } from 'react';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import useAuth from '../../../../hooks/useAuth';

// const ManageCupons = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
    
//     // State to manage form values
//     const [formValues, setFormValues] = useState({
//         cupon: '',
//         discout: '',
//     });

//     // Handle form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues((prevValues) => ({
//             ...prevValues,
//             [name]: value,
//         }));
//     };

//     // Handle form submission
//     const handleCupon = async (e) => {
//         e.preventDefault();
//         const { cupon, discout } = formValues;
//         const data = {
//             cupon,
//             discout: parseInt(discout),
//         };
//         const res = await axiosSecure.post(`/coupons?email=${user.email}`, data);
//         console.log(res);
        
//         // Reset form values
//         setFormValues({
//             cupon: '',
//             discout: '',
//         });
//     };

//     return (
//         <div>
//             <h1>Manage Coupons</h1>
//             <form onSubmit={handleCupon} className='w-1/2 m-auto bg-blue-600 p-20'>
//                 <label htmlFor="cupon">Add Coupon</label><br />
//                 <input
//                     name='cupon'
//                     type="text"
//                     value={formValues.cupon}
//                     onChange={handleChange}
//                 /><br />
//                 <label htmlFor="discout">Add Amount</label><br />
//                 <input
//                     name='discout'
//                     type="number"
//                     value={formValues.discout}
//                     onChange={handleChange}
//                 /><br />
//                 <button type="submit">Add</button>
//             </form>
//         </div>
//     );
// };

// export default ManageCupons;
