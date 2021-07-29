import React from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal } from 'components/SignupModal'
import { useActions, useValues } from 'kea'
import { DeploymentType, signupLogic, SignupModalView } from 'logic/signupLogic'
import { Button } from 'antd'
import { Link } from 'gatsby'

const SignUpPage = (): JSX.Element => {
    const { modalView, email } = useValues(signupLogic)
    const { reportDeploymentTypeSelected } = useActions(signupLogic)
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
                        <SignupModal />
                    </>
                )}
                {modalView === SignupModalView.DEPLOYMENT_OPTIONS && (
                    <>
                        <Button>
                            <Link
                                to="/docs/self-host/overview"
                                onClick={() => reportDeploymentTypeSelected(DeploymentType.SELF_HOSTED)}
                            >
                                Link to self-host
                            </Link>
                        </Button>
                        <Button>
                            <Link
                                to={`https://app.posthog.com/signup?email=${encodeURIComponent(email)}`}
                                onClick={() => reportDeploymentTypeSelected(DeploymentType.CLOUD)}
                            >
                                Link to Cloud
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default SignUpPage
