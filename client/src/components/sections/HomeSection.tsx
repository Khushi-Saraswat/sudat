import ProductCard from "../cards/ProductCard";

interface Props {
  products: any[] | null;
  onViewDetails: (id: string) => void;
}

export default function HomeSections({ products, onViewDetails }: Props) {
  return (
    <div className="font-sans">

      {/* ⭐ Beautiful New Arrivals Section */}
      <div className="px-10 md:px-20 py-16 bg-gradient-to-b from-rose-50 via-white to-orange-50">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover the latest and trendiest products
          </p>

          {/* Elegant underline */}
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              image={product.thumbnail.url}
              originalPrice={product.originalPrice}
              discount={product.discountPercentage}
              price={product.price}
              onViewDetails={onViewDetails}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
