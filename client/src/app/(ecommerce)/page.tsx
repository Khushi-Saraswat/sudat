"use client"
import ExploreCategoryCard from '@/components/cards/ExploreCategoryCard'
import ProductCard from '@/components/cards/ProductCard'
import HeroCarousel from '@/components/carousels/HeroCarousel'
import Image from 'next/image'
import React from 'react'
const category = [
  {
    url:"/home/shirt.avif",
    title:"Shirts"
  },
  {
    url:"/home/jackets.avif",
    title:"Jackets"
  },
  {
    url:"/home/coorders.avif",
    title:"Coorders"
  },
  {
    url:"/home/bottom.avif",
    title:"Pants"
  },
  {
    url:"/home/tshirt.avif",
    title:"T-Shirts"
  },
  {
    url:"/home/tshirt.avif",
    title:"T-Shirts"
  }
]
const page = () => {
  return (
    <div >
      <HeroCarousel/>
      {/* second section */}
      <div className='px-20 py-5'>
        <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>Winter Is Coming</h1>
          <h3 className='text-zinc-600 mt-1'>Upgrade your wardrobe with our must-have new launches</h3>
        </div>
        <div className='flex justify-center gap-4 flex-wrap'>
          <Image src={"/home/tshirt_20_10_23.avif"} alt="" height={500} width={500}/>
          <Image src={"/home/tshirt_20_10.avif"} alt="" height={500} width={500}/>
        </div>
      </div>
      {/* third section */}
      <div className="px-20 py-10">
          <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>Explore Category</h1>
          <h3 className='text-zinc-600 mt-1'>Select category</h3>
        </div>
        <div className='flex gap-4 justify-center items-center'>
          {
            category.map((item, index) => (
              <ExploreCategoryCard key={index} url={item.url} title={item.title}/>
            ))
          }
          </div>
      </div>
      {/* fourth section */}
      <div className="px-20 py-15">

      <Image src={"/home/cashback.avif"} alt="offer" height={300} width={800} className='w-full h-auto object-cover' />
      </div>
      {/* fifth section */}

      <div className="px-20 py-10">
        <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>New Arrivals</h1>
          <h3 className='text-zinc-600 mt-1'>Check out our latest products</h3>
        </div>
        <div className='grid grid-cols-5 gap-2'>
         {
          Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
          ))
         }
        </div>
      </div>
      {/* sixth section */}
      <div className="px-20 py-10">
         <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>Flannel Season</h1>
          <h3 className='text-zinc-600 mt-1'>Shop a shirt + layer in one with this new collection
</h3>
        </div>
        <Image src={"/home/discover.avif"} alt="offer" height={300} width={800} className='w-full h-auto object-cover' />
      </div>
      <div className="px-20 py-10">
        <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>New Arrivals</h1>
          <h3 className='text-zinc-600 mt-1'>Check out our latest products</h3>
        </div>
        <div className='grid grid-cols-5 gap-2'>
         {
          Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
          ))
         }
        </div>
      </div>
    </div>
  )
}

export default page