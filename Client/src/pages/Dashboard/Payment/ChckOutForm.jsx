
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const CheckOutForm = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
   
    const { isLoading, refetch, data: cupons = [] } = useQuery({
      queryKey: ['cupon'],
      queryFn: async () => {
        const res = await axiosPublic.get(`/coupons`);
        return res.data;
      }
    });
    // console.log(cupons[0])
  
    const [clientSecret, setClientSecret] = useState('');
    const [err, setErrer] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        country: '',
        phone: ''
    });

    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const navigate = useNavigate();

    const [value,setValue] = useState(100)
    const [click,setClick] = useState(null)
  

    useEffect(() => {
        if (value > 0) {
            axiosSecure.post('/create-payment-intent', { price: value })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, value]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || "anonymous",
                name: formData.name || user?.displayName || "anonymous",
                address: {
                    state: formData.state,
                    country: formData.country
                },
                phone: formData.phone
            }
        });

        if (error) {
            setErrer(error.message);
        } else {
            setErrer('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: formData.name || user?.displayName || "anonymous",
                    address: {
                        state: formData.state,
                        country: formData.country
                    },
                    phone: formData.phone
                }
            }
        });

        if (confirmError) {
            setErrer(confirmError.message);
        } else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: value,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                };
                const res = await axiosSecure.post('/payments', payment);
                console.log(res)
                if (res.data?.matchedCount > 0) {
                    await Swal.fire({
                        title: "Congratulations!",
                        text: "Payment successfully done",
                        icon: "success"
                    });
                    navigate('/dashboard/myProfile');
                }
            }
        }
    };
    const handleCupon = async (e) => {
        e.preventDefault();
        const coupon = e.target.coupon.value;
        console.log(coupon);
        if (cupons[0].cupon === coupon) {
            
            const value1= value- cupons[0].discout
                console.log( value1)
                setValue(value1)
                setClick(true)
            
        }
        e.target.reset(); 
    }
    return (
        <div className='flex flex-col lg:flex-row'>
           
            <div className=" w-full lg:w-1/2 flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className='bg-white p-8 mb-4 rounded-md shadow-lg m-5ba' >
                <h1 className='text-blue-400'>You have to give <span className='text-red-400'>${value}</span></h1>
            </div>
                <form action="" onSubmit={handleCupon} className=" mt-0bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                  
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Give Coupon</h2>
                    <div className="mb-4">
                       {
                        value <100 &&  <h1 className='text-center font-thin' >Coupon is applied <del  className='text-center text-green-500 font-bold' >{cupons[0].cupon}</del></h1>
                       }
                        <label htmlFor="coupon" className="block text-gray-700 font-semibold mb-2">Coupon Code</label>
                        <input
                            type="text"
                            id="coupon"
                            name='coupon'
                            disabled={click}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter coupon code"
                        />
                    </div>
                    {!click &&<button
                        type="submit"
                      
                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Submit
                    </button>}
                    {click &&<button
                        type="submit"
                      
                        className="w-full bg-blue-500 btn-disabled text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Submit
                    </button>}
                </form>
            </div>
            <form onSubmit={handleSubmit} className='border w-full lg:w-1/2 m-auto mt-12 lg:mt-44 ml-1 lg:mr-10 p-8 bg-white rounded-lg shadow-md'>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Payment Information</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your state"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your country"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                    />
                </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm bg-primary text-white my-5 w-full' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className='text-red-400 text-center'>
                    {err}
                </p>
                {
                    transactionId && <p className='text-green-400 text-center'>
                        Your transaction id: {transactionId}
                    </p>
                }
            </form>
        </div>
    );
};

export default CheckOutForm;




// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// const CheckOutForm = () => {
//     const [clientSecret, setClientSecret] = useState('')
//     const [err, setErrer] = useState('')
//     const [transactionId, setTransactionId] = useState('')
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure()

//     const { user } = useAuth()


//     const navigate = useNavigate()
//     const totalPrice = 100;
//     // console.log(cart)


//     useEffect(() => {
//         if (totalPrice > 0) {
//             axiosSecure.post('/create-payment-intent', { price: totalPrice })
//                 .then(res => {
//                     console.log(res.data.clientSecret)
//                     setClientSecret(res.data.clientSecret)
//                 })

//         }

//     }, [axiosSecure, totalPrice])

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         //invalid
//         if (!stripe || !elements) {
//             return;
//         }
//         //finding card 
//         const card = elements.getElement(CardElement);
//         if (card == null) {
//             return;
//         }

//         // Use your card Element with other Stripe.js APIs
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card,
//         });

//         if (error) {
//             console.log('[error]', error);
//             setErrer(error.message)
//         } else {
//             console.log('[PaymentMethod]', paymentMethod);
//             setErrer('')
//         }

//         //confirm payment

//         const { paymentIntent, error: conformError } = await stripe.confirmCardPayment(
//             clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user?.email || "anonymous",
//                     name: user?.displayName || "anonymous"
//                 }
//             }
//         }
//         )
//         if (conformError) {
//             console.log('confirm error')
//         } else {
//             console.log('paymentIntent ', paymentIntent)
//             if (paymentIntent.status == "succeeded") {
//                 console.log('transaction id', paymentIntent.id)
//                 setTransactionId(paymentIntent.id)

//                 // now save the payment in the databse
//                 const payment = {
//                     email: user.email,
//                     price: totalPrice,
//                     transactionId: paymentIntent.id,
//                     date: new Date(),// utc date convert . user moment js


//                 }
//                 const res = await axiosSecure.post('/payments', payment)
//                 console.log("payment saved", res.data)

//                 //    if(res.data?.paymentResult?.insertedId){
//                 if (res.data?.matchedCount > 0) {
//                     await Swal.fire({
//                         title: "Congratulation!",
//                         text: "Payment successfully done",
//                         icon: "success"
//                     });
//                     // navigate('/dashboard/paymentHistory')
//                 }
//             }
//         }

//     }
//     return (
//         <div className='flex flex-col lg:flex-row'>
//             <div className="w-1/2 flex justify-center items-center min-h-screen bg-gray-100">
//                 <form action="" className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                     <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Give Coupon</h2>
//                     <div className="mb-4">
//                         <label htmlFor="coupon" className="block text-gray-700 font-semibold mb-2">Coupon Code</label>
//                         <input
//                             type="text"
//                             id="coupon"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter coupon code"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                         Submit
//                     </button>
//                 </form>
//             </div>
//             <form onSubmit={handleSubmit} className='border w-1/2 m-auto mt-44'>
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                 />
//                 <button className='btn btn-sm bg-primary text-white my-5' type="submit" disabled={!stripe || !clientSecret}>
//                     Pay
//                 </button>
//                 <p className='text-red-400 text-center'>
//                     {err}

//                 </p>
//                 {
//                     transactionId && <p className='text-green-400 text-center'>
//                         Your transaction id :{transactionId}

//                     </p>
//                 }
//             </form>
//         </div>
//     );
// };

// export default CheckOutForm;