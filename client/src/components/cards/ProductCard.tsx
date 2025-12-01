
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useUserStore } from '@/stores/user.store';

const ProductCard = ({ 
  id="",
  image = "/home/tshirt.avif",
  title = "Blue Structured Checks..",
  price = 899,
  originalPrice = 1099,
  discount = 18,
  onViewDetails = (id:string) => console.log('View details clicked'),
  onWishlist = () => console.log('Wishlist clicked'),
  className = ""
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
   
  const handleWishlistClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist();
  };

  const handleViewDetails = () => {
    onViewDetails(id);
  };

  return (
    <div onClick={handleViewDetails} className={`bg-white md:w-auto w-1/2  shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden max-w-xs group flex flex-col ${className}`}>
      {/* Image Container - Fixed height */}
      <div className="relative md:h-64 bg-gray-100 overflow-hidden flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <Image
        height={320}
        width={400} 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
        >
          <Heart 
            size={16} 
            className={`transition-all duration-200 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 hover:text-red-400'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium animate-pulse">
            {discount}% off
          </div>
        )}
      </div>

      {/* Content - Flexible height */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-gray-800 font-medium text-sm leading-relaxed hover:text-blue-600 transition-colors duration-200 cursor-pointer line-clamp-2">
            {title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ₹{price}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  ({discount}% off)
                </span>
              </>
            )}
          </div>
        </div>

        {/* View Details Button */}
        {/* <button
          onClick={handleViewDetails}
          className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-md hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-3"
        >
          View Details
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;