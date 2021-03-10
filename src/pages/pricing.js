import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card, Collapse, Slider } from 'antd'
import { SEO } from '../components/seo'
import './styles/pricing.scss'
import 'antd/lib/collapse/style/css'
import imgCloud from '../images/cloud.svg'
import imgBuilding from '../images/building.svg'
import 'antd/lib/slider/style/css'
import { plans, faqs } from '../pages-content/pricing-data'

import imgOpenSource from '../images/plan-open-source.svg'
import imgEnterprise2 from '../images/plan-enterprise2.svg'

const PricingPage = () => {
    const [state, setState] = useState({ planOptions: 'cloud', unitPricing: '0.000225', finalCost: '200' })
    const [priceSimulation, setPriceSimulation] = useState(250000)
    const comparisonRef = useRef()
    const location = useLocation()
    const { Panel } = Collapse

    function checkScale(value, unitPricing, finalCost) {
        if (value < 10000000) {
            unitPricing = 0.000225
            finalCost = 200
        } else if (value >= 10000000 && value < 100000000) {
            unitPricing = 0.000045
            finalCost = 10000000 * 0.000225 + (value - 10000000) * 0.000045
        } else {
            unitPricing = 0.000009
            finalCost = 10000000 * 0.000225 + 100000000 * 0.000045 + (value - 100000000) * 0.000009
        }

        finalCost = Math.round(finalCost)
        setState({ ...state, finalCost: finalCost, unitPricing: unitPricing })
    }

    const setOptionFromQS = () => {
        // On load, set the correct plan options (if applicable)
        const { o } = queryString.parse(location.search)
        if (o && o in plans) setState({ ...state, planOptions: o })
    }

    useEffect(setOptionFromQS, [])

    const handleSegmentChange = (event) => {
        const newOption = event.target.value
        const pushUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?o=${newOption}`
        window.history.pushState({ path: pushUrl }, '', pushUrl)
        setState({ ...state, planOptions: event.target.value })
    }

    const CTAButton = (props) => (
        <Button type={props.plan.callToActionType || (props.plan.popular ? 'primary' : 'default')} size="large">
            {props.plan.callToAction}
        </Button>
    )

    return (
        <Layout menuActiveKey="pricing">
            <div className="pricing-page-wrapper">
                <div className="pricing-page-container">
                    <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
                    <Row gutter={[24, 24]}>
                        <Col span={24} align="middle">
                            <h1>Pricing for your scale</h1>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col span={24} align="middle">
                            <div className="p-segment">
                                <label className={state.planOptions === 'cloud' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="cloud"
                                        name="planOptions"
                                        checked={state.planOptions === 'cloud'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Cloud
                                </label>
                                <label className={state.planOptions === 'vpc' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="vpc"
                                        name="planOptions"
                                        checked={state.planOptions === 'vpc'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    VPC
                                </label>
                                <label className={state.planOptions === 'open-source' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="open-source"
                                        name="planOptions"
                                        checked={state.planOptions === 'open-source'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Open Source
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[24, 36]} type="flex" style={{ justifyContent: 'center', marginTop: '32px' }}>
                        {(plans[state.planOptions] || []).map((plan) => (
                            <Col
                                className="plan-card"
                                md={24 / plans[state.planOptions].length}
                                sm={24}
                                align="middle"
                                key={plan.title}
                            >
                                {plan.popular && <div className="p-plan-popular-badge">POPULAR</div>}
                                <Card className="p-full-height">
                                    {plan.image && (
                                        <div style={{ marginTop: 16 }}>
                                            <img src={plan.image} alt="Plan image" />
                                        </div>
                                    )}
                                    <h3
                                        className={
                                            'header-3' +
                                            (plan.popular ? 'p-text-primary ' : '') +
                                            'p-plan-title ' +
                                            (plan.wraps && 'p-plan-title-wrap')
                                        }
                                    >
                                        {plan.title}
                                    </h3>
                                    <div className="p-plan-price">
                                        {plan.price}
                                        <span className="p-text-primary">{plan.priceDetail}</span>
                                    </div>
                                    <div className="p-plan-description">{plan.description}</div>
                                    {plan.callToActionDest?.type === 'gatsbyLink' && (
                                        <Link to={plan.callToActionDest?.value}>
                                            <CTAButton plan={plan} />
                                        </Link>
                                    )}
                                    {plan.callToActionDest?.type !== 'gatsbyLink' && (
                                        <a href={plan.callToActionDest?.value}>
                                            <CTAButton plan={plan} />
                                        </a>
                                    )}

                                    <div className="p-plan-benefits">
                                        {plan.benefits.map((benefit) => (
                                            <span key={benefit} dangerouslySetInnerHTML={{ __html: benefit }}></span>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                        {state.planOptions === 'vpc' && (
                            <div className="pricing-cloud">
                                <h4>For those with high volume usage or privacy needs.</h4>
                                <div>
                                    You host, we manage it. Pricing is logarithmic and gets much less expensive at
                                    scale. No setup fee.
                                </div>

                                <div>
                                    <div className="main-price">
                                        <div>
                                            ${state.unitPricing}
                                            <span>/additional event ingested</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Slider
                                            defaultValue={250000}
                                            min={10000}
                                            max={150000000}
                                            step={20000}
                                            tooltipVisible
                                            tipFormatter={(value) =>
                                                value.toLocaleString().concat(' events ingested /month')
                                            }
                                            onChange={(value) => checkScale(value)}
                                        />
                                        <div style={{ fontSize: '1rem', textAlign: 'right' }}>
                                            <span className="text-muted">Price:</span> <b>${state.finalCost}</b>
                                            /month
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    Minimum price <b>$200</b> / month. <b>No setup cost</b>.
                                </div>
                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    Unsure about your numbers or want to talk?{' '}
                                    <a href="mailto:sales@posthog.com?title=VPC%20Volumes%20Enquiry">Contact us</a>.
                                </div>

                                <ul className="p-comparison-list">
                                    <li>
                                        Recommended if you have large volumes of events or users ({'>10k monthly users'}
                                        ).
                                    </li>
                                    <li>You don't want user data to leave your infrastructure (e.g. HIPAA, SOC2).</li>
                                    <li>You need full access to the production instance.</li>
                                    <li>
                                        You are concerned with browser privacy features, ad blockers, or third-party
                                        cookie blockers.
                                    </li>
                                </ul>
                            </div>
                        )}
                        {state.planOptions === 'cloud' && (
                            <div className="pricing-cloud">
                                <h4>One Price. Pay only for what you use.</h4>
                                <div>
                                    Get all the features with zero-minimum pricing. Pay based on the events you{' '}
                                    <b>capture</b> every month.
                                </div>

                                <div>
                                    <div className="main-price">
                                        <div>
                                            $0.000225
                                            <span>/ additional event ingested</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Slider
                                            defaultValue={250000}
                                            min={10000}
                                            max={150000000}
                                            step={20000}
                                            tooltipVisible
                                            tipFormatter={(value) =>
                                                value.toLocaleString().concat(' events ingested /month')
                                            }
                                            onChange={(value) => setPriceSimulation(value)}
                                        />
                                        <div style={{ fontSize: '1rem', textAlign: 'right' }}>
                                            <span className="text-muted">Price:</span>{' '}
                                            <b>${Math.round((priceSimulation - 10000) * 0.000225).toLocaleString()}</b>
                                            /month
                                        </div>
                                    </div>
                                </div>

                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    First <b>10,000 events are free</b> every single month.
                                </div>

                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    Unsure about your numbers or want to talk?{' '}
                                    <a href="mailto:sales@posthog.com?title=Cloud%20Large%20Volumes%20Enquiry">
                                        Contact us
                                    </a>
                                    .
                                </div>

                                <ul className="p-comparison-list">
                                    <li>Immediate start</li>
                                    <li>You don't have significant privacy requirements</li>
                                    <li>You don't want PostHog on your infrastructure</li>
                                    <li>You want an out-of-the-box secure solution.</li>
                                    <li>You want to get automatic updates with all the latest features.</li>
                                </ul>
                            </div>
                        )}
                    </Row>
                    <br />
                    <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                        <Col span={24}>
                            <div ref={comparisonRef} id="comparison"></div>
                            <h2>Full Comparison</h2>
                        </Col>
                        <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
                            <table>
                                <tr>
                                    <th>
                                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                                        Cloud
                                    </th>
                                    <th>
                                        <img src={imgEnterprise2} alt="" width="50px" />
                                        VPC
                                    </th>
                                    <th>
                                        <img src={imgOpenSource} alt="" width="50px" />
                                        Open Source
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <strong>Deployment</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>On PostHog's infrastructure</td>
                                    <td>On your infrastructure</td>
                                    <td>On your infrastructure</td>
                                </tr>
                                <tr>
                                    <td>Constant price</td>
                                    <td>Cheaper at scale</td>
                                    <td>Free but doesn't scale</td>
                                </tr>
                                <tr>
                                    <td>Scales to millions+ of users</td>
                                    <td>Scales to millions+ of users</td>
                                    <td>Scales to a few thousand users</td>
                                </tr>
                                <tr>
                                    <td>Managed by PostHog</td>
                                    <td>Managed by PostHog</td>
                                    <td>Managed by you</td>
                                </tr>
                                <tr>
                                    <td>Instant to deploy</td>
                                    <td>1-3 days to deploy</td>
                                    <td>Instant to deploy</td>
                                </tr>

                                <tr>
                                    <td>User data leaves your infrastructure</td>
                                    <td>No user data leaves your infrastructure</td>
                                    <td>No user data leaves your infrastructure</td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                        <strong>Building on PostHog</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>10+ SDKs for event capture</td>
                                    <td>10+ SDKs for event capture</td>
                                    <td>10+ SDKs for event capture</td>
                                </tr>
                                <tr>
                                    <td>Plugins</td>
                                    <td>Plugins</td>
                                    <td>Plugins</td>
                                </tr>
                                <tr>
                                    <td>Data lake export</td>
                                    <td>Data lake export</td>
                                    <td>Data lake export</td>
                                </tr>
                                <tr>
                                    <td>CSV export</td>
                                    <td>CSV export</td>
                                    <td>CSV export</td>
                                </tr>
                                <tr>
                                    <td>API access</td>
                                    <td>Database and API access</td>
                                    <td>Database and API access</td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                        <strong>Features</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Event data pipeline</td>
                                    <td>Event data pipeline</td>
                                    <td>Event data pipeline</td>
                                </tr>
                                <tr>
                                    <td>Event autocapture</td>
                                    <td>Event autocapture</td>
                                    <td>Event autocapture</td>
                                </tr>
                                <tr>
                                    <td>Trends</td>
                                    <td>Trends</td>
                                    <td>Trends</td>
                                </tr>
                                <tr>
                                    <td>Funnels</td>
                                    <td>Funnels</td>
                                    <td>Funnels</td>
                                </tr>
                                <tr>
                                    <td>Retention</td>
                                    <td>Retention</td>
                                    <td>Retention</td>
                                </tr>
                                <tr>
                                    <td>Session recording</td>
                                    <td>Session recording</td>
                                    <td>Session recording</td>
                                </tr>
                                <tr>
                                    <td>7 year data retention</td>
                                    <td>Custom data retention</td>
                                    <td>Custom data retention</td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                        <strong>Your team</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Unlimited users</td>
                                    <td>Unlimited users</td>
                                    <td>Unlimited users</td>
                                </tr>
                                <tr>
                                    <td>User permissioning</td>
                                    <td>User permissioning</td>
                                    <td>No user permissioning</td>
                                </tr>
                                <tr>
                                    <td>Limited SSO</td>
                                    <td>SSO</td>
                                    <td>No SSO</td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                        <strong>Support</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dedicated Slack Channel</td>
                                    <td>Dedicated Slack Channel</td>
                                    <td>Community Slack</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>Email</td>
                                    <td>No email support</td>
                                </tr>
                                <tr>
                                    <td>Account Manager</td>
                                    <td>Account Manager</td>
                                    <td>No account management</td>
                                </tr>
                            </table>
                            <Col md={12} sm={24}>
                                <div className="p-full-height">
                                    <h4 className="p-text-primary p-title-with-icon">
                                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                                        Cloud
                                    </h4>
                                    <ul className="p-comparison-list">
                                        <li>Immediate start</li>
                                        <li>
                                            Recommended if you want to get started <b>right now</b>. Start capturing
                                            events in under 5 minutes.
                                        </li>
                                        <li>
                                            You don’t own or want to own your own technical infrastructure.
                                            <b> We’ll handle everything for you.</b>
                                        </li>
                                        <li>You want an out-of-the-box secure solution.</li>
                                        <li>You want to get automatic updates with all the latest features.</li>
                                    </ul>
                                    <div className="p-comparison-btn">
                                        <a href="https://app.posthog.com/signup">
                                            <Button type="primary" size="large">
                                                Start free
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} sm={24}>
                                <div className="p-full-height">
                                    <h4 className="p-text-primary p-title-with-icon">
                                        <img src={imgBuilding} alt="" /> VPC
                                    </h4>
                                    <ul className="p-comparison-list">
                                        <li>
                                            Recommended if you have large volumes of events or users (
                                            {'>10k monthly users'}).
                                        </li>
                                        <li>
                                            You don't want user data to leave your infrastructure (e.g. HIPAA, SOC2).
                                        </li>
                                        <li>You need full access to the production instance.</li>
                                        <li>
                                            You are concerned with browser privacy features, ad blockers, or third-party
                                            cookie blockers.
                                        </li>
                                    </ul>
                                    <div className="p-comparison-btn">
                                        <Button
                                            type="primary"
                                            size="large"
                                            href="mailto:sales@posthog.com?title=Start vpc deployment"
                                        >
                                            Contact sales
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
                        <Col span={24}>
                            <h2>Frequently asked questions</h2>
                        </Col>
                        <Col span={24} className="p-faqs">
                            <Collapse bordered={false}>
                                {faqs.map((faq, i) => (
                                    <Panel header={faq.q} key={i}>
                                        {faq.a}
                                    </Panel>
                                ))}
                            </Collapse>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
                        <Col span={24} id="non-profits">
                            <Card>
                                <h4 className="text-center">Are you a non-profit?</h4>
                                We're committed to helping non-profit organizations and we're offering a{' '}
                                <b>50% discount off any of our plans</b>, as part of our commitment to supporting these
                                organizations. To redeem:{' '}
                                <ol className="redemption-instructions">
                                    <li>
                                        <a href="https://app.posthog.com/signup?utm_campaign=pricing-non-profits&utm_medium=landing-website">
                                            Sign up
                                        </a>{' '}
                                        for a regular PostHog account.
                                    </li>
                                    <li>
                                        Go to{' '}
                                        <a href="https://app.posthog.com/organization/billing?utm_campaign=pricing-non-profits&utm_medium=landing-website">
                                            Billing
                                        </a>
                                        , activate the <i>Standard plan</i> and enter your card billing information.
                                    </li>
                                    <li>
                                        Send us an email to{' '}
                                        <a href="mailto:sales@posthog.com?subject=Non-profit%20plan">
                                            sales@posthog.com
                                        </a>{' '}
                                        from the email address you used to register, and include some details about your
                                        organization.
                                    </li>
                                    <li>We'll apply the 50% discount to your account.</li>
                                </ol>
                                <div>
                                    To redeem the offer for VPC plans just{' '}
                                    <a href="mailto:sales@posthog.com?subject=Non-profit%vpc%20plan">
                                        send us an email
                                    </a>
                                    .
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
                        <Col span={24} align="middle">
                            <h2 className="p-text-primary">Ready to get started?</h2>
                            <a href="https://app.posthog.com/signup">
                                <Button type="primary" size="large">
                                    Create my free account
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    )
}

export default PricingPage
