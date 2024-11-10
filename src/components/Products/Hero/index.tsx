import React from 'react'
import { ProductHeader } from 'components/Products/ProductHeader'
import { useLayoutData } from 'components/Layout/hooks'


interface ProductHeroProps {
    header: React.ReactNode
    image: React.ReactNode
    customers: React.ReactNode
    className?: string
    children: React.ReactNode
}

export const ProductHero = ({ className, header, image, customers, children }: ProductHeroProps): JSX.Element => {
  const { fullWidthContent } = useLayoutData()

  return (
    <div className="@container bg-white/50 dark:bg-dark pb-8">
        {header}

        <div className={`flex flex-col @7xl:flex-row items-start gap-8 @5xl:gap-12 transition-all px-4 @5xl:px-8 mb-8 ${fullWidthContent ? 'max-w-full @7xl:items-center' : 'max-w-7xl @7xl:items-start'}`}>
            {image}

            <section id="customers" className={`@container w-full @7xl:basis-96`}>
                <ul className="list-none p-0 grid grid-cols-1 sm:@sm:grid-cols-2 2xl:@sm:grid-cols-1 @2xl:grid-cols-3 @7xl:grid-cols-1 gap-8 @7xl:gap-4">
                    {customers}
                </ul>
            </section>
        </div>
    </div>
  )
}

export default ProductHero