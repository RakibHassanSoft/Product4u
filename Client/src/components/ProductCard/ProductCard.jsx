import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const { _id, name, image, description, tags, upvote_count, external_links } = product;
    return (
        <div className='p-3 flex gap-4 bg-[#3FD2C7] bg-opacity-50 border rounded-sm w-full'>
            {/* image part  */}
            <div className=' mb-2'>
                <div className='absolute bg-white p-1 rounded-lg'>
                    <h1>{upvote_count}</h1>
                </div>
                <img className='h-28 w-28' src={image} alt="" />

            </div>
            <div className='bg-[#00458B]
  bg-opacity-70 w-full text-white p-3'>
                <Link to={`/products/details/${_id}`} className='text-xl font-bold'>{name}</Link> <br />
                <div className='flex justify-between'>
                    <h1>Tag:</h1>
                    <div className='flex justify-evenly gap-3'>
                        {
                            tags.map((tag, index) => <p key={index}>{tag}</p>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;
