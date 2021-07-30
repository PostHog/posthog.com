import React from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal } from 'components/SignupModal'
import { useValues } from 'kea'
import { signupLogic, SignupModalView } from 'logic/signupLogic'
import './styles/sign-up.scss'
import { DeploymentOptionsGrid } from 'components/DeploymentOptionsGrid/DeploymentOptionsGrid'

const SignUpPage = (): JSX.Element => {
    const { modalView } = useValues(signupLogic)
    return (
        <div>
            <SEO
                title="Sign Up • PostHog"
                description="Unlock insights. Our Open Source, Scale, and Cloud editions provide flexible deployment of reliable analytics."
            />
            <Header onPostPage={false} logoOnly transparentBackground />
            <div className="w-full h-full relative flex items-center justify-center">
                {modalView === SignupModalView.EMAIL_PROMPT && (
                    <>
                        <img
                            src={funnelsScreenshot}
                            alt="PostHog Insights interface showing new Funnels features"
                            style={{ maxWidth: '75vw' }}
                        />
                        <div className="signup-callout-message">
                            Unlock a deeper level of insights with Funnels 2.0{' '}
                            <strong className="text-badge">New</strong>
                        </div>
                        <SignupModal />
                    </>
                )}
                {modalView === SignupModalView.DEPLOYMENT_OPTIONS && <DeploymentOptionsGrid />}
            </div>
        </div>
    )
}

export default SignUpPage
