import React from 'react'
import Control from '../components/Home/Control'
import Test from '../components/Home/Test'
import usePostHog from '../hooks/usePostHog'

export default function Home() {
    const posthog = usePostHog()

    // TODO: Uncomment this before launch
    // return posthog?.getFeatureFlag?.('homepage-test') === 'control' ? <Control /> : <Test />
    return <Test />
}
