import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
  <SEO
      title='404'
      description='Page not found. Alas.'
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness. Email hey@posthog.com and we'll fix it!</p>
  </Layout>
)

export default NotFoundPage
