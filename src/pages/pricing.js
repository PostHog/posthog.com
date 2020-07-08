import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card } from 'antd'
import SEO from '../components/seo'
import './pricing.css'
import imgCloud from '../images/cloud.svg'
import imgBuilding from '../images/building.svg'
import imgRocket from '../images/rocket.svg'
import imgChevronRight from '../images/chevron-right.svg'

const PricingPage = () => {
  const [state, setState] = useState({ planOptions: 'cloud' })
  const comparisonRef = useRef()
  const location = useLocation()
  const plans = {
    cloud: [
      {
        title: 'Free',
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description: 'Ideal if you’re just getting started with your product',
        callToAction: 'Create free account',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup',
        },
        benefits: [
          'Capture up to <b>5,000 events/month</b>',
          '<b>All analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>Unlimited</b> team members',
          '90 day data retention',
          'Community support',
        ],
      },
      {
        title: 'Growth',
        popular: true,
        price: '$29',
        priceDetail: '/month',
        description: 'Ideal for scaling companies with higher usage',
        callToAction: 'Start my 30-day free trial',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Free, plus:</span>',
          'Up to <b>500,000 events/month</b>',
          '12 month data retention',
          'Email support',
        ],
      },
      {
        title: 'Enterprise',
        popular: false,
        price: 'Custom',
        priceDetail: 'contact us',
        description: 'Ideal for large companies with millions of users',
        callToAction: 'Contact sales',
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Growth, plus:</span>',
          'Capture <b>unlimited</b> events',
          '<b>Unlimited</b> data retention',
          'Dedicated support',
        ],
      },
    ],
    'self-managed': [
      {
        title: 'Community',
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description:
          'Ideal if your team has technical expertise and handles large volumes of users or events',
        callToAction: 'Start deployment',
        callToActionType: 'primary',
        callToActionDest: {
          type: 'gatsbyLink',
          value: '/docs/deployment',
        },
        benefits: [
          'Capture <b>unlimited</b> events',
          '<b>All analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>Unlimited</b> team members',
          '<b>Unlimited</b> data retention',
          'Free updates for life (our code is <a href="https://github.com/posthog/posthog" target="_blank">open source</a>)',
          'Community support',
        ],
      },
      {
        title: 'Supported',
        popular: false,
        price: 'Starts at $2k',
        priceDetail: '/month',
        description:
          'Ideal for companies with large volumes that do not want the hassle of managing a tech infrastructure',
        callToAction: 'Contact sales',
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20self-managed%20supported%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Community, plus:</span>',
          'PostHog deploys and maintains everything (in your own infrastructure)',
          'Uptime and scalability SLAs',
          'Custom databases and integrations',
          'Dedicated support',
        ],
      },
    ],
  }

  const setOptionFromQS = () => {
    // On load, set the correct plan options (if applicable)
    const { o } = queryString.parse(location.search)
    if (o && o in plans) setState({ ...state, planOptions: o })
  }

  useEffect(setOptionFromQS, [])

  const handleSegmentChange = event => {
    const newOption = event.target.value
    const pushUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?o=${newOption}`
    window.history.pushState({ path: pushUrl }, '', pushUrl)
    setState({ ...state, planOptions: event.target.value })
  }

  const CTAButton = props => (
    <Button
      type={
        props.plan.callToActionType ||
        (props.plan.popular ? 'primary' : 'default')
      }
      size="large"
    >
      {props.plan.callToAction}
    </Button>
  )

  return (
    <Layout>
      <SEO
        title="PostHog Pricing"
        description="Find out how much it costs to use PostHog"
      />
      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <h1 className="p-title p-text-primary">
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
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Cloud
            </label>
            <label
              className={state.planOptions === 'self-managed' ? 'active' : ''}
            >
              <input
                type="radio"
                value="self-managed"
                name="planOptions"
                checked={state.planOptions === 'self-managed'}
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Self-managed
            </label>
          </div>
          <div style={{ paddingTop: '16px' }}>
            <a
              href="#comparison"
              onClick={event => {
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

      <Row
        gutter={[24, 36]}
        type="flex"
        style={{ justifyContent: 'center', marginTop: '32px' }}
      >
        {plans[state.planOptions].map(plan => (
          <Col md={8} sm={24} align="middle" key={plan.title}>
            {plan.popular && (
              <div className="p-plan-popular-badge">POPULAR</div>
            )}
            <Card className="p-full-height">
              <h3
                className={
                  (plan.popular ? 'p-text-primary ' : '') + 'p-plan-title'
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
                {plan.benefits.map(benefit => (
                  <span
                    key={benefit}
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  ></span>
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
      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <Card className="p-startup-card">
            <div>
              <img src={imgRocket} alt="" />
            </div>
            <div className="p-main">
              <h4>Are you a startup?</h4>
              <span>
                We got your back! Find product-market fit,{' '}
                <b>completely free</b> with a tool that does the legwork for
                you.
              </span>
            </div>
            <div>
              <Link to="/startups">
                <Button type="primary">Learn more</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col span={24}>
          <div ref={comparisonRef} id="comparison"></div>
          <h2>Cloud vs. self-managed</h2>
          <p>
            It is very important that you select the option that is{' '}
            <b>right for you</b>, below you will find some recommendations on
            which options to choose.
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
                  Recommended if you want to get <b>started right now</b>. Start
                  capturing events in under 5 minutes.
                </li>
                <li>
                  You don’t own or want to own your own technical
                  infrastructure.
                  <b>We’ll handle everything for you.</b>
                </li>
                <li>You want an out-of-the-box secure solution.</li>
                <li>
                  You want to get automatic updates to all the latest features.
                </li>
              </ul>
              <div className="p-comparison-btn">
                <a href="https://app.posthog.com/signup">
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
                  Recommended if you have large volumes of events or users (in
                  the tens of millions).
                </li>
                <li>
                  If you have heavy compliance requirements on privacy or data
                  handling (e.g. HIPAA, SOC2).
                </li>
                <li>
                  If your team has technical expertise and/or already manages
                  your own cloud infrastructure.
                </li>
                <li>
                  You are concerned with browser privacy features, ad blockers
                  or third-party cookie blockers.
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
        <Col span={24} align="middle">
          <h2 className="p-text-primary">Ready to get started?</h2>
          <a href="https://app.posthog.com/signup">
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
