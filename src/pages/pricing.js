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

const PricingPage = () => {
    const [state, setState] = useState({ planOptions: 'cloud', unitPricing: '0.000225' })
    const [priceSimulation, setPriceSimulation] = useState(250000)
    const comparisonRef = useRef()
    const location = useLocation()
    const { Panel } = Collapse

    function checkScale(value, unitPricing) {
        if (value < 10000000) {
            unitPricing = 0.000225
        } else if (value >= 10000000 && value < 100000000) {
            unitPricing = 0.000045
        } else {
            unitPricing = 0.000009
        }

        setState({ ...state, unitPricing: unitPricing })
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
                                    Open source
                                </label>
                            </div>
                            <div style={{ paddingTop: '16px' }}>
                                <a
                                    href="#comparison"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        comparisonRef.current.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                    }}
                                >
                                    What is the difference?
                                </a>
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
                                            onChange={
                                                ((value) => setPriceSimulation(value), (value) => checkScale(value))
                                            }
                                        />
                                        <div style={{ fontSize: '1rem', textAlign: 'right' }}>
                                            {priceSimulation < 10000000 ? (
                                                <>
                                                    <span className="text-muted">Price:</span>{' '}
                                                    <b>${Math.round(priceSimulation * 0.000225).toLocaleString()}</b>
                                                    /month
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-muted">Price:</span>{' '}
                                                    <b>
                                                        $
                                                        {Math.round(
                                                            10000000 * 0.000225 +
                                                                (priceSimulation - 10000000) * 0.000045
                                                        ).toLocaleString()}
                                                    </b>
                                                    /month
                                                </>
                                            )}
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
                                            {priceSimulation < 1000000000 ? (
                                                <>
                                                    <span className="text-muted">Price:</span>{' '}
                                                    <b>
                                                        $
                                                        {Math.round(
                                                            (priceSimulation - 10000) * 0.000225
                                                        ).toLocaleString()}
                                                    </b>
                                                    /month
                                                </>
                                            ) : (
                                                <>
                                                    <a href="mailto:sales@posthog.com?title=Cloud%20Large%20Volumes%20Enquiry">
                                                        Contact us
                                                    </a>{' '}
                                                    to talk pricing.
                                                </>
                                            )}
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
                            </div>
                        )}
                    </Row>
                    <br />
                    <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                        <Col span={24}>
                            <div ref={comparisonRef} id="comparison"></div>
                            <h2>Cloud vs. VPC</h2>
                        </Col>
                        <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
                            <Col md={12} sm={24}>
                                <div className="p-full-height">
                                    <h4 className="p-text-primary p-title-with-icon">
                                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                                        Cloud
                                    </h4>
                                    <ul className="p-comparison-list">
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
