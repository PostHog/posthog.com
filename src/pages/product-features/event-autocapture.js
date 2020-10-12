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
            <div className="head orange eventAutocapture">
                <div className="headContents">
                    <h1>Event Autocapture</h1>
                    <p>Less setup, more analytics. Start capturing relevant data from the moment setup is complete.</p>
                </div>
            </div>
            <div className="featuresWrapper eventAutocapture">
                <div className="row01 featuresRow">
                    <h2 className="number row01">01</h2>
                    <div className="rowContents row01">
                        <h2>Get started with one click</h2>
                        <hr className="redLine" />
                        <p>
                            PostHog starts capturing events from the second the setup is complete - no extra steps
                            required. We also provide various ways to deploy in just one click, such as{' '}
                            <Link to="/docs/deployment/deploy-heroku">Heroku</Link>,{' '}
                            <Link to="/docs/deployment/deploy-heroku">AWS</Link>, and{' '}
                            <Link to="/docs/deployment/deploy-linode">Linode</Link>. This way, you can go from first
                            hearing about PostHog to capturing your first event in less than an hour.
                        </p>
                    </div>
                    <div className="rowImg row01 eventAutocapture" />
                </div>
                <div className="row02 featuresRow">
                    <div className="rowImg row02 eventAutocapture" />
                    <h2 className="number row02">02</h2>
                    <div className="rowContents row02">
                        <h2>Don't miss a thing</h2>
                        <hr className="redLine" />
                        <p>
                            Event autocapture means you don’t have to worry about missing important events while you
                            figure out your setup. By default, PostHog captures a wide variety of events that are
                            important to you, from page views to button clicks. As such, from the moment you deploy,
                            you’re already gathering useful data!
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
                <OtherFeaturesBlock currentPageKey="autocapture" />
            </div>
        </Layout>
    )
}

export default ProductFeatures
