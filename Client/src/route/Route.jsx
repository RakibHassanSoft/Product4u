import {
    createBrowserRouter,
  }from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import Login from '../pages/Login/Login'
import Registration from '../pages/Registration/Registration'
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import ManageCupons from '../pages/Dashboard/Admin/ManageCupons/ManageCupons'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers'
import Statistics from '../pages/Dashboard/Admin/Statistics/Statistics'
import AddProduct from '../pages/Dashboard/User/AddProduct/AddProduct'
import MyProfile from '../pages/Dashboard/User/MyProfile/MyProfile'
import MyProduct from '../pages/Dashboard/User/MyProduct/MyProduct'
import ProductReviewQueue from '../pages/Dashboard/Moderator/ProductReviewQueue/ProductReviewQueue'
import ReportedContents from '../pages/Dashboard/Moderator/ReportedContents/ReportedContents'
import Products from "../pages/Products/Products";
import PrivetRoute from "./PrivetRoute";
import UpdateProduct from "../pages/Shared/UpdateProduct/UpdateProduct";
import Details from "../pages/Details/Details";
import Home from "../pages/Home/Home/Home";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from './ModeratorRoute'
import Error from "../pages/Error/Error";
 export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/products',
          element:<Products></Products>
        },
        {
          path:'/products/details/:id',
          element:<PrivetRoute><Details></Details></PrivetRoute>
        },
        {
          path:'/login',
          element:<Login></Login>,
        },
        {
          path:'/register',
          element:<Registration></Registration>
        },
        {
          path:'/updateProduct/:id',
          element:<PrivetRoute><UpdateProduct></UpdateProduct></PrivetRoute>
        },
        
      ]
    },
    {
      
        path:"dashboard",
        element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
        children:[
          //admin 
          {
            path:'manageCupons',
            // element:<ManageCupons></ManageCupons>
            element:<AdminRoute><ManageCupons></ManageCupons></AdminRoute>
          },
          {
            path:'adminHome',
            // element:<AdminHome></AdminHome>
            element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
          },
        
          {
            path:'manageUsers',
            // element:<ManageUsers>  </ManageUsers>
            element:<AdminRoute><ManageUsers>  </ManageUsers></AdminRoute>
          },
        
          {
            path:'statistics',
            // element:<Statistics></Statistics>
            element:<AdminRoute><Statistics></Statistics></AdminRoute>
          },
          //user
         
        
          {
            path:'payment',
            element:<PrivetRoute><Payment></Payment></PrivetRoute>
          },
          {
            path:'myProfile',
            element:<MyProfile></MyProfile>
          },
          {
            path:'addProduct',
            element:<PrivetRoute><AddProduct></AddProduct></PrivetRoute>
          },
        
          {
            path:'myProduct',
            element:<PrivetRoute><MyProduct></MyProduct></PrivetRoute>
          },


          
          //mederator
          {
            path:'productReviewQueue',
            element:<ModeratorRoute><ProductReviewQueue></ProductReviewQueue></ModeratorRoute>
          },
          {
            path:'reportedContents',
            element:<ModeratorRoute><ReportedContents></ReportedContents></ModeratorRoute>
          },
          {
            path:'myProduct/updateProduct/:id',
            element:<PrivetRoute><UpdateProduct></UpdateProduct></PrivetRoute>,
          },
          

        ]
      

    }
  ]);

