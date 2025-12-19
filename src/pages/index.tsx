import React from 'react'
import Control from '../components/Home/Control'
import Test from '../components/Home/Test'
import usePostHog from '../hooks/usePostHog'

export default function Home() {
    const posthog = usePostHog()

    return posthog?.getFeatureFlag?.('homepage-test') === 'test' ? <Test /> : <Control />
}
