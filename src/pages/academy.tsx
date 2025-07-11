import React from 'react'
import { ProductPostItTraining } from 'components/Product/PostItTraining'
import Layout from 'components/Layout'
import { companyMenu } from '../navs'

export default function AcademyPage() {
    return (
        <Layout parent={companyMenu}>
            <ProductPostItTraining />
        </Layout>
    )
}
