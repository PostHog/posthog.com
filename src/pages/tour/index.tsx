import React from 'react'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'

function ProductList() {
  const products = productMenu.children

  // Duplicate the products for seamless looping
  const marqueeProducts = [...products, ...products]
  const animationDuration = `${products.length * 4.5}s`

  return (
      <div className="relative overflow-x-hidden w-full" style={{ height: 'auto' }}>
          <div
              className="marquee flex w-max"
              tabIndex={0}
              style={{ animationDuration }}
          >
              {marqueeProducts.map((product, idx) => {
                  // @ts-ignore
                  const Icon = Icons[product.icon]
                  return (
                      <Link
                          key={product.slug + '-' + idx}
                          to={product.url}
                          className={`flex flex-col items-center gap-1 group py-2 px-3 rounded hover:bg-accent max-w-24`}
                          state={{ newWindow: true }}
                      >
                          <span className={`size-6 mb-1 text-${product.color}`}>{Icon && <Icon />}</span>
                          <span className="text-sm font-medium leading-tight group-hover:text-primary text-center">
                              {product.name}
                          </span>
                      </Link>
                  )
              })}
          </div>
          <style>{`
              .marquee {
                  animation: marquee-scroll linear infinite;
              }
              .marquee:hover, .marquee:focus {
                  animation-play-state: paused;
              }
              @keyframes marquee-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
              }
          `}</style>
      </div>
  )
}

export default function Tour(): JSX.Element {
    return (
      <>
            <SEO title="Tour" />
            <div data-scheme="primary" className="w-full h-full bg-primary flex flex-col">
                    <div className="flex flex-col flex-1 justify-center items-center w-full border-y border-primary py-8">
                      <div className="px-8 flex flex-col items-center w-full mb-8">
                        <div className="bg-accent border border-primary size-40 rounded-full flex items-center justify-center mb-4">placeholder</div>
                        <h2 className="text-xl font-bold mb-1">There are other dev tool companies, but they're not like us</h2>
                        <p className="text-[15px] text-secondary text-center">We're building every piece of SaaS you need to make your product successful. A single platform for people who build things.</p>
                      </div>
                      <ProductList />
                    </div>
                    <div className="w-full flex justify-between px-3 py-2 bg-accent">
                        <CallToAction type="secondary" size="sm">Back</CallToAction>
                        <CallToAction type="primary" size="sm">Next</CallToAction>
                    </div>
                </div>
          </>
    )
}

