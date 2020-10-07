import React from 'react'
import { Link } from 'gatsby'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import eventAutocaptureIcon from '../../images/event-autocapture-icon.svg'
import featureFlagsIcon from '../../images/feature-flags-icon.svg'
import trendsIcon from '../../images/trends-icon.svg'
import selfHostedIcon from '../../images/self-hosted-icon.svg'
import retentionIcon from '../../images/retention-icon.svg'

function ProductFeatures() {
    return (
        <Layout>
            <div className="head blue funnels">
                <div className="headContents">
                    <h1>Funnels</h1>
                    <p>
                        Visualize users going through a multi-step process in your app and figure out where they’re
                        dropping off.
                    </p>
                </div>
            </div>
            <div className="featuresWrapper funnels">
                <div className="row01 featuresRow">
                    <h2 className="number row01">01</h2>
                    <div className="rowContents row01">
                        <h2>Visualize user behavior step-by-step</h2>
                        <hr className="redLine" />
                        <p>
                            PostHog funnels offer you a visual representation of the flow of users through specific
                            areas of your app, such as the sign up process. They allow you to understand what percentage
                            of users go from one step to another, so you can identify any areas for improvement in
                            multi-step processes.
                        </p>
                    </div>
                    <div className="rowImg row01 funnels" />
                </div>
                <div className="row02 featuresRow">
                    <div className="rowImg row02 funnels" />
                    <h2 className="number row02">02</h2>
                    <div className="rowContents row02">
                        <h2>Understand where users drop off</h2>
                        <hr className="redLine" />
                        <p>
                            Funnels are especially useful for understanding at which step of a process users are
                            dropping off. They can help you identify points that need attention in order to improve
                            conversion rates, or simply make the app more friendly to use.
                        </p>
                    </div>
                </div>
                <div className="row03 featuresRow">
                    <h2 className="number row03">03</h2>
                    <div className="rowContents row03">
                        <h2>Improve your app’s UX</h2>
                        <hr className="redLine" />
                        <p>
                            In PostHog, you can see an aggregate view of all your users going through a funnel, filter
                            them by a certain property, or even see each user individually! This makes it easy to
                            identify accessibility issues, or areas where information might be unclear. With funnels,
                            you can identify patterns, polish the UX, and improve conversion.
                        </p>
                    </div>
                    <div className="rowImg row03 funnels" />
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
                                <h4>Event Autocapture</h4>
                            </Link>
                        </div>
                        <Link to="/product-features/trends">
                            <img src={trendsIcon} />
                            <h4>Trends</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductFeatures
