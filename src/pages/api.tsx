import React from 'react'
import { ProductAPI } from 'components/Product/APIQueries'
import Layout from 'components/Layout'
export default function ErrorTracking(): JSX.Element {
    return (
        <Layout>
            <ProductAPI />
        </Layout>
    )
}
