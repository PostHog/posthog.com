import React from 'react'
import Layout from '../components/Layout'
import { Row, Col, Button, Icon, Card } from 'antd';

import installHeroku from "../images/install-heroku.png";
import installDocker from "../images/install-docker.png";
import installAws from "../images/install-aws.png";
import installKubernetes from "../images/install-kubernetes.png";

const InstallPage = () => (
  <Layout>
    <Row gutter={[24, 24]}>
      <Col span={24} align="middle">
        <h1>Install</h1>
      </Col>
    </Row>
    <Row gutter={[16, 96]}>
      <Col span={8} height="300px">
        <Card title='fuck of' cover={
          <img src={installHeroku} height="200px" width="100%"/>
        }>
        </Card>
      </Col>
      <Col span={8} height="100%">
        <Card title='fuck of' cover={
          <img src={installDocker} />
        }>
        </Card>
      </Col>
      <Col span={8}>
        <Card title='fuck of' cover={
          <img src={installAws} />
        }>
        </Card>
      </Col>
      <Col span={8}>
        <Card title='fuck of' cover={
          <img src={installKubernetes} />
        }>
        </Card>
      </Col>
    </Row>
    <Row className="spacer-row">

    </Row>
  </Layout>
)

export default InstallPage