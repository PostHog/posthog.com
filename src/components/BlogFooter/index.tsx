import React from 'react'
import { Row, Col, Button } from 'antd'
import coolHedgehog from '../../images/cool-hedgehog.svg'
import { Spacer } from '../Spacer'
import { useActions } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import './style.scss'

export function BlogFooter() {
    const { setIsGetStartedModalOpen } = useActions(layoutLogic)

    return (
        <div className="blog-footer-cta-wrapper">
            <hr className="blog-footer-divider" />
            <Spacer />

            <Row className="blog-footer-row">
                <Col span={8}>
                    <img src={coolHedgehog} className="centered blog-footer-img" height={170} />
                </Col>
                <Col span={14}>
                    <div style={{ marginLeft: 40 }}>
                        <h4 style={{ color: '#0a0a0a' }}>About PostHog</h4>
                        <p className="blog-footer-description">
                            PostHog is an open core product analytics platform that you can self-host, offering features
                            like session recording, feature flags, and heatmaps.
                        </p>
                        <Button
                            type="primary"
                            className="blog-footer-btn"
                            onClick={() => setIsGetStartedModalOpen(true)}
                        >
                            Get Started For Free
                        </Button>
                    </div>
                </Col>
                <Col span={2} className="blog-footer-spacer-row-desktop" />
            </Row>
            <Spacer />
        </div>
    )
}
