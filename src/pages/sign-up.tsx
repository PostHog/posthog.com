import React, { useEffect } from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal, SignupBorderGraphic, SignupCircleGraphic } from 'components/SignupModal'
import { useActions, useValues } from 'kea'
import { signupLogic, SignupModalView } from 'logic/signupLogic'
import './styles/sign-up.scss'
import { DeploymentOptionsGrid } from 'components/DeploymentOptionsGrid/DeploymentOptionsGrid'

const SignUpPage = (): JSX.Element => {
    const { modalView } = useValues(signupLogic)
    const { onRenderSignupPage } = useActions(signupLogic)

    useEffect(() => {
        onRenderSignupPage()
    }, [])

    return (
        <div>
            <SEO
                title="Sign Up • PostHog"
                description="Unlock insights. Our Open Source, Scale, and Cloud editions provide flexible deployment of reliable analytics."
            />
            <Header onPostPage={false} logoOnly transparentBackground />
            <div className="w-full h-full relative flex items-center justify-center">
                {modalView === SignupModalView.EMAIL_PROMPT && (
                    <div className="signup-modal-view-email">
                        <img
                            src={funnelsScreenshot}
                            alt="PostHog Insights interface showing new Funnels features"
                            style={{ maxWidth: '75vw' }}
                        />
                        <div className="signup-callout-message">
                            Unlock a deeper level of insights with Funnels 2.0{' '}
                            <strong className="text-badge">New</strong>
                        </div>
                        <SignupBorderGraphic />
                        <SignupModal />
                    </div>
                )}
                {modalView === SignupModalView.DEPLOYMENT_OPTIONS && (
                    <div className="signup-modal-view-deployment">
                        <SignupCircleGraphic />
                        <SignupBorderGraphic />
                        <DeploymentOptionsGrid />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignUpPage
