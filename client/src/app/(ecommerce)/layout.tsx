import EcomNav from '@/components/shared/header/EcomNav';
import EcomFooter from '@/components/shared/footer/EcomFooter';
import React from 'react'
import FeaturesBanner from '@/components/shared/feature/FeatureBanner';
import NewsletterSubscription from '@/components/shared/feature/NewsletterSubscription';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <EcomNav />
      {children}
      <FeaturesBanner />
      <NewsletterSubscription />
      <EcomFooter />
    </div>
  )
}

export default layout