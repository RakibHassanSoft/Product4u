import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { isLoading, refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const handleModerator = async (id) => {
        try {
            const res = await axiosPublic.put(`/updateTomodetrator/${id}`);
            if (res.data.matchedCount > 0) {
                // alert("User has been updated to Moderator successfully");
                await Swal.fire({
                    title: "Congratulations",
                    text: "User has been updated to Moderator successfully",
                    icon: "success"
                });
                refetch();
            }
        } catch (error) {
            console.error("Error updating to moderator:", error);
        }
    };

    const handleAdmin = async (id) => {
        try {
            const res = await axiosPublic.put(`/updateAdmin/${id}`);
            if (res.data.matchedCount > 0) {
                await Swal.fire({
                    title: "Congratulations",
                    text: "User has been updated to Admin successfully",
                    icon: "success"
                });
               
                refetch();
            }
        } catch (error) {
            console.error("Error updating to admin:", error);
        }
    };

    const handleUser = async (id) => {
        try {
            const res = await axiosPublic.put(`/updateUser/${id}`);
            if (res.data.matchedCount > 0) {
                alert("User has been updated to User successfully");
                refetch();
            }
        } catch (error) {
            console.error("Error updating to user:", error);
        }
    };

    return (
        <div className='w-8/12 m-auto border p-3'>
            <h1 className='text-3xl text-center mt-10 mb-10 text-green-500 font-bold border p-10 rounded-xl'>Manage Users</h1>

            <div className="overflow-x-auto border">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>User Email</th>
                            <th>Status</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td><h1 className={`font-bold ${user.user_Status === 'admin' ? 'text-red-600' : user.user_Status === 'moderoator' ? 'text-blue-600' : 'text-green-600'}`}>{user.user_Status}</h1></td>
                                    <td>
                                        {user.user_Status !== 'moderoator' && (
                                            <button onClick={() => handleModerator(user._id)} className="btn btn-success btn-xs text-white">Make Moderator</button>
                                        )}
                                    </td>
                                    <td>
                                        {user.user_Status !== 'admin' && (
                                            <button onClick={() => handleAdmin(user._id)} className="btn btn-primary text-white btn-xs">Make Admin</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;






// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosPublic from '../../../../hooks/useAxiosPublic';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';

// const ManageUsers = () => {
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();
//     const { isLoading, refetch, data: users = {} } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {

//             const res = await axiosSecure.get(`/users`);
//             return res.data;

//             console.log(users)

//         }
//     });

//     const handleModeroator = async (id) => {
//         const res = await axiosPublic.put(`/updateTomodetrator/${id}`)
//         refetch()

//         if (res.data.matchedCount > 0) {
//             alert("Sucess")
//         }
//     }
//     const handleAdmin = async (id) => {
//         const res = await axiosPublic.put(`/updateAdmin/${id}`)
//         refetch()
//         if (res.data.matchedCount > 0) {
//             alert("Sucess")
//         }
//     }
//     const handleUser = async (id) => {
//         const res = await axiosPublic.put(`/updateUser/${id}`)
//         refetch()
//         if (res.data.matchedCount > 0) {
//             alert("Sucess")
//         }

//     }
//     return (
//         <div className='w-8/12 m-auto border p-3'>
//             <h1 className='text-3xl text-center mt-10 mb-10 text-green-500 font-bold border p-10 rounded-xl'>Manage User</h1>

//             <div className="overflow-x-auto border">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>
//                                 $
//                             </th>
//                             <th>User Name</th>
//                             <th>User Email</th>
//                             <th>status</th>
//                             <th>user{"<->"}moderoator</th>
//                             <th>Admin{"<->"}moderoator</th>
                         
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users?.length > 0
//                                 ? users.map((user, index) =>
//                                     <tr key={user._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{user.Name}</td>
//                                         <td>{user.Email}</td>
//                                         <td><h1 className='text-green-600  font-bold'>{user.user_Status}</h1></td>

//                                         {/* make admin or moderator */}
//                                         {
//                                             user.user_Status === "user" &&
//                                             <>
//                                                 <td>
//                                                     <button onClick={() => handleModeroator(user._id)} className="btn btn-success btn-xs text-white">Moderoator</button>
//                                                 </td>
//                                                 <td>
//                                                     <button onClick={() => handleAdmin(user._id)} className="btn btn-primary text-white btn-xs">Admin</button>
//                                                 </td>
//                                             </>
//                                         }
//                                         {/* make user or admin */}
//                                         {
//                                             user.user_Status === "moderoator" &&
//                                             <>
//                                                 <td>
//                                                     <button onClick={() => handleUser(user._id)} className="btn btn-info btn-xs text-white">User</button>
//                                                 </td>
//                                                 <td>
//                                                     <button onClick={() => handleAdmin(user._id)} className="btn btn-primary text-white btn-xs">Admin</button>
//                                                 </td>
//                                             </>
//                                         }
//                                         {/* make user or admin */}
//                                         {
//                                             user.user_Status === "admin" &&
//                                             <>
//                                                 <td>
//                                                     <button onClick={() => handleUser(user._id)} className="btn btn-info btn-xs text-white">User</button>
//                                                 </td>
//                                                 <td>
//                                                     <button onClick={() => handleModeroator(user._id)} className="btn btn-success text-white btn-xs">Moderoator</button>
//                                                 </td>
//                                             </>
//                                         }
//                                     </tr>
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6">No data</td>
//                                     </tr>
//                                 )
//                         }
//                     </tbody>


//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;