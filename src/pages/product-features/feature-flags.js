import React from 'react'
import { Link } from 'gatsby'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import eventAutocaptureIcon from '../../images/event-autocapture-icon.svg'
import retentionIcon from '../../images/retention-icon.svg'
import trendsIcon from '../../images/trends-icon.svg'
import selfHostedIcon from '../../images/self-hosted-icon.svg'
import funnelsIcon from '../../images/funnels-icon.svg'

function ProductFeatures() {
    return (
        <Layout>
            <div className="head yellow featureFlags">
                <div className="headContents">
                    <h1>Feature flags</h1>
                    <p>
                        Release new features slowly to your users, see how they perform, and roll them back if you need
                        to.
                    </p>
                </div>
            </div>
            <div className="featuresWrapper featureFlags">
                <div className="row01 featuresRow">
                    <h2 className="number row01">01</h2>
                    <div className="rowContents row01">
                        <h2>Roll out features at your own pace</h2>
                        <hr className="redLine" />
                        <p>
                            Releasing new features can be difficult. As much as your team may find the feature amazing,
                            you cannot be sure of how it will impact your users. With feature flags, rolling out new
                            features becomes less stressful. You can choose to slowly roll out features to a certain
                            percentages of your users, and increase or decrease that percentage accordingly.
                        </p>
                    </div>
                    <div className="rowImg row01 featureFlags" />
                </div>
                <div className="row02 featuresRow">
                    <div className="rowImg row02 featureFlags" />
                    <h2 className="number row02">02</h2>
                    <div className="rowContents row02">
                        <h2>See how new features affect the UX</h2>
                        <hr className="redLine" />
                        <p>
                            Maybe you want to see how your users react to different text on a button, or a new navbar
                            style. With feature flags, you can roll out a change to only a percentage of users and see
                            how that affects the UX through the various analytics tools PostHog provides. You can then
                            decide to fully implement the change or simply roll it back.
                        </p>
                    </div>
                </div>
                <div className="row03 featuresRow">
                    <h2 className="number row03">03</h2>
                    <div className="rowContents row03">
                        <h2>Safely roll back features</h2>
                        <hr className="redLine" />
                        <p>
                            Maybe your new feature didn’t turn out to be as exciting to your users, or perhaps it still
                            needs a few tweaks. No problem. Safely roll back features without serious consequences and
                            only make definite changes to your app when you’re certain they’re good to go!
                        </p>
                    </div>
                    <div className="rowImg row03 featureFlags" />
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
                <div className="otherFeaturesWrapper">
                    <h2>Other features</h2>
                    <div className="otherFeatures">
                        <div className="twoOtherFeatures">
                            <Link to="/product-features/self-hosted">
                                <img src={selfHostedIcon} />
                                <h4>Self hosted</h4>
                            </Link>
                            <Link to="/product-features/event-autocapture">
                                <img src={eventAutocaptureIcon} />
                                <h4>Event Autocapture</h4>
                            </Link>
                        </div>
                        <div className="twoOtherFeatures">
                            <Link to="/product-features/trends">
                                <img src={trendsIcon} />
                                <h4>Trends</h4>
                            </Link>
                            <Link to="/product-features/funnels">
                                <img src={funnelsIcon} />
                                <h4>Funnels</h4>
                            </Link>
                        </div>
                        <Link to="/product-features/retention">
                            <img src={retentionIcon} />
                            <h4>Retention</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductFeatures
