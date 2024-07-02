import React, { useContext } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAuth from '../../hooks/useAuth';
import logo from '../../../public/P.png'
const Navbar = () => {
  // const {user } = useContext(AuthContext)
     const {user,logoutUser} = useAuth()
    //  console.log(user)
     const handleLogOut = () => {
      logoutUser()
        
    }
    const list = <>
          <li className=''>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white bg-[#3FD2C7] pl-4 pr-4 pt-2 pb-2 rounded-sm' : 'text-[#00458B]'
            }
          >
            Home
          </NavLink>
        </li>
        <li className=''>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'text-white bg-[#3FD2C7] pl-4 pr-4 pt-2 pb-2 rounded-sm ' : 'text-[#00458B]'
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white bg-[#3FD2C7] pl-4 pr-4 pt-2 pb-2 rounded-sm' : 'text-[#00458B]'
            }
          >
            Item 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white bg-[#3FD2C7] pl-4 pr-4 pt-2 pb-2 rounded-sm' : 'text-[#00458B]'
            }
          >
            Item 2
          </NavLink>
        </li>

    </>
    const list2 = <>
        <li className='text-center text-blue-600' 
          >{user?.displayName}</li>
        <li > <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-nav-active-text bg-nav-active-bg px-3 py-2 rounded'
                : 'text-[#00458B]'
            }
          >Dashboard</NavLink></li>
        <li  ><NavLink
         to="/"
         onClick={handleLogOut}
         className={({ isActive }) =>
           isActive ? 'text-nav-active' : 'text-[#00458B]'
         }
         >Logout</NavLink></li>

    </>
    const list3 = <>
    {
      !user && <>
       <li ><NavLink 
     to="/login"
     className={({ isActive }) =>
       isActive ? 'text-nav-active' : 'text-nav-default'
     }
    >Login</NavLink></li>


    <li ><NavLink 
     to="/register"
     className={({ isActive }) =>
       isActive ? 'text-nav-active' : 'text-nav-default'
     }
    >Register</NavLink></li>
      </>
    }
   
    

</>
    return (
        <div className="navbar fixed z-10 w-[96%] bg-white bg-opacity-60  font-bold pt-0 pb-0 border-b-2">
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="flex flex-col gap-1 dropdown-content mt-3 z-[1]  space-y-0 rounded-box w-32 bg-white border text-left p-3 pl-4 ">
                        {list}
                    </ul>
                </div>
                <Link to='/' className="text-[#00458B] text-4xl font-serif"><img className='h-28' src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-10 px-1 space-x-2 text-lg">
                    {list}
                </ul>
            </div>
            <div className="navbar-end">
            <ul className="flex gap-10 px-1 space-x-2  text-lg">
                {list3}
                </ul>
              {
                user &&
                <div className="dropdown dropdown-end z-10">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-28 rounded-full">
                        <img alt="Photo" src={user?.photoURL} />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 lg:w-52 space-y-2   text-lg">
                   
                   {list2}
                </ul>
            </div>
              }
            </div>
        </div>
    );
};

export default Navbar;