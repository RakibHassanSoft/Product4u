import React from 'react';
import { Link } from 'react-router-dom';

const TrandingCard = ({ item,title }) => {
    const [hovered, setHovered] = React.useState(false);

    if (!item) {
        // Return skeleton loading UI while data is loading
        return (
            <div className="flex flex-col gap-4 w-full h-96 bg-black bg-opacity-60 rounded-xl">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div
                className="relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img
                    className={`w-full min-h-[27rem] max-h-[27rem] mb-8 object-cover transition-transform ${
                        hovered ? 'scale-110' : ''
                    }`}
                    src={item?.image}
                    alt={item?.name}
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-10">
                    <h1 className="text-2xl font-bold text-white">{item.name}</h1>
                    <p className="text-sm text-gray-200 mt-1">{item.description}</p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
                    <h3 className="text-lg text-blue-600 font-medium">{item.upvote_count} Upvotes</h3>
                </div>
                <p className="text-sm text-gray-500 mt-2">Posted by: {item?.OwnerEmail}</p>
            </div>
            <div className="px-4 py-2">
                <Link to={`/products/details/${item._id}`}>
                    <button className="w-full bg-blue-500 text-white text-lg font-semibold py-2 rounded hover:bg-blue-600 transition duration-300">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TrandingCard;
