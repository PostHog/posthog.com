import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import { Row, Col, Button, Icon } from 'antd';
import SEO from '../components/seo';

const TrialPage = () => (
  <Layout>
  <SEO
      title='PostHog Trial'
      description='Get started, for free.'
    />
    <Row gutter={[24, 24]}>
      <Col span={24} align="middle">
        <h1>Try PostHog - free for 30 days</h1>
      </Col>
    </Row>
    <Row gutter={[16, 96]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <h2><Icon type="cloud" theme="filled" /> SaaS / Cloud</h2>
        <h3>SaaS hosted by PostHog.</h3>
        <p>Select this option if you want to quickly try the PostHog features and don't want to worry about installing it yourself.</p>
        <p>
          <a href="https://app.posthog.com/signup">
            <Button type="primary" size="large">SaaS / Cloud</Button>
          </a>
        </p>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <h2><Icon type="hdd" theme="filled" /> Self Deploy</h2>
        <h3>Host your own instance of PostHog.</h3>
        <p>Select this option if you want to install PostHog on your own infrastructure.</p>
        <p>
          <Link to="/docs/deployment">
            <Button type="primary" size="large">Self Deployed</Button>
          </Link>
        </p>
      </Col>
    </Row>
    <Row className="spacer-row">

    </Row>
  </Layout>
)

export default TrialPage