import React from 'react'
import { Link } from 'gatsby'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Trends"
                tagline="Understand what parts of your app are engaging, and what areas still need some work."
                styleKey="trends"
                bgColor="yellow"
            />
            <div className="featuresWrapper trends">
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
                    <div className="rowImg row03 eventAutocapture" />
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
                <OtherFeaturesBlock currentPageKey="trends" />
            </div>
        </Layout>
    )
}

export default ProductFeatures
