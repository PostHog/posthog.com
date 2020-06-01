import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'
import ResponsiveSidebar from '../ResponsiveSidebar'
import Container from '../Container'
import ResponsiveAnchor from '../ResponsiveAnchor'
import ResponsiveTopBar from '../ResponsiveTopBar'
import MediaQuery from 'react-responsive'
import { default as AntdLayout } from 'antd/lib/layout'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { connect } from 'react-redux'
import { isSidebarHide, isAnchorHide } from '../../store/selectors'

class Layout extends Component {
  setPostPageState = state => {
    this.props.setPostPageState(state)
  }

  render() {
    const { children, onPostPage, sidebarHide, anchorHide, className } = this.props

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => {
          return (
            <MediaQuery maxWidth={1000}>
              {screenIsSmall => (
                <>
                  <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                      { name: 'description', content: 'Sample' },
                      { name: 'keywords', content: 'sample, something' },
                    ]}
                  >
                    <html lang="en" />
                  </Helmet>
                  <AntdLayout
                    style={{background: '#fff'}}
                    theme="light"
                  >
                    <AntdLayout.Header
                      style={{background: '#fff'}}
                      theme="light"
                    >
                      <Header
                        siteTitle={data.site.siteMetadata.title}
                        sidebarDocked={!screenIsSmall}
                        theme="light"
                      />
                      {screenIsSmall && onPostPage && (!anchorHide || !sidebarHide) && (
                        <Col>
                          {' '}
                          <ResponsiveTopBar />{' '}
                        </Col>
                      )}
                    </AntdLayout.Header>
                    {!screenIsSmall && onPostPage ? (
                      <AntdLayout.Content>
                        <AntdLayout theme="light" style={{background: '#fff'}}>
                          {!sidebarHide && (
                            <AntdLayout.Sider width={200} theme="light">
                              <ResponsiveSidebar />
                            </AntdLayout.Sider>
                          )}
                          <AntdLayout.Content
                          style={{minHeight: 280, padding: '3rem 0% 0 10%'}}
                          >
                            <Container
                              sidebarDocked={!screenIsSmall}
                              onPostPage={onPostPage}
                              className={className}
                              style={{ position: 'relative' }}
                            >
                              {children}
                            </Container>
                          </AntdLayout.Content>
                          {!anchorHide && (
                            <AntdLayout.Sider theme="light" style={{height: '100%'}}>
                              <ResponsiveAnchor />
                            </AntdLayout.Sider>
                          )}
                        </AntdLayout>
                      </AntdLayout.Content>
                    ) : (
                      <AntdLayout.Content
                        style={{
                          position: 'relative',
                          left: 0,
                          right: 0,
                          marginTop: 50,
                        }}
                      >
                        <Container
                          sidebarDocked={!screenIsSmall}
                          onPostPage={onPostPage}
                          className={className}
                          style={{ position: 'relative' }}
                        >
                          {children}
                        </Container>
                      </AntdLayout.Content>
                    )}
                    <Footer />
                  </AntdLayout>
                </>
              )}
            </MediaQuery>
          )
        }}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

const mapStateToProps = state => {
  return {
    sidebarHide: isSidebarHide(state),
    anchorHide: isAnchorHide(state),
  }
}

export default connect(mapStateToProps)(Layout)
