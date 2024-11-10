import React from 'react'
import { ProductHeader } from 'components/Products/ProductHeader'
import { useLayoutData } from 'components/Layout/hooks'

interface ProductFeaturesProps {
    children?: React.ReactNode 
    featuresArray?: React.ReactNode
    subfeaturesArray: React.ReactNode
    subfeaturesItemCount: number
    marquee: React.ReactNode
}

export const ProductFeatures = ({ children, featuresArray, subfeaturesArray, subfeaturesItemCount, marquee }: ProductFeaturesProps): JSX.Element => {
  const { fullWidthContent } = useLayoutData()

  return (
    <div id="features" className="@container bg-white/50 dark:bg-dark">
        <section className={`transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-7xl'} px-4 @2xl:px-6 @4xl:px-8 mb-10 md:mb-20`}>
            {/* <h3 className="text-2xl mb-4">Features</h3> */}
            {children}

            {featuresArray &&  <ul className={`list-none p-0 grid sm:@xs:grid-cols-2 @6xl:grid-cols-3 gap-4 @6xl:gap-6 @5xl:gap-8 mb-8`}>
              {featuresArray}
            </ul> }
            <ul className={`list-none p-0 grid sm:@sm:grid-cols-2 @md:grid-cols-${subfeaturesItemCount} gap-4`}>
              {subfeaturesArray}
            </ul>
        </section>

        <section className="bg-accent dark:bg-accent-dark">
            {marquee}
        </section>
    </div>
  )
}

export default ProductFeatures