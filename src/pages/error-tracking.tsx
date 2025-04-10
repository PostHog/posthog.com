import React from 'react'
import { ProductErrorTracking } from 'components/Product/ErrorTracking'
import { MaxCTA } from 'components/MaxCTA'
import Layout from 'components/Layout'

export default function ErrorTracking(): JSX.Element {
    return (
        <Layout>
                <p className="mt-2">Try asking Max to help you set up error tracking in your application.</p>
            </MaxCTA>
            <ProductErrorTracking />
        </Layout>
    )
}
