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
import Col from 'antd/lib/col'
import { connect } from 'react-redux'
import { isSidebarHide, isAnchorHide } from '../../store/selectors'
import blogBackground from '../../images/blog-background.svg'
import { withPrefix } from "gatsby-link"

const isBlogPage = 
({location }) => {
  if (location.pathname === withPrefix ("/blog")){
    return true
  } else {
    return false
  }
}

class Layout extends Component {
  setPostPageState = state => {
    this.props.setPostPageState(state)
  }

  render() {
    const {
      children,
      onPostPage,
      sidebarHide,
      anchorHide,
      className,
      containerStyle={},
      expandedKeys,
      isBlogPage,
      pageTitle
    } = this.props

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
            <MediaQuery maxWidth={1076}>
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
                  <AntdLayout theme="light">
                    {!screenIsSmall && onPostPage && (
                      !sidebarHide && !isBlogPage && (
                      <AntdLayout.Sider width="300" theme="light" className="sidebar">
                        <ResponsiveSidebar/>
                        </AntdLayout.Sider>
                      ))}

                      <AntdLayout theme="light">
                        <AntdLayout.Header
                        className={"menuHeader " + (isBlogPage ? ("blog-post") : (" "))}
                        style={{ 
                          backgroundColor: screenIsSmall && onPostPage ? '#F0F0F0' : '#fff', 
                          backgroundPosition: isBlogPage && !screenIsSmall && 'left bottom',
                          backgroundSize: 'cover',
                          height: 'auto',
                          padding: screenIsSmall && 0,
                          marginBottom: isBlogPage && '2rem'
                        }}
                        theme="light"
                        >
                          <Header
                          siteTitle={data.site.siteMetadata.title}
                          sidebarDocked={!screenIsSmall}
                          sidebarHide={sidebarHide}
                          onPostPage={onPostPage}
                          screenIsSmall={screenIsSmall}
                          isBlogPage={isBlogPage}
                          theme="light"
                          />  
                          {screenIsSmall &&
                            onPostPage &&
                            (!anchorHide || !sidebarHide) && (
                                <ResponsiveTopBar />
                            )}
                          {isBlogPage && !screenIsSmall &&
                          <div style={{
                            position: 'relative',
                            height: 'calc(100% - 64px)', 
                            top: 0,
                            width: '80%', 
                            color: 'white', 
                            verticalAlign: 'bottom',
                            left: 'calc((100% - 960px) * 0.5 + 2.175rem)'}}
                            >

                            <h1 align="left" style={{
                              position: 'absolute',
                              color: 'white',  
                              bottom: 0
                              
                            }} >
                              {pageTitle}
                            </h1>
                          </div>
                          }
                        </AntdLayout.Header>

                      {/* content */}
                      {!screenIsSmall && onPostPage ? (
                        isBlogPage ? (
                        <AntdLayout theme="light" style={{ backgroundColor: '#fff', width: "100%", align: 'center'}}>
                          <AntdLayout.Content className="layoutContent">
                            <Container
                              sidebarDocked={!screenIsSmall}
                              onPostPage={onPostPage}
                              className={className}
                              style={{ position: 'relative' }}
                              containerStyle={containerStyle}
                            >
                              {children}
                            </Container>
                          </AntdLayout.Content>
                          
                          {/* Sidebar right */}
                          {!anchorHide && (
                            <AntdLayout.Sider
                              theme="light"
                              style={{ height: '100%', backgroundColor: '#fff' }}
                              className="sidebarRight"
                              
                            >
                              <ResponsiveAnchor />
                            </AntdLayout.Sider>
                          )}
                        </AntdLayout>
                        ) : (
                        <AntdLayout theme="light">
                          <AntdLayout.Content>
                            <Container
                              sidebarDocked={!screenIsSmall}
                              onPostPage={onPostPage}
                              className={className}
                              style={{ position: 'relative' }}
                              containerStyle={containerStyle}
                            >
                              {children}
                            </Container>
                          </AntdLayout.Content>
                          
                          {/* Sidebar right */}
                          {!anchorHide && (
                            <AntdLayout.Sider
                              theme="light"
                              className="sidebarRight"
                              
                            >
                              <ResponsiveAnchor />
                            </AntdLayout.Sider>
                          )}
                        </AntdLayout>
                        )) : (
                        <AntdLayout theme="light">
                          <AntdLayout.Content

                          >
                            <Container
                              sidebarDocked={!screenIsSmall}
                              onPostPage={onPostPage}
                              className={className}
                              style={{ position: 'relative' }}
                              containerStyle={containerStyle}
                            >
                              {children}
                            </Container>
                          </AntdLayout.Content>
                        </AntdLayout>
                      )}
                      </AntdLayout>
                  </AntdLayout>
                  <AntdLayout>
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
  className: PropTypes.string,
  containerStyle: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    sidebarHide: isSidebarHide(state),
    anchorHide: isAnchorHide(state),
  }
}

export default connect(mapStateToProps)(Layout)
