import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link, navigate } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import 'antd/lib/radio/style/css'
import { Row, Col, Button, Card } from 'antd'
import SEO from '../components/seo'
import './pricing.css'

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

  useEffect(() => {
    // On load, set the correct plan options (if applicable)
    const { o } = queryString.parse(location.search)
    if (o && o in plans) setState({ ...state, planOptions: o })
  }, [])

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
            <Card className="p-plan">
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
      </Row>
      <Row gutter={[24, 24]}>
        <div ref={comparisonRef} id="comparison"></div>
        Cloud vs. Self-managed
      </Row>
    </Layout>
  )
}

export default PricingPage
