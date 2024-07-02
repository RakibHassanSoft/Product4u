import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const ReportedContents = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, refetch, data: reports = {} } = useQuery({
        queryKey: ['reports'], // Include id in the queryKey to make it unique per product
        queryFn: async () => {

            const res = await axiosPublic.get(`/allReports`);
            return res.data;



        }
    });
    // console.log(reports)
    const deleteReport = async (id) => {
        // console.log(id);
        try {
            const res = await axiosPublic.delete(`/allUserReports/${id}`);
            // console.log(res.data);

            if(res.data.deletedCount > 0){
                alert("successfullly done")
            }
            refetch(); 
        } catch (error) {
            console.error("Error deleting review:", error); 
        }
    };
    return (
        <div>
            <div>
                <h1 className='text-center mt-10 text-3xl font-serif w-4/12 m-auto border p-7 rounded-lg shadow-md border-blue-400'>Reports of users</h1>
            </div>
            <div className='mt-10'>
                <div className="w-1/2 m-auto">
                    {
                        isLoading && <>
                             <h1 className='text-3xl text-center mt-44 font-bold text-blue-400'>Loading.........</h1>
                        </>
                    }
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th> Product Name</th>
                                <th>Details </th>
                                <th>Delete </th>

                            </tr>
                        </thead>

                        <tbody>


                            {
                                reports.length > 0 && reports.map((report, index) =>
                                    <tr key={report._id}>
                                        <th>
                                            #
                                        </th>
                                        <td>
                                            {report?.name}
                                        </td>
                                        <th>
                                            <Link to={`/products/details/${report._id}`} className="btn btn-ghost btn-xs">details</Link>
                                        </th>

                                        <th>
                                            <button onClick={() => deleteReport(report._id)} className="btn btn-ghost btn-xs">Delete</button>
                                        </th>
                                    </tr>
                                )
                            }



                        </tbody>
                     

                    </table>
                    {
                             reports.length === 0 && <h1 className='text-center text-green-400 text-2xl mt-5 '> No reports</h1>
                        }

                </div>
            </div>
        </div>
    );
};

export default ReportedContents;