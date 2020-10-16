import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'

const FooterListItem = (props) => (
    <div className="footer-li">
        {props.to ? (
            <Row>
                <Link to={props.to}>{props.children}</Link>
            </Row>
        ) : (
            props.children
        )}
    </div>
)

class Footer extends Component {
    render() {
        return (
            <div className="footer-universal">
                <Row gutter={[24, 8]} justify="space-around" style={{ margin: 0 }}>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} className="gutter-row"></Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16} className="gutter-row">
                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
                            <span className="footer-links-header" justify="space-around">
                                Why PostHog
                            </span>
                            <FooterListItem to="/product-features">Features</FooterListItem>
                            <FooterListItem to="/pricing">Pricing</FooterListItem>
                            <FooterListItem to="/faq">FAQ</FooterListItem>
                            <FooterListItem to="/pricing#startup-plan">PostHog for Startups</FooterListItem>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
                            <span className="footer-links-header">Resources</span>
                            <FooterListItem to="/docs/deployment">Quick Start</FooterListItem>
                            <FooterListItem to="/docs">Docs</FooterListItem>
                            <FooterListItem to="/blog">Blog</FooterListItem>
                            <FooterListItem to="/newsletter">Newsletter</FooterListItem>
                            <a href="https://merch.posthog.com/collections/all">Merch</a>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
                            <span className="footer-links-header">Community</span>
                            <FooterListItem>
                                <a
                                    href="https://github.com/PostHog/posthog/graphs/contributors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contributors
                                </a>
                            </FooterListItem>
                            <FooterListItem>
                                <a href="https://github.com/posthog/posthog" target="_blank" rel="noopener noreferrer">
                                    Source code
                                </a>
                            </FooterListItem>
                            <FooterListItem>
                                <a href="https://github.com/posthog" target="_blank" rel="noopener noreferrer">
                                    Explore repositories
                                </a>
                            </FooterListItem>
                            <FooterListItem>
                                <a
                                    href="https://github.com/orgs/PostHog/projects/1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Roadmap
                                </a>
                            </FooterListItem>
                            <FooterListItem>
                                <a
                                    href="https://github.com/PostHog/posthog/blob/master/CONTRIBUTING.md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contribute
                                </a>
                            </FooterListItem>
                            <FooterListItem>
                                <a
                                    href="https://github.com/PostHog/posthog/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Issues
                                </a>
                            </FooterListItem>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
                            <span className="footer-links-header">Support</span>
                            <FooterListItem to="/support">Support</FooterListItem>
                            <FooterListItem>
                                <a href="mailto:sales@posthog.com">Contact sales</a>
                            </FooterListItem>
                            <Row>
                                <a href="http://status.posthog.com" target="_blank" rel="noopener noreferrer">
                                    Status
                                </a>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
                            <span className="footer-links-header">Company</span>
                            <FooterListItem to="/handbook/company/story">About</FooterListItem>
                            <FooterListItem to="/handbook/company/team">Team</FooterListItem>
                            <FooterListItem to="/careers">Careers</FooterListItem>
                            <FooterListItem to="/handbook">Handbook</FooterListItem>
                            <FooterListItem to="/handbook/strategy/investors">Investors</FooterListItem>
                            <FooterListItem to="/media">Media</FooterListItem>
                            <FooterListItem to="/terms">Terms</FooterListItem>
                            <FooterListItem to="/privacy">Privacy</FooterListItem>
                        </Col>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} className="gutter-row"></Col>
                </Row>
            </div>
        )
    }
}

export default Footer
