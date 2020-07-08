import React, { useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import 'antd/lib/radio/style/css'
import { Row, Col, Button, Card } from 'antd'
import SEO from '../components/seo'
import './pricing.css'

const PricingPage = () => {
  const [state, setState] = useState({ planOptions: 'cloud' })
  const plans = {
    cloud: [
      {
        title: 'Free',
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description: 'Ideal if you’re just getting started with your product',
        callToAction: 'Create free account',
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
        benefits: [
          'Capture <b>unlimited</b> events',
          '<b>All analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>Unlimited</b> team members',
          '<b>Unlimited</b> data retention',
          'Free updates for life (our code is open source)',
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

  const handleSegmentChange = event => {
    setState({ ...state, planOptions: event.target.value })
  }

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
          <div
            className="p-segment"
            onChange={event => handleSegmentChange(event)}
          >
            <label className={state.planOptions === 'cloud' ? 'active' : ''}>
              <input
                type="radio"
                value="cloud"
                name="planOptions"
                defaultChecked
              />{' '}
              Cloud
            </label>
            <label
              className={state.planOptions === 'self-managed' ? 'active' : ''}
            >
              <input type="radio" value="self-managed" name="planOptions" />{' '}
              Self-managed
            </label>
          </div>
        </Col>
      </Row>

      <Row gutter={[24, 36]} type="flex" style={{ justifyContent: 'center' }}>
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
              <Button
                type={
                  plan.callToActionType ||
                  (plan.popular ? 'primary' : 'default')
                }
                size="large"
              >
                {plan.callToAction}
              </Button>
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
    </Layout>
  )
}

export default PricingPage
