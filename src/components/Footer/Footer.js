import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'

const FooterListItem = props => (
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
        <Row gutter={[24, 8]} justify="space-around" style={{margin: 0}}>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} className="gutter-row">
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} className="gutter-row">
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
              <span className="footer-links-header" justify="space-around">Why PostHog</span>
              <FooterListItem to="/product-features">Features</FooterListItem>
              <FooterListItem to="/pricing">Pricing</FooterListItem>
              <FooterListItem to="/faq">FAQ</FooterListItem>
              <FooterListItem to="/startups">PostHog for Startups</FooterListItem>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
              <span className="footer-links-header">Resources</span>
              <FooterListItem to="/docs/deployment">Quick Start</FooterListItem>
              <FooterListItem to="/docs">Docs</FooterListItem>
              <FooterListItem to="/blog">Blog</FooterListItem>
              <FooterListItem to="/newsletter">Newsletter</FooterListItem>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
              <span className="footer-links-header">Community</span>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/graphs/contributors">
                  Contributors
                </a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/posthog/posthog">Source code</a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/posthog">Explore repositories</a>
              </FooterListItem>
              <FooterListItem to="/handbook/roadmap">Roadmap</FooterListItem>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/blob/master/CONTRIBUTING.md">
                  Contribute
                </a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/issues">Issues</a>
              </FooterListItem>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
              <span className="footer-links-header">Support</span>
              <FooterListItem to="/support">Support</FooterListItem>
              <FooterListItem><a href="mailto:sales@posthog.com">Contact sales</a></FooterListItem>
              <FooterListItem to="/status">Status</FooterListItem>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row">
              <span className="footer-links-header">Company</span>
              <FooterListItem to="/handbook/story">About</FooterListItem>
              <FooterListItem to="/handbook">Handbook</FooterListItem>
              <FooterListItem to="/careers">Careers</FooterListItem>
              <FooterListItem to="/handbook/investors">Investors</FooterListItem>
              <FooterListItem to="/media">Media</FooterListItem>
              <FooterListItem to="/terms">Terms</FooterListItem>
            </Col>
          </Col>
          <Col xs={0} sm={0} md={0} lg={4} xl={4} className="gutter-row">
          </Col>
        </Row>
      </div>
    )
  }
}

export default Footer
