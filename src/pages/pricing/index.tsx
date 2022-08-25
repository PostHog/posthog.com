import Control from 'components/Pricing/Control'
import React from 'react'
import { PostHog } from 'posthog-node'
import Test from 'components/Pricing/Test'

const PricingNew = ({ serverData }): JSX.Element => {
    return serverData?.featureFlag === 'test' ? <Test /> : <Control />
}

export default PricingNew

export async function getServerData(context) {
    function getCookieValue(cookie, name) {
        const value = `; ${cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
    }
    const phCookie = getCookieValue(context.headers?.get('cookie'), 'ph_sTMFPsFhdP1Ssg_posthog')
    const decoded = phCookie && decodeURIComponent(phCookie)
    const distinctId = decoded && JSON.parse(decoded).distinct_id

    const client = new PostHog('sTMFPsFhdP1Ssg')
    const featureFlag = await client.getFeatureFlag('highlight-open-source', distinctId)
    return {
        props: { featureFlag },
    }
}
