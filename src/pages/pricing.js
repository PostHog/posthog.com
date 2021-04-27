import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card, Collapse } from 'antd'
import { SEO } from '../components/seo'
import './styles/pricing.scss'
import 'antd/lib/collapse/style/css'
import 'antd/lib/slider/style/css'
import { plans, faqs } from '../pages-content/pricing-data'
import imgCloud from '../images/cloud.svg'
import imgEnterprise1 from '../images/plan-enterprise1.svg'
import imgOpenSource from '../images/plan-open-source.svg'
import imgEnterprise2 from '../images/plan-enterprise2.svg'

import { PricingComparisonTable } from 'components/PricingComparisonTable'
import { PricingSlider } from 'components/PricingSlider'

const PricingPage = () => {
    const [state, setState] = useState({ planOptions: 'cloud' })
    const comparisonRef = useRef()
    const location = useLocation()
    const { Panel } = Collapse

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
                                <label className={state.planOptions === 'self-hosted' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="self-hosted"
                                        name="planOptions"
                                        checked={state.planOptions === 'self-hosted'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Self Hosted
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[24, 36]} type="flex" style={{ justifyContent: 'left', marginTop: '32px' }}>
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
                        {state.planOptions === 'self-hosted' && (
                            <div className="pricing-cloud">
                                <h4>For those that want flexibility.</h4>
                                <div></div>
                                <div>
                                    <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
                                        <table>
                                            <tr>
                                                <th>
                                                    <img
                                                        src={imgOpenSource}
                                                        alt=""
                                                        width="50px"
                                                        style={{ paddingRight: 0 }}
                                                    />
                                                    Open Source
                                                </th>
                                                <th>
                                                    <img src={imgEnterprise1} alt="" width="50px" />
                                                    Scale Free
                                                </th>
                                                <th>
                                                    <img src={imgEnterprise2} alt="" width="50px" />
                                                    Scale
                                                </th>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <strong>Scalability</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Postgres database only.
                                                    <br />
                                                    ~10k users/month
                                                </td>
                                                <td>
                                                    Clickhouse database. <br />
                                                    ~1m users/month
                                                </td>
                                                <td>Scalable Clickhouse database</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <strong>Your team</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Unlimited users</td>
                                                <td>3 users</td>
                                                <td>Unlimited users</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <strong>Support</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Community support</td>
                                                <td>Community support</td>
                                                <td>Dedicated support</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <strong>License</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>MIT License</td>
                                                <td>License key</td>
                                                <td>License key</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://app.posthog.com/signup">
                                                        <Button type="primary" size="large" href="/docs/deployment">
                                                            Start free
                                                        </Button>
                                                    </a>
                                                </td>
                                                <td>
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        href="mailto:sales@posthog.com?title=Free clickhouse deployment"
                                                    >
                                                        Contact us
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        href="mailto:sales@posthog.com?title=Scale deployment"
                                                    >
                                                        Contact sales
                                                    </Button>
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>
                                </div>

                                <h4>Scale pricing</h4>
                                <div>
                                    <PricingSlider pricingOption="vpc" />
                                </div>
                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    Minimum price <b>$2,000</b> / month. <b>No setup cost</b>.
                                </div>
                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    Want to get started or to discuss?{' '}
                                    <a href="mailto:sales@posthog.com?title=VPC%20Volumes%20Enquiry">Contact us</a>.
                                </div>

                                <ul className="p-comparison-list">
                                    <li>
                                        You want to export product data to your data lake from PostHog on the same
                                        infrastructure.
                                    </li>
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
                                    <PricingSlider pricingOption="cloud" />
                                </div>

                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    First <b>10,000 events are free</b> every single month.
                                </div>

                                <div style={{ fontSize: 16, marginTop: 16 }}>
                                    <a href="https://app.posthog.com/signup">
                                        <Button type="primary" size="large">
                                            Get started
                                        </Button>
                                    </a>
                                    <br />
                                    <br />
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
                        <PricingComparisonTable />
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
                        <Col span={24} align="middle">
                            <h2 className="p-text-primary">Just want to get started?</h2>
                            <a href="https://app.posthog.com/signup">
                                <Button type="primary" size="large">
                                    Get started
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
