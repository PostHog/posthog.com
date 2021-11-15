import React from 'react'
import { Link } from '../components/Link'
import Layout from '../components/Layout'
import { Row, Col, Button, Icon } from 'antd'
import { SEO } from '../components/seo'
import './styles/trial.scss'

const TrialPage = () => (
    <Layout>
        <div className="trial-page-wrapper">
            <div className="trial-page-container">
                <SEO title="PostHog Trial" description="Get started, for free." />
                <Row gutter={[24, 24]}>
                    <Col span={24} align="middle">
                        <h1>Try PostHog - free for 30 days</h1>
                    </Col>
                </Row>
                <Row gutter={[16, 96]} className="card-row">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="card-col">
                        <h2>
                            <Icon type="cloud" theme="filled" /> Cloud
                        </h2>
                        <h3>Just create an account.</h3>
                        <p>
                            Select this option if you want to quickly try the PostHog features and don't want to worry
                            about installing it yourself.
                        </p>
                        <p>
                            <Link to="https://app.posthog.com/signup" addGclid>
                                <Button type="primary" size="large">
                                    Sign Up
                                </Button>
                            </Link>
                        </p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="card-col">
                        <h2>
                            <Icon type="hdd" theme="filled" /> Open Source
                        </h2>
                        <h3>Host your own instance.</h3>
                        <p>
                            Select this option if you want to install our open source platform on your own
                            infrastructure.
                        </p>
                        <p>
                            <Link to="/docs/self-host">
                                <Button type="primary" size="large">
                                    Self Deploy
                                </Button>
                            </Link>
                        </p>
                    </Col>
                </Row>
                <Row className="spacer-row"></Row>
            </div>
        </div>
    </Layout>
)

export default TrialPage
