import React, { useEffect, useState } from 'react'

import TestLandingPage from '../components/LandingPages/Test'
import ControlLandingPage from '../components/LandingPages/Control'

const IndexPage = () => {
    // @todo - figure out how to use PostHog feature flag
    const [variant, setVariant] = useState(null)

    useEffect(() => {
        if (window.location.search == '?_ab=control') {
            setVariant('control')
        } else {
            setVariant('test')
        }
    }, [])

    if (variant === 'test') {
        return <TestLandingPage />
    } else if (variant === 'control') {
        return <ControlLandingPage />
    } else {
        return <div></div>
    }
}

export default IndexPage
