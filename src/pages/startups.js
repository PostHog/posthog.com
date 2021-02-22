import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/select/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/layout/style/css'
import { Link } from 'gatsby'
import trends from '../images/product-screenshots/product-trends.png'
import benHorowitz from '../images/ben-horowitz.jpg'
import michaelSeibel from '../images/michael-seibel.jpg'
import paulGraham from '../images/paul-graham.jpg'
import { Col, Row, Card, Tabs } from 'antd'
import { SEO } from '../components/seo'

const { TabPane } = Tabs
const { Meta } = Card

const StartupsPage = () => {
    useEffect(() => {
        if (window) {
            window.location.href = '/pricing#startup-plan'
        }
    }, [])
    return (
        <Layout className="index-page">
            <SEO title="PostHog for Startups" description="We offer a special deal - startups get going for free." />
            <Row gutter={[24, 8]}>
                <Col span={24} className="gutter-row">
                    <h2 className="large-header">
                        Find product market fit.
                        <br />
                        Completely free.
                    </h2>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={16} className="gutter-row">
                    <p>Customer data is critical to building something people want.</p>
                    <p>
                        We are giving early-stage startups PostHog's premium features for free for up to 12 months -
                        along with other perks. <b>Our only ask?</b> Have a quick 30-min call every quarter with us.
                        Your input will be super helpful to help us improve our product.
                    </p>
                </Col>
            </Row>
            <Row gutter={[24, 8]}>
                <Col xs={7} sm={6} md={5} lg={4} xl={4} className="gutter-row">
                    <Link to="startups#apply_section">
                        <Button type="primary" size="large" icon="right-circle" style={{ marginRight: 10 }}>
                            Apply Now
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={24} className="gutter-row header-row" align="middle">
                    <h2>Understand your users</h2>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={12} className="gutter-row">
                    <h3>Let engineers focus on product not tracking</h3>
                    <p>
                        PostHog autocaptures events and user behavior in your mobile or web app, so there's no need to
                        add tracking to every element.
                    </p>
                    <p>Know what every user is doing in your app, view trends and funnels, and measure retention.</p>
                </Col>
                <Col span={12} className="gutter-row">
                    <p>
                        <img alt="trends" src={trends} className="shadow" />
                    </p>
                </Col>
            </Row>
            <Row className="gutter-row" justify="center" align="middle">
                <Col span={24} className="gutter-row" justify="center" align="middle">
                    <h2 align="middle" className="icons-header header-row">
                        Product analytics are key
                    </h2>
                </Col>
            </Row>
            <Row justify="center">
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ maxWidth: 300 }} cover={<img alt="Ben Horowitz" src={benHorowitz} />}>
                        <Meta
                            title="Ben Horowitz"
                            description='"Have everyone agree to the same growth goals to support your revenue, and magical things will happen."'
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ maxWidth: 300 }} cover={<img alt="Michael Seibel" src={michaelSeibel} />}>
                        <Meta
                            title="Michael Seibel"
                            description='"Using Google Analytics as your primary metrics product? You are doing it wrong."'
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ maxWidth: 300 }} cover={<img alt="Paul Graham" src={paulGraham} />}>
                        <Meta
                            title="Paul Graham"
                            description='"You make what you measure. Merely measuring something has an uncanny tendency to improve it."'
                        />
                    </Card>
                </Col>
            </Row>
            <Row className="gutter-row" justify="center" align="middle">
                <Col span={24} className="gutter-row" justify="center" align="middle">
                    <h2 align="middle" className="icons-header header-row">
                        The deal
                    </h2>
                </Col>
            </Row>
            <Row gutter={[16, 96]}>
                <Tabs type="card">
                    <TabPane tab="Option 1: 🏢 Supported Self-Deploy" key="1">
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card bordered={false}>
                                        <h4>12 months free</h4>
                                        <li>PostHog will manage your deployment for you, on your infrastructure</li>
                                        <li>Unlimited users</li>
                                        <li>Unlimited event volumes</li>
                                        <li>Unlimited history</li>
                                        <li>Full user data control</li>
                                        <li>No adblocker data loss</li>
                                        <li>
                                            After 12 months, manage it yourself for free, or have the PostHog team
                                            continue to support your deployment
                                        </li>
                                        <li>
                                            <b>Our ask: </b> Have a quick 30-min call with us every quarter to help us
                                            improve.
                                        </li>
                                        <p>
                                            <Link to="startups#apply_section">
                                                <Button type="primary">Apply</Button>
                                            </Link>
                                        </p>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane tab="Option 2: ☁️ SaaS / Hosted" key="2">
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card bordered={false}>
                                        <h4>12 months free</h4>
                                        <li>PostHog will host the app for you</li>
                                        <li>Unlimited users</li>
                                        <li>Up to 20 million events/month</li>
                                        <li>12 months data history</li>
                                        <li>Community support</li>
                                        <li>After 12 months, we charge based on event volumes</li>
                                        <li>
                                            <b>Our ask: </b> Have a quick 30-min call with us every quarter to help us
                                            improve.
                                        </li>
                                        <p>
                                            <Link to="startups#apply_section">
                                                <Button type="primary">Apply</Button>
                                            </Link>
                                        </p>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                </Tabs>
            </Row>
            <Row className="gutter-row" justify="center" align="middle">
                <Col span={24} className="gutter-row" justify="center" align="middle">
                    <h2 align="middle" className="icons-header header-row">
                        FAQ
                    </h2>
                </Col>
            </Row>
            <Row justify="center" gutter={(16, 16)}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="What's included?"
                            description="You can choose either to have PostHog's team support your own deployment of PostHog - with $20K of credits. Or, you can use PostHog hosted, with up to 20 million events per month."
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="How do I qualify?"
                            description="You need to have raised less than $5M in funding, and your company must be under 3 years old."
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="What happens afterwards?"
                            description="If you're using PostHog SaaS, you can pay based on event volumes. If you're using PostHog Supported Self-Deploy, you can either have us keep managing the deployment for you, or you can manage it yourself for free."
                        />
                    </Card>
                </Col>
            </Row>
            <Row justify="center" gutter={(16, 16)} style={{ marginTop: 16 }}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="Which deal should I choose?"
                            description="You can choose either to have PostHog's team support your own deployment of PostHog - with $20K of credits. Or, you can use PostHog hosted, with up to 20 million events per month."
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="Is the process instant?"
                            description="We'll send you an email within 24 hours of receiving your application to apply the discount."
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card style={{ width: 300, minHeight: 200 }}>
                        <Meta
                            title="Do I have to provide card details?"
                            description="Yes, in order to get the PostHog for Startups discount, we ask for your card details so if at the end you decide to move onto a paid plan, the switchover is seamless. You can cancel any time."
                        />
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default StartupsPage
