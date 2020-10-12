import React from 'react'
import { Link } from 'gatsby'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import OtherFeaturesBlock from '../../components/OtherFeaturesBlock'

function ProductFeatures() {
    return (
        <Layout>
            <div className="head blue selfHosted">
                <div className="headContents">
                    <h1>Self Hosted</h1>
                    <p>Powerful analytics on your own infrastructure, with all the features your team needs.</p>
                </div>
            </div>
            <div className="featuresWrapper selfHosted">
                <div className="row01 featuresRow">
                    <h2 className="number row01">01</h2>
                    <div className="rowContents row01">
                        <h2>Take control of your data</h2>
                        <hr className="redLine" />
                        <p>
                            When you self-host, your data is all yours. This means your users’ data is not sent to any
                            third-party, not even PostHog. The privacy of your users is preserved, and it is easier to
                            comply with legislation such as GDPR and cookie laws.
                        </p>
                    </div>
                    <div className="rowImg row01 selfHosted" />
                </div>
                <div className="row02 featuresRow">
                    <div className="rowImg row02 selfHosted" />
                    <h2 className="number row02">02</h2>
                    <div className="rowContents row02">
                        <h2>Deploy in your own way</h2>
                        <hr className="redLine" />
                        <p>
                            We strive to make our deployment process as simple as possible. As a result, we offer a wide
                            variety of ways to deploy PostHog, so you can pick the one that suits you best.
                            Additionally, it’s up to you where you deploy it! This gives you more freedom and prevents
                            PostHog from disrupting your tech stack.
                        </p>
                    </div>
                </div>
                <div className="row03 featuresRow">
                    <h2 className="number row03">03</h2>
                    <div className="rowContents row03">
                        <h2>Perform powerful analytics your entire team can use</h2>
                        <hr className="redLine" />
                        <p>
                            When you self-host, your data is all yours. This means your users’ data is not sent to any
                            third-party, not even PostHog. The privacy of your users is preserved, and it is easier to
                            comply with legislation such as GDPR and cookie laws.
                        </p>
                    </div>
                    <div className="rowImg row03 selfHosted" />
                </div>
                <div className="startNowWrapper">
                    <div className="startNowRow">
                        <Link to="/trial/">
                            <Button type="primary" className="startNowButton">
                                Start now
                            </Button>
                        </Link>
                        <img src={rays} />
                    </div>
                </div>
                <OtherFeaturesBlock currentPageKey="self-hosted" />
            </div>
        </Layout>
    )
}

export default ProductFeatures
