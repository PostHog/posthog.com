import Pricing from 'components/Pricing/Pricing'
import React, { useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { pricingMenu } from '../../navs'
import Layout from 'components/Layout'

const internalProductNames: {
    [key: string]: string
} = {
    'product-analytics': 'product_analytics',
    'session-replay': 'session_replay',
    'feature-flags': 'feature_flags',
    'ab-testing': 'ab_testing',
    surveys: 'surveys',
}

const pricingGroupsToShowOverride: {
    [key: keyof typeof internalProductNames]: string[]
} = {
    'ab-testing': ['feature_flags'],
}

const PricingPage = (): JSX.Element => {
    const { search } = useLocation()
    const [groupsToShow, setGroupsToShow] = useState<undefined | string[]>()
    const [currentProduct, setCurrentProduct] = useState<string | null>()

    const getGroupsToShow = (): string[] | undefined => {
        const product = new URLSearchParams(search).get('product')
        setCurrentProduct(product ? internalProductNames[product] : null)
        const defaultGroupsToShow = product ? [internalProductNames[product]] : undefined
        const groupsToShowOverride = product ? pricingGroupsToShowOverride[product] : undefined
        return groupsToShowOverride || defaultGroupsToShow
    }

    useEffect(() => {
        setGroupsToShow(getGroupsToShow())
    }, [search])

    return (
        <Layout
            parent={pricingMenu}
            activeInternalMenu={
                pricingMenu.children[
                    Object.values(internalProductNames).findIndex((name) => name === currentProduct) + 1
                ]
            }
        >
            <Pricing currentProduct={currentProduct} groupsToShow={groupsToShow} />
        </Layout>
    )
}

export default PricingPage
