import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card, Collapse } from 'antd'
import SEO from '../components/seo'
import './styles/pricing.css'
import 'antd/lib/collapse/style/css'
import imgCloud from '../images/cloud.svg'
import imgBuilding from '../images/building.svg'
import imgRocket from '../images/rocket.svg'
import imgChevronRight from '../images/chevron-right.svg'
import { plans, faqs } from '../pages-content/pricing-data.js'

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
        <Layout>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <Row gutter={[24, 24]}>
                <Col span={24} align="middle">
                    <h1 className="p-title p-text-primary pricing-header-text">
                        Affordable product analytics for everyone
                    </h1>
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
                        <label className={state.planOptions === 'self-managed' ? 'active' : ''}>
                            <input
                                type="radio"
                                value="self-managed"
                                name="planOptions"
                                checked={state.planOptions === 'self-managed'}
                                onChange={(event) => handleSegmentChange(event)}
                            />{' '}
                            Self-managed
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
                {plans[state.planOptions].map((plan) => (
                    <Col md={8} sm={24} align="middle" key={plan.title}>
                        {plan.popular && <div className="p-plan-popular-badge">POPULAR</div>}
                        <Card className="p-full-height">
                            <h3 className={(plan.popular ? 'p-text-primary ' : '') + 'p-plan-title'}>{plan.title}</h3>
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
                <Col span={24} align="middle">
                    All prices in US Dollars (USD), excluding taxes
                </Col>
                <Col span={24} align="middle">
                    <Link to="/docs/features" className="p-features-link">
                        Full features details <img alt="" src={imgChevronRight} />
                    </Link>
                </Col>
            </Row>
            <br />
            <Row gutter={[24, 24]}>
                <Col span={24} align="middle">
                    <Card className="p-startup-card">
                        <div>
                            <div>
                                <img src={imgRocket} alt="" />
                            </div>
                            <div className="p-main">
                                <h4>Are you a startup?</h4>
                                <span>
                                    We've got your back! Find product-market fit, <b>completely free</b> with a tool
                                    that does the legwork for you.
                                </span>
                            </div>
                            <div>
                                <Link to="/startups">
                                    <Button type="primary">Learn more</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                <Col span={24}>
                    <div ref={comparisonRef} id="comparison"></div>
                    <h2>Cloud vs. self-managed</h2>
                    <p>
                        Cloud or self-managed? We'd love to help you find the option that's <b>right for you</b>.
                    </p>
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
                                    Recommended if you want to get <b>started right now</b>. Start capturing events in
                                    under 5 minutes.
                                </li>
                                <li>
                                    You don’t own or want to own your own technical infrastructure.
                                    <b>We’ll handle everything for you.</b>
                                </li>
                                <li>You want an out-of-the-box secure solution.</li>
                                <li>You want to get automatic updates to all the latest features.</li>
                            </ul>
                            <div className="p-comparison-btn">
                                <a href="https://app.posthog.com/signup?plan=growth">
                                    <Button type="primary" size="large">
                                        Start my 30-day free trial
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} sm={24}>
                        <div className="p-full-height">
                            <h4 className="p-text-primary p-title-with-icon">
                                <img src={imgBuilding} alt="" /> Self-managed
                            </h4>
                            <ul className="p-comparison-list">
                                <li>
                                    Recommended if you have large volumes of events or users (in the tens of millions).
                                </li>
                                <li>
                                    If you have heavy compliance requirements on privacy or data handling (e.g. HIPAA,
                                    SOC2).
                                </li>
                                <li>
                                    If your team has technical expertise and/or already manages your own cloud
                                    infrastructure.
                                </li>
                                <li>
                                    You are concerned with browser privacy features, ad blockers or third-party cookie
                                    blockers.
                                </li>
                            </ul>
                            <div className="p-comparison-btn">
                                <Link to="/docs/deploy">
                                    <Button type="primary" size="large">
                                        Start deployment
                                    </Button>
                                </Link>
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
                <Col span={24} align="middle">
                    <h2 className="p-text-primary">Ready to get started?</h2>
                    <a href="https://app.posthog.com/signup?plan=free">
                        <Button type="primary" size="large">
                            Create my free account
                        </Button>
                    </a>
                </Col>
            </Row>
        </Layout>
    )
}

export default PricingPage
