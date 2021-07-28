import React from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal } from 'components/SignupModal'

const SignUpPage = (): JSX.Element => {
    return (
        <div>
            <SEO
                title="Sign Up • PostHog"
                description="Unlock insights. Our Open Source, Scale, and Cloud editions provide flexible deployment of reliable analytics."
            />
            <Header onPostPage={false} logoOnly transparentBackground />
            <div className="w-full h-full relative flex items-center justify-center">
                <img
                    src={funnelsScreenshot}
                    alt="PostHog Insights interface showing new Funnels features"
                    style={{ maxWidth: '75vw' }}
                />
                <SignupModal />
            </div>
        </div>
    )
}

export default SignUpPage
