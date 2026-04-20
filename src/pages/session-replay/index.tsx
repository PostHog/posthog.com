import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ProductReaderView from 'components/Products/ReaderViewProduct'

const PRODUCT_HANDLE = 'session_replay'

export default function SessionReplay(): JSX.Element {
    const data = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    return <ProductReaderView productHandle={PRODUCT_HANDLE} data={data} />
}
