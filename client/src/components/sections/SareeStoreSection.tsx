// components/SareeStoreSection.tsx
import Image from 'next/image';

export default function SareeStoreSection() {
  return (
    <div className='px-4 sm:px-6 md:px-10 py-8 md:py-12 bg-gradient-to-b from-white to-rose-50'>
      {/* Header Section */}
      <div className='text-center gap-4 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-serif text-rose-900 mb-2 md:mb-3'>
          THE SAREE STORE
        </h1>
        <p className='text-base sm:text-lg text-zinc-600 font-light tracking-wide px-4'>
          Affordable sarees at lowest prices only at Sudati
        </p>
        <div className='w-16 sm:w-24 h-1 bg-rose-400 mx-auto mt-3 md:mt-4'></div>
      </div>
      
      {/* Gallery Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mt-6 md:mt-8'>
        {/* Left Column - Hidden on mobile, shows on md+ */}
        <div className='hidden md:block'>
          <div className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 h-full'>
            <Image 
              src={'/images/sar1.jpg'} 
              height={350} 
              width={350} 
              alt='Gold Collection Saree' 
              className='group-hover:scale-110 transition-transform duration-700 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
              <div className='absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white'>
                <h3 className='text-xl sm:text-2xl font-serif mb-1 sm:mb-2'>Gold Collection</h3>
                <p className='text-xs sm:text-sm'>Timeless Elegance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Main content for all screens */}
        <div className='flex flex-col gap-4 sm:gap-6 md:col-span-1'>
          <div className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500'>
            <Image 
              src={"/images/sar2.jpg"} 
              height={300} 
              width={500} 
              alt='Essential Collection' 
              className='group-hover:scale-110 transition-transform duration-700 w-full h-auto object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
              <div className='absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white'>
                <h3 className='text-xl sm:text-2xl font-serif mb-1 sm:mb-2'>Essential Collection</h3>
                <p className='text-xs sm:text-sm'>Everyday Grace</p>
              </div>
            </div>
          </div>
          
          <div className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500'>
            <Image 
              src={"/images/sar3.jpg"} 
              height={300} 
              width={500} 
              alt='Premium Collection' 
              className='group-hover:scale-110 transition-transform duration-700 w-full h-auto object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
              <div className='absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white'>
                <h3 className='text-xl sm:text-2xl font-serif mb-1 sm:mb-2'>Premium Collection</h3>
                <p className='text-xs sm:text-sm'>Luxurious Drapes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hidden on mobile, shows on lg+ */}
        <div className='hidden lg:block'>
          <div className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 h-full'>
            <Image 
              src={'/images/sar4.jpg'} 
              height={350} 
              width={350} 
              alt='Designer Saree' 
              className='group-hover:scale-110 transition-transform duration-700 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
              <div className='absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white'>
                <h3 className='text-xl sm:text-2xl font-serif mb-1 sm:mb-2'>Designer Range</h3>
                <p className='text-xs sm:text-sm'>Curated Perfection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}