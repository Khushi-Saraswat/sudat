import ExploreCategoryCard from "./ExploreCategoryCard";


export default function SareeCategorySection() {
  const categories = [
    {
      url: "/images/banarsi.webp",
      title: "Banarasi",
      description: "Timeless elegance woven in silk",
      gradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      url: "/images/baluchari.jpg",
      title: "Baluchari",
      description: "Stories woven in every thread",
      gradient: "from-amber-600/20 to-red-600/20"
    },
    {
      url: "/images/kanjeevaram.jpg",
      title: "Kanjivaram",
      description: "South Indian silk heritage",
      gradient: "from-emerald-600/20 to-teal-600/20"
    },
    {
      url: "/images/paithani.jpg",
      title: "Paithani",
      description: "Maharashtrian artistry at its finest",
      gradient: "from-fuchsia-600/20 to-purple-600/20"
    },
    {
      url: "/images/bhandhni.webp",
      title: "Bandhani",
      description: "Vibrant tie-dye traditions",
      gradient: "from-rose-600/20 to-orange-600/20"
    },
    {
      url: "/images/chanderi.jpg",
      title: "Chanderi",
      description: "Sheer elegance from Madhya Pradesh",
      gradient: "from-blue-600/20 to-indigo-600/20"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/30 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest bg-amber-50 px-6 py-2 rounded-full">
              Heritage Collection
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Explore Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600"> Exquisite </span>
            Categories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the finest handcrafted sarees from across India, each telling a unique story of tradition and craftsmanship
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((item, index) => (
            <ExploreCategoryCard
              key={index} 
              url={item.url} 
              title={item.title}
              description={item.description}
              gradient={item.gradient}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="group bg-gradient-to-r from-amber-600 to-rose-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            View All Collections
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}