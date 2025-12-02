"use client"
import HeroCarousel from '@/components/carousels/HeroCarousel'
import EmbroideredSareeSection from '@/components/sections/EmbroideredSareeSection'
import HomeSections from '@/components/sections/HomeSection'
import SareeCategorySection from '@/components/sections/SareeCategorySection'
import SareeStoreSection from '@/components/sections/SareeStoreSection'
import { useGetProducts } from '@/hooks/buyer/useProducts'
import { useCurrentUser } from '@/hooks/useUser'
import { useProductStore } from '@/stores/buyer/products.store'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

const page = () => {
  const { isLoading } = useCurrentUser();
  const { isPending } = useGetProducts()
  const user = useUserStore((s) => s.user);
  const products = useProductStore(s => s.products)
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading]);

  const onViewDetails = (id: string) => {
    router.push(`/item/${id}`);
  }

  if (isPending) {
    return <div>Loading.....</div>
  }

  return (
    <div>
      <HeroCarousel />

      <SareeStoreSection />

      <SareeCategorySection />

      <EmbroideredSareeSection />

      {/* Correct props */}
      <HomeSections products={products} onViewDetails={onViewDetails} />
    </div>
  )
}

export default page
