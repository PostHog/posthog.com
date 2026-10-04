import React, { useEffect, useMemo } from 'react'
import Collection from '../templates/merch/Collection'
import { useCartStore } from '../templates/merch/store'
import { useLocation } from 'lib/navigation'

export default function Merch({ data }) {
    const setDiscountCode = useCartStore((state) => state.setDiscountCode)
    const { search } = useLocation()
    const main = data.main
    const kits = data.kits

    if (!main || !kits) {
        return null
    }
    const { products, handle } = main

    const kit = useMemo(() => {
        const handle = new URLSearchParams(search).get('product')
        const kit = handle ? kits.products.find((p) => p.handle === handle) : null
        if (kit) {
            kit.kit = true
            return [kit]
        }
        return []
    }, [])

    useEffect(() => {
        const discountCode = new URLSearchParams(search).get('coupon')
        if (discountCode) {
            setDiscountCode(discountCode)
        }
    }, [])

    return <Collection pageContext={{ handle, productsForCurrentPage: [...products, ...kit] }} />
}
