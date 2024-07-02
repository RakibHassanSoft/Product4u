import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import Adds from '../Home/Adds/Adds';
import Pagination from '../../components/Pagination/Pagination';

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [isLoading, products] = useProducts();  // Custom hook to fetch products and manage loading state
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInput = useRef(null);
    const [clickedSuggestion, setClickedSuggestion] = useState('');
    //  console.log(filteredProducts)
    // useEffect to update filteredProducts when products change
    useEffect(() => {
        // Only update filteredProducts if products has been loaded
        if (products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

    const handleSearch = () => {
        const query = searchInput.current.value.toLowerCase().trim();
        setSearchTerm(query);
        if (query === '') {
            setFilteredProducts(products);
        } else {
            const filteredData = products.filter(product =>
                product.tags.some(tag => tag.toLowerCase().includes(query))
            );
            setFilteredProducts(filteredData);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        searchInput.current.value = suggestion;
        setClickedSuggestion(suggestion); // Track the clicked suggestion
        handleSearch();
    };

    // Generate suggestions based on filtered products and search term
    const suggestions = filteredProducts.reduce((acc, curr) => {
        curr.tags.forEach(tag => {
            if (tag.toLowerCase().includes(searchTerm.toLowerCase()) && !acc.includes(tag)) {
                acc.push(tag);
            }
        });
        return acc;
    }, []);

    // Filter out the clicked suggestion from suggestions list
    const filteredSuggestions = suggestions.filter(suggestion => suggestion !== clickedSuggestion);



    const data = {
        users: [
          {
            id: 1,
            name: 'John Doe',
            items: [
              'Item 1',
              'Item 2',
              'Item 3'
            ]
          },
          {
            id: 2,
            name: 'Jane Smith',
            items: [
              'Item 4',
              'Item 5',
              'Item 6'
            ]
          },
          {
            id: 3,
            name: 'Jane Smith',
            items: [
              'Item 4',
              'Item 5',
              'Item 6'
            ]
          },
          {
            id: 3,
            name: 'Jane Smith',
            items: [
              'Item 4',
              'Item 5',
              'Item 6'
            ]
          },
          {
            id: 3,
            name: 'Jane Smith',
            items: [
              'Item 4',
              'Item 5',
              'Item 6'
            ]
          },
          // Add more users as needed
        ]
      };
      
    return (
      <div>

        <div className="bg-[url('https://i.ibb.co/HpqzNGr/pexels-pixabay-259698.jpg')] bg-fixed bg-cover p-5 mb-44 pt-44 pb-64" style={{ minHeight: '43rem' }}>


            <div className="flex justify-center mb-6">
                <input
                    ref={searchInput}
                    type="text"
                    placeholder="Search by tags..."
                    className="px-4 py-2 rounded-md text-blue-500 text-center"
                    onChange={handleSearch}
                />
            </div>
            {searchTerm && filteredSuggestions.length > 0 && (
                <div className="flex justify-center mb-4">
                    {filteredSuggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-1"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
            {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
            </div> */}
             <div>
                <Pagination itemsPerPage={6} data={filteredProducts}></Pagination>
            </div>

        </div>
        <div>
                <Adds></Adds>
            </div>
           

      </div>
    );
};

export default Products;
