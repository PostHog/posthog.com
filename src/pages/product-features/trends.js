import React from 'react'
import { Link } from 'gatsby'
import '../features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import featureFlagsIcon from '../../images/feature-flags-icon.svg'
import selfHostedIcon from '../../images/self-hosted-icon.svg'
import eventAutocaptureIcon from '../../images/event-autocapture-icon.svg'
import retentionIcon from '../../images/retention-icon.svg'

function ProductFeatures() {
    return (
        <Layout>
            <div className="featuresWrapper trends">
                <div className="head yellow trends">
                    <div className="headContents">
                        <Link to="/product-features" className="headNav top">
                            <Button icon="left" />
                            <p>Back to Features</p>
                        </Link>
                        <h1>Trends</h1>
                        <p>Understand what parts of your app are engaging, and what areas still need some work.</p>
                        <Link to="/product-features/funnels" className="headNav bottom">
                            <p>Next Feature</p>
                            <Button icon="right" />
                        </Link>
                    </div>
                </div>
                <div className="row01 featuresRow">
                    <h2 className="number row01">01</h2>
                    <div className="rowContents row01">
                        <h2>Monitor engagement with your app</h2>
                        <hr className="redLine" />
                        <p>
                            Knowing how your users interact with your app is key to understanding what you’re doing
                            right and what you’re doing wrong. With trends, PostHog lets you determine what areas of
                            your app are particularly engaging, as well as those that need improving to attract more
                            usage.
                        </p>
                    </div>
                    <div className="rowImg row01 trends" />
                </div>
                <div className="row02 featuresRow">
                    <div className="rowImg row02 trends" />
                    <h2 className="number row02">02</h2>
                    <div className="rowContents row02">
                        <h2>Understand how your app is being used over time</h2>
                        <hr className="redLine" />
                        <p>
                            With{' '}
                            <Link to="/docs/features/trends#trend-segmentation-by-stickiness">trend stickiness</Link>,
                            PostHog lets you understand how trends in user engagement with your app evolve over time. It
                            is easy to identify patterns regarding which parts of your products are being used
                            repeatedly and what aspects don’t drive as much engagement.
                        </p>
                    </div>
                </div>
                <div className="row03 featuresRow">
                    <h2 className="number row03">03</h2>
                    <div className="rowContents row03">
                        <h2>Customize as you wish</h2>
                        <hr className="redLine" />
                        <p>
                            Event autocapture is a great way to get started, but you might want some added customization
                            to improve your analytics processes. With PostHog you can set up actions (link to Actions)
                            for new or already-existing events. This helps you filter through autocaptured events, as
                            well as create more complex logic that isn’t possible with just autocapture.
                        </p>
                    </div>
                    <div className="rowImg row03 trends" />
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
                <div className="nextFeature trends blue">
                    <div className="nextFeatureContents trends">
                        <Link to="/product-features" className="nextFeatureNav top">
                            <Button icon="left" />
                            <p>Back to Features</p>
                        </Link>
                        <Link to="/product-features/funnels" className="nextFeatureText">
                            <h2>Funnels</h2>
                            <p>
                                Visualize users going through a multi-step process in your app and figure out where
                                they’re dropping off.
                            </p>
                        </Link>
                        <Link to="/product-features/funnels" className="nextFeatureNav bottom">
                            <p>Next Feature</p>
                            <Button icon="right" />
                        </Link>
                    </div>
                </div>
                <div className="otherFeaturesWrapper">
                    <h2>Other features</h2>
                    <div className="otherFeatures">
                        <div className="twoOtherFeatures">
                            <Link to="/product-features/retention">
                                <img src={retentionIcon} />
                                <h4>Retention</h4>
                            </Link>
                            <Link to="/product-features/feature-flags">
                                <img src={featureFlagsIcon} />
                                <h4>Feature flags</h4>
                            </Link>
                        </div>
                        <div className="twoOtherFeatures">
                            <Link to="/product-features/self-hosted">
                                <img src={selfHostedIcon} />
                                <h4>Self hosted</h4>
                            </Link>
                            <Link to="/product-features/event-autocapture">
                                <img src={eventAutocaptureIcon} />
                                <h4>Event autocapture</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductFeatures
