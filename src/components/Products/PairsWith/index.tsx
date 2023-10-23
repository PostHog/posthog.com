import React from 'react'

export const PairsWith = ({ children, items }) => {
    return (
        <section className="mb-20 px-5">
            <h3 className="text-3xl lg:text-4xl text-center mb-2">Pairs with...</h3>

            <p className="text-center">PostHog products are natively designed to be interoperable using Product OS.</p>
            <div className={`grid gap-8 md:grid-cols-${items}`}>{children}</div>
        </section>
    )
}
