import React, { useState } from 'react'
import SEO from 'components/seo'

import Editor from 'components/Editor'


export default function Customers(): JSX.Element {
    return (
      <>
        <SEO
            title="notable customers.mdx – PostHog"
            description=""
            image={`/images/og/customers.jpg`}
        />
        <Editor 
          title="notable customers.mdx"
        >

          page content is here
          
        </Editor>
      </>
    )
}
