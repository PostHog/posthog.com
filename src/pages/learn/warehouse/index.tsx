import React from 'react'

import LearnPage from 'components/PocketGuides/LearnPage'

/** The Warehouse Learn tab opens on the first "Ask a quick question" chapter of the Data Stack guide. */
export default function WarehouseLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="data_warehouse"
            title="Learn Warehouse – PostHog"
            description="Answer quick questions about revenue, churn, and growth by joining Stripe, your CRM, and support data to product usage."
        />
    )
}
