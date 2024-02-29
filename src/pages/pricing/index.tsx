import Pricing from 'components/Pricing/Pricing'
import { Pricing as PricingControl } from 'components/Pricing/experiment-control/Pricing'
import { RenderInClient } from 'components/RenderInClient'
import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
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

const Skeleton = () => {
    return (
        <div className="my-8 max-w-7xl mx-auto px-4">
            <div className=" grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="max-w-[300px] w-full h-[50px] animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
                    <div className="max-w-[500px] w-full h-[25px] animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-6" />
                    <div className="max-w-[290px] w-full h-[25px] animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-2" />
                    <div className="max-w-[150px] w-full h-[35px] animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-6" />
                </div>
                <div className="w-full h-[300px] animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
            </div>
            <div className="max-w-[180px] w-full h-[30px] animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-8" />
            <div className="w-full h-[1px] animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-3" />
            <div className="max-w-[320px] w-full h-[25px] animate-pulse bg-accent dark:bg-accent-dark rounded-md my-6" />
            <div className="grid sm:grid-cols-2 md:grid-cols-4 h-[800px] md:h-[400px] gap-4">
                <div className="w-full h-full animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
                <div className="w-full h-full animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
                <div className="w-full h-full animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
                <div className="w-full h-full animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
            </div>
        </div>
    )
}

const PricingPage = (): JSX.Element => {
    const posthog = usePostHog()
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
            <RenderInClient
                render={() => {
                    return posthog?.getFeatureFlag('teams-pricing-page') !== 'test' ? (
                        <PricingControl groupsToShow={groupsToShow} />
                    ) : (
                        <Pricing currentProduct={currentProduct} groupsToShow={groupsToShow} />
                    )
                }}
                placeholder={<Skeleton />}
            />
        </Layout>
    )
}

export default PricingPage
