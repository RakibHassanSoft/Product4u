import React from 'react';

import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import CheckOutForm from './ChckOutForm';
import ChckOutForm from './ChckOutForm';

  
const Payment = () => {
    //TODO: Add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key)
    return (
        <div>
            
            <div>
                <Elements stripe={stripePromise}>
                    <ChckOutForm></ChckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;