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
import NewsletterForm from '../NewsletterForm'

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
                      <AntdLayout.Sider width="300" theme="light" className="sideBar" >
                        <ResponsiveSidebar/>
                        </AntdLayout.Sider>
                      ))}

                      <AntdLayout theme="light">
                        <AntdLayout.Header
                        className={"menuHeader " + (onPostPage && "docsHeader ") + (isBlogPage && "blogHeader")}
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
                          <div className="blogHeaderTitle">
                            <h1>
                              {pageTitle}
                            </h1>
                          </div>
                          }
                        </AntdLayout.Header>

                      {/* content */}
                        <AntdLayout 
                        className={"layout " + (onPostPage ? "docsPageLayout " : "notDocsLayout ") + (isBlogPage && "blogPageLayout")}
                        theme="light">
                          <AntdLayout.Content>
                            <Container
                              sidebarDocked={!screenIsSmall}
                              onPostPage={onPostPage}
                              className={className + " container"}
                              style={{ position: 'relative' }}
                              containerStyle={containerStyle}
                            >
                              {children}
                            </Container>
                          </AntdLayout.Content>
                          
                          {/* Sidebar right */}
                          {onPostPage && !anchorHide && !screenIsSmall && (
                            <AntdLayout.Sider
                              theme="light"
                              className="rightBar"
                            >
                              <ResponsiveAnchor />
                            </AntdLayout.Sider>
                          )}
                        </AntdLayout>
                      </AntdLayout>
                  </AntdLayout>
                  <AntdLayout>
                  {isBlogPage && (<NewsletterForm />)}
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
