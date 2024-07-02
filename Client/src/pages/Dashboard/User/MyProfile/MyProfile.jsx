import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import useSingleUserByEmail from '../../../../hooks/useSingleUserByEmail';

const MyProfile = () => {
    const { user } = useAuth();
    const [isLoading, refetch, db_user] = useSingleUserByEmail();

    const isSubscribed = !!db_user?.transactionId; // Check if user is subscribed

    return (
        <div className='mt-20 border m-auto p-4 bg-gray-100 min-h-screen'>
            <div className='flex justify-center items-center mb-6'>
                <img className='w-32 h-32 rounded-full' src={user?.photoURL} alt="Profile" />
            </div>
            <form className='bg-white w-full md:max-w-md m-auto p-6 rounded-lg shadow-lg'>
                <div className='flex flex-col md:flex-row gap-4 justify-center'>
                    <div className='flex-1'>
                        <label className='text-gray-700'>Name</label>
                        <input className='bg-gray-200 h-12 px-3 rounded-md mt-1 w-full' type="text" disabled value={user?.displayName} />
                    </div>
                    <div className='flex-1'>
                        <label className='text-gray-700'>Email</label>
                        <input className='bg-gray-200 h-12 px-3 rounded-md mt-1 w-full' type="text" disabled value={user?.email} />
                    </div>
                </div>
               <div>
                
               </div>
                <div className='flex flex-col md:flex-row gap-4 justify-center mt-6'>
                    <div className='flex-1'>
                        {!isSubscribed ? (
                            <Link to='/dashboard/payment' className='btn bg-blue-500 text-white py-2 rounded-md text-center block w-full'>100$</Link>
                        ) : (
                            <button disabled className='btn bg-gray-400 text-white py-2 rounded-md text-center block w-full cursor-not-allowed'>Verified</button>
                        )}
                    </div>
                    <div className={`flex-1 bg-${isSubscribed ? 'green-500' : 'gray-400'} py-2 px-4 rounded-md text-white text-center mt-6 md:mt-0`}>
                        <h1>{isSubscribed ? 'Member' : 'Not a member'}</h1>
                    </div>
                    {db_user?.date && (
                        <div className='flex-1 bg-green-500 py-2 px-4 rounded-md text-white text-center mt-6 md:mt-0'>
                            <h1>Date: {db_user.date.slice(0, 10)}</h1>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MyProfile;



















// import React from 'react';
// import useAuth from '../../../../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import useSingleUserByEmail from '../../../../hooks/useSingleUserByEmail';

// const MyProfile = () => {
//     const { user } = useAuth();
//     // console.log(user)

//     const  [ isLoading, refetch, db_user] = useSingleUserByEmail();
//     console.log(db_user)


//     const subscrib = false;

//     return (
//         <div className='mt-20 border m-auto p-4 bg-yellow-300 min-h-screen'>
//             <div className='flex justify-center items-center'>
//                 <img className='w-2/6 rounded-lg' src={user?.photoURL} alt="" />
//             </div>
//             <form className='bg-blue-100 w-1/3 m-auto mt-5 p-6 rounded-xl'>
//                 <div className='flex gap-4 justify-center'>
//                     <div>
//                         <label htmlFor=""> Name</label><br />
//                         <input className='bg-white h-12 pl-3' type="text" disabled placeholder={user?.displayName} />
//                     </div>
//                     <div>
//                         <label htmlFor=""> Email</label><br />
//                         <input className='bg-white h-12 pl-3' type="text" disabled placeholder={user?.email} />
//                     </div>
//                 </div>

//                 <div className='flex gap-4 justify-center'>
//                     <div className='text-2xl p-2 text-white m-auto rounded-md text-center'>
//                         {!db_user?.transactionId  ? (
//                             <Link to='/dashboard/payment' className='btn bg-blue-700 text-center text-white mt-10'>Subscribe</Link>
//                         ) : (
//                             <button disabled className='btn bg-blue-700 text-center text-white mt-10'>Subscribe</button>
//                         )}
//                     </div>
//                     <div className='text-2xl bg-green-500 pt-1 pb-1 pl-2 pr-2 mt-12 text-white m-auto rounded-md text-center'>
//                         <h1 className='text-center'>{db_user?.transactionId ?"Member":"Not member"}</h1>
                        
//                     </div>
//                    {db_user?.date && <div className='text-2xl bg-green-500 pt-1 pb-1 pl-2 pr-2 mt-12 text-white m-auto rounded-md text-center'>
//                         <h1 className='text-center'>Date:{db_user?.date &&` ${db_user.date.slice(0, 10)}`}</h1>
                        
//                     </div>}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default MyProfile;
