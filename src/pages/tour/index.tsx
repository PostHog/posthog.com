import React from 'react'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'

export default function Tour(): JSX.Element {
    return (
      <>
            <SEO title="Tour" />
            <div data-scheme="primary" className="w-full h-full bg-primary flex flex-col">
                    <div className="flex flex-col flex-1 justify-center items-center w-full border-y border-primary p-8">
                        <div className="bg-accent border border-primary size-40 rounded-full flex items-center justify-center mb-4">placeholder</div>
                        <h2 className="text-xl font-bold mb-1">There are other dev tool companies, but they're not like us</h2>
                        <p className="text-sm text-secondary text-center">We're building every piece of SaaS you need to make your product successful. A single platform for people who build things.</p>
                        <ProductList />
                    </div>
                    <div className="w-full flex justify-between p-2 bg-accent">
                        <CallToAction type="secondary" size="sm">Back</CallToAction>
                        <CallToAction type="primary" size="sm">Next</CallToAction>
                    </div>
                </div>
          </>
    )
}

function ProductList() {
    const products = productMenu.children

    return (
        <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${products.length}, minmax(90px, 1fr))` }}
        >
            {products.map((product) => {
                // @ts-ignore
                const Icon = Icons[product.icon]
                return (
                    <Link
                        key={product.slug}
                        to={product.url}
                        className={`flex flex-col items-center group py-2 px-1 rounded hover:bg-accent`}
                    >
                        <span className={`size-6 mb-1 transition-colors duration-150 text-${product.color}`}>{Icon && <Icon />}</span>
                        <span className="text-sm font-medium leading-tight group-hover:text-primary text-center">
                            {product.name}
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
