import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaCartArrowDown, FaCartPlus, FaCircleDollarToSlot, FaItunes, FaList, FaProductHunt, FaUser, FaUsers } from "react-icons/fa6";
import { FcStatistics } from 'react-icons/fc';
import { MdContentPaste } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import useAuth from '../../../hooks/useAuth';
import useSingleUserByEmail from '../../../hooks/useSingleUserByEmail';
const Dashboard = () => {
    const {user, loading} = useAuth()
    const [ isLoading, refetch, db_user ] = useSingleUserByEmail()
    // console.log(db_user)
   
    return (
        <div>
            {
                user && <>
                    <div className='flex '>

                        <div className='w-64 min-h-screen bg-[#99DDFF] text-white pl-4 space-y-2 pt-5 pr-5 '>
                            <div className='flex flex-row md:flex-col  lg:flex-col justify-center items-center'>
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>

                                <h1 className='mt-2'>{user?.displayName}</h1>

                            </div>
                            <h1 className='text-2xl text-center font-bold'>Dashboard</h1>
                            {
                                 db_user.user_Status === 'admin' && <div className='flex flex-col space-y-2' >


                                    <Link to='manageCupons' className='flex items-center  gap-2'><FaCircleDollarToSlot /><h1>
                                        ManageCupons</h1></Link>
                                    <Link className='flex items-center gap-2' to='manageUsers'><FaUsers></FaUsers><h1>ManageUsers</h1></Link>
                                    <Link className='flex items-center gap-2' to='statistics'><FcStatistics ></FcStatistics><h1>Statistics</h1></Link>
                                    <Link className='flex items-center gap-2' to='adminHome'><FaUser></FaUser><h1>Admin Home</h1></Link>


                                </div>
                            }
                            {
                                 db_user.user_Status === 'user' && <div className='flex flex-col space-y-2' >

                                    <Link className='flex items-center gap-2' to='myProfile'><FaUser></FaUser><h1>MyProfile</h1></Link>
                                    <Link className='flex items-center gap-2' to='addProduct'><FaCartPlus></FaCartPlus><h1>AddProduct</h1></Link>
                                    <Link className='flex items-center gap-2' to='myProduct'><FaCartArrowDown></FaCartArrowDown><h1>MyProducts</h1></Link>

                                </div>
                            }
                            {
                                  db_user.user_Status === 'moderoator' && <div className='flex flex-col space-y-2' >

                                    <Link className='flex items-center gap-2' to='productReviewQueue'>!!!<h1>Product Review Queue</h1></Link>
                                    <Link className='flex items-center gap-2' to='reportedContents'><MdContentPaste ></MdContentPaste> <h1>Reported Contents</h1></Link>


                                </div>
                            }

                            <div className="divider space-y-2">OR</div>
                            <div>
                                <Link to='/'><h1>Home</h1></Link>
                                <Link to='/products'><h1>products</h1></Link>
                            </div>
                        </div>

                        <div className='w-full'>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </>
            }
            {
                loading &&
                <div className="min-h-screen py-4 rounded shadow-md w-50 sm:w-80 animate-pulse  dark:bg-gray-50 ">
                    <div className="flex flex-col justify-center  p-4  sm:px-8">
                        <div className="flex-col items-center w-28 h-28 rounded-full dark:bg-gray-300"></div>
                        <div className="flex-1 py-2 space-y-4">
                            <div className="w-2/3 h-3 rounded dark:bg-gray-300"></div>
                            <div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 sm:px-8">
                    <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                      <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                        <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                    </div>
                    <div className="p-4 space-y-4 sm:px-8">
                        <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                        <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                        <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                    </div>
                    <div className="p-1   ml-8 w-3/4 h-4  divider rounded dark:bg-gray-300"></div>
                    <div className="p-4 space-y-4 sm:px-8">
                        <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                        <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                        <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                    </div>
                   
                </div>
            }
        </div>
    );
};

export default Dashboard;