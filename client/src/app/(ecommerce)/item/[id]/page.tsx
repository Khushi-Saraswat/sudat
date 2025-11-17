"use client";
import ProductCard from '@/components/cards/ProductCard';
import RatingAndReview from '@/components/ratingAndreview/RatingAndReview';
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

// ----- Types -----
interface Product {
  _id: string;
  title?: string;
  sku?: string;
  price: number;
  images?: { url: string }[];
  sizes?: string[];
  thumbnail?: string;
}

// ----- API Calls -----
const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`http://localhost:5000/api/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:5000/api/product");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// ----- Accordion Sections -----
type Section = 'specifications' | 'description' | 'returnPolicy' | 'manufacturer' | 'offers';

const ProductPage = ({ productId }: { productId: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
    specifications: true,
    description: false,
    returnPolicy: false,
    manufacturer: false,
    offers: false
  });

  const rightContentRef = useRef<HTMLDivElement>(null);

  // ----- React Query -----
  const { data: product, isLoading: productLoading, error: productError } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  const { data: recommendedProducts, isLoading: recommendedLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const toggleSection = (section: Section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // ----- Loading/Error -----
  if (productLoading) return <div className="p-10">Loading product...</div>;
  if (productError || !product) return <div className="p-10 text-red-500">Error loading product.</div>;

  // ----- Use only API data -----
  const productImages = product.images?.map(img => img.url) || [];
  const sizes = product.sizes || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 lg:px-8 py-3 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="hover:text-gray-700 cursor-pointer">Shirts</span>
        <span className="mx-2">›</span>
        <span className="text-gray-400">{product.title}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-4 md:px-6 lg:px-8 pb-6">
        {/* Left - Product Images */}
        <div className="w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row lg:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-4 h-full">
            {/* Thumbnail Images */}
            {productImages.length > 0 && (
              <div className="flex md:flex-col lg:flex-col space-x-3 md:space-x-0 md:space-y-3 lg:space-y-3 w-full md:w-20 lg:w-20 overflow-x-auto md:overflow-x-visible lg:overflow-x-visible">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === index ? 'border-gray-400' : 'border-gray-200'}`}
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
            )}

            {/* Main Image */}
            {productImages[selectedImage] && (
              <div className="flex-1 relative">
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold z-10">
                  NEW ARRIVAL
                </div>
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-96 lg:h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div ref={rightContentRef} className="w-full lg:w-1/2 lg:pl-6">
          <div className="space-y-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-2">SKU: {product.sku || 'N/A'}</p>
            <div className="mb-4">
              <span className="text-2xl md:text-2xl font-bold text-gray-800">₹{product.price}</span>
              <p className="text-green-600 text-sm mt-1">Inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${selectedSize === size ? 'border-gray-900 text-gray-900 bg-gray-50' : 'border-gray-300 text-gray-700 hover:border-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quantity</h3>
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
            </div>
          </div>
        </div>
      </div>

      <RatingAndReview />

      {/* Recommended Products */}
      {recommendedProducts && recommendedProducts.length > 0 && (
        <div className='md:p-20 w-full'>
          <h1 className='text-slate-700 font-semibold text-center mb-10 text-xl'>Recommended Products</h1>
          <div className='flex items-center lg:gap-5 flex-wrap w-full justify-center pb-20'>
            {recommendedProducts.map((item) => (
              <ProductCard
                key={item._id}
                image={item.thumbnail}
                title={item.title}
                price={item.price}
                onViewDetails={() => console.log("View product", item._id)}
                onWishlist={() => console.log("Wishlist", item._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
