"use client"
import ExploreCategoryCard from '@/components/cards/ExploreCategoryCard'
import ProductCard from '@/components/cards/ProductCard'
import HeroCarousel from '@/components/carousels/HeroCarousel'
import { useGetProducts } from '@/hooks/buyer/useProducts'
import { useCurrentUser } from '@/hooks/useUser'
import { useProductStore } from '@/stores/buyer/products.store'
import { useUserStore } from '@/stores/user.store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
const category = [
  {
    url: "/home/shirt.avif",
    title: "Shirts"
  },
  {
    url: "/home/jackets.avif",
    title: "Jackets"
  },
  {
    url: "/home/coorders.avif",
    title: "Coorders"
  },
  {
    url: "/home/bottom.avif",
    title: "Pants"
  },
  {
    url: "/home/tshirt.avif",
    title: "T-Shirts"
  },
  {
    url: "/home/tshirt.avif",
    title: "T-Shirts"
  }
]
const page = () => {
  const {isLoading } = useCurrentUser();
  const {isPending} = useGetProducts()
  const user = useUserStore((s) => s.user);
  const products = useProductStore(s=>s.products)
  const router = useRouter();
  console.log(products);
  
  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading]);
  const onViewDetails=(id:string)=>{
     router.push(`/item/${id}`);
  }
  if(isPending){
    return <div>Loading.....</div>
  }

  return (
    <div >
      <HeroCarousel />
      {/* second section */}
      <div className='px-10 py-5'>
        <div className=' text-center gap-4 p-8'>
          <h1 className='text-2xl'>THE SAREE STORE</h1>
          <h3 className='text-zinc-600 mt-1'>Affortable sarees at lowest price only at sudati.</h3>
        </div>
        <div className='flex justify-center gap-4 flex-wrap'>
          <div>
            <Image src={'/home/GoldComp.webp'} height={350} width={350} alt=''></Image>
          </div>
          <div className='flex justify-center items-center flex-col gap-4'>
            <Image src={"/home/essentialframe-2-compressed.webp"} height={300} width={500} alt=''></Image>
            <Image src={"/home/essentialframe-21-compressed.webp"} height={300} width={500} alt=''></Image>
          </div>
          <div>
            <Image src={'/home/GoldComp.webp'} height={350} width={350} alt=''></Image>
          </div>
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
              <ExploreCategoryCard key={index} url={item.url} title={item.title} />
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
            products?.map((product, index) => (
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
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page