"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, X, Plus, Minus } from 'lucide-react';
import ProductCard from '@/components/cards/ProductCard';
import RatingAndReview from '@/components/ratingAndreview/RatingAndReview';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    specifications: true,
    description: false,
    returnPolicy: false,
    manufacturer: false,
    offers: false
  });

  const rightContentRef = useRef(null);


  const productImages = [
    "/home/jackets.avif",
    "/home/shirt.avif",
    "/home/tshirt.avif",
    "/home/bottom.avif",
    "/home/coorders.avif",
  ];


  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];



  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 lg:px-8 py-3 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="hover:text-gray-700 cursor-pointer">Shirts</span>
        <span className="mx-2">›</span>
        <span className="text-gray-400">Lavender Slub Textured Shirt</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-4 md:px-6 lg:px-8 pb-6">
        {/* Left Sidebar - Product Images */}
        <div

          className={`w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden'`}
        >
          <div className="flex flex-col-reverse md:flex-row lg:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-4 h-full">
            {/* Thumbnail Images */}
            <div className="flex md:flex-col lg:flex-col space-x-3 md:space-x-0 md:space-y-3 lg:space-y-3 w-full md:w-20 lg:w-20 overflow-x-auto md:overflow-x-visible lg:overflow-x-visible">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === index ? 'border-gray-400' : 'border-gray-200'
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-16 h-20 md:w-full md:h-20 lg:w-full lg:h-20 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold z-10">
                NEW ARRIVAL
              </div>
              <img
                src={productImages[selectedImage]}
                alt="Main product"
                className="w-full h-96 lg:h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Content - Product Details */}
        <div ref={rightContentRef} className="w-full lg:w-1/2 lg:pl-6">
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2">
                Lavender Slub Textured Shirt
              </h1>
              <p className="text-gray-500 text-sm mb-2">SKU: 1379721</p>

              <div className="mb-4">
                <span className="text-2xl md:text-2xl font-bold text-gray-800">₹1299</span>
                <p className="text-green-600 text-sm mt-1">Inclusive of all taxes</p>
              </div>

              <div className="bg-white border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start text-gray-800">``
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">%</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Get this for <span className="font-bold">INR 1,199</span></p>
                    <p className="text-gray-600">Buy 2 and get Rs 200 Off*</p>
                    <p className="text-gray-600">Code: <span className="font-semibold text-gray-800">B2G200</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Styles */}

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Select Size</h3>
                <button className="text-red-500 text-sm font-medium hover:underline">Size Chart</button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={size === '3XL'}
                    className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${size === '3XL'
                        ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed'
                        : selectedSize === size
                          ? 'border-gray-900 text-gray-900 bg-gray-50'
                          : 'border-gray-300 text-gray-700 hover:border-gray-500'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">The model (height 5'11") is wearing a size M</p>
            </div>

            {/* Delivery Options */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Options</h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="282002"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors">
                  CHECK
                </button>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Please enter the PIN code to check cash/card delivery available.</p>
                <p>Return and Exchange will be available for 7 days from the date of order delivery.</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-800">Get it by Thu,31 Jul</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-800">Card/Cash on delivery is also available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-800">Return is available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* More Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">More Details</h3>

              {/* Specifications */}
              <div className="border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => toggleSection('specifications')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Specifications</h4>
                    <p className="text-sm text-gray-500">Technical details and features</p>
                  </div>
                  <span className="text-xl text-gray-400">
                    {expandedSections.specifications ? '−' : '+'}
                  </span>
                </button>
                {expandedSections.specifications && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500">Fit</span>
                          <p className="text-gray-900">Regular Fit</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Sleeves</span>
                          <p className="text-gray-900">Full Sleeves</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Collar</span>
                          <p className="text-gray-900">Spread Collar</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500">Occasion</span>
                          <p className="text-gray-900">Casual</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Fabric</span>
                          <p className="text-gray-900">100% Polyester</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p className="text-sm text-gray-500">Product overview</p>
                  </div>
                  <span className="text-xl text-gray-400">
                    {expandedSections.description ? '−' : '+'}
                  </span>
                </button>
                {expandedSections.description && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mt-4">
                      This lavender slub textured shirt features a premium cotton blend fabric with a subtle slub texture that adds visual interest and depth. The regular fit ensures comfort while maintaining a polished appearance. Perfect for casual occasions, this shirt can be paired with jeans or chinos for a versatile look.
                    </p>
                  </div>
                )}
              </div>

              {/* Return & Refund Policy */}
              <div className="border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => toggleSection('returnPolicy')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Return & refund policy</h4>
                    <p className="text-sm text-gray-500">Return and refund policies</p>
                  </div>
                  <span className="text-xl text-gray-400">
                    {expandedSections.returnPolicy ? '−' : '+'}
                  </span>
                </button>
                {expandedSections.returnPolicy && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="text-sm text-gray-700 mt-4 space-y-2">
                      <p>• 7-day return policy from date of delivery</p>
                      <p>• Product must be in original condition with tags</p>
                      <p>• Free return pickup available</p>
                      <p>• Refund will be processed within 3-5 business days</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Manufactured By */}
              <div className="border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => toggleSection('manufacturer')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Manufactured By</h4>
                    <p className="text-sm text-gray-500">Company and Manufacturer Information</p>
                  </div>
                  <span className="text-xl text-gray-400">
                    {expandedSections.manufacturer ? '−' : '+'}
                  </span>
                </button>
                {expandedSections.manufacturer && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="text-sm text-gray-700 mt-4">
                      <p><strong>PowerLook Fashion Pvt. Ltd.</strong></p>
                      <p>Address: 123 Fashion Street, Mumbai, Maharashtra 400001</p>
                      <p>Contact: +91 9876543210</p>
                      <p>Email: info@powerlook.com</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Save extra with Offers */}
              <div className="border border-gray-200 rounded-lg mb-6">
                <button
                  onClick={() => toggleSection('offers')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">Save extra with Offers</h4>
                    <p className="text-sm text-gray-500">Get the best discounts and offers on credit cards</p>
                  </div>
                  <span className="text-xl text-gray-400">
                    {expandedSections.offers ? '−' : '+'}
                  </span>
                </button>
                {expandedSections.offers && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="text-sm text-gray-700 mt-4 space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs">%</span>
                        </div>
                        <div>
                          <p className="font-medium">HDFC Bank Credit Card</p>
                          <p className="text-gray-600">Get 10% instant discount up to ₹500</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs">₹</span>
                        </div>
                        <div>
                          <p className="font-medium">Paytm Wallet</p>
                          <p className="text-gray-600">Get ₹50 cashback on orders above ₹999</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RatingAndReview />
      <div className='md:p-20 w-full'>
        <h1 className=' text-slate-700 font-semibold text-center mb-10 text-xl'>Recommended Products</h1>
        <div className='flex items-center lg:gap-5 flex-wrap w-full justify-center pb-20'>
          {[1, 2, 3, 4, 5, 2, 2, 2, 2].map((item, idx) => (
            <ProductCard key={idx} />
          ))}
        </div>


      </div>
    </div>
  );
};

export default ProductPage;