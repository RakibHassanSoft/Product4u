import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const PaginatedList = ({ itemsPerPage, data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages based on the number of items
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'
                        } rounded-lg`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className=" mx-auto ">
            <div className="grid grid-cols-3 gap-4 ">
                {currentData().map((product, index) => (
                    //   <div
                    //     key={index}
                    //     className="p-4 border border-gray-300 rounded-lg shadow-md"
                    //   >
                    //     <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    //     <img src={product.image} alt={product.name} className="w-full h-auto mb-2" />
                    //     <p className="text-gray-600">{product.description}</p>
                    //   </div>
                    // <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    // {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                    // ))}
                    // </div>
                ))}
            </div>
            <div className="flex mx-auto justify-between w-1/3 mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : ''
                        }`}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : ''
                        }`}
                >
                    Next
                </button>
            </div>

            <p className=" text-center text-green-600 bg-white w-1/12 m-auto p-2 rounded-md mt-6">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
};

export default PaginatedList;







