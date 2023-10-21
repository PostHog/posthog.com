import React from 'react'
import Link from 'components/Link'
import { SectionWrapper } from './Section'
import { IFeature } from './types'
import PairGrid from './PairGrid'

export default function PairsWith({ products }: { products: IFeature[] }) {
    return (
        <div id="pairs-with" className="my-12">
            <SectionWrapper className="max-w-full">
                <h2 className="text-center text-4xl mb-2">!!Pairs with...</h2>
                <p className="text-center text-lg font-semibold text-opacity-70">
                    PostHog products are natively designed to be interoperable using{' '}
                    <Link to="/product-os">Product OS</Link>.
                </p>
                <PairGrid features={products} />
            </SectionWrapper>
        </div>
    )
}
