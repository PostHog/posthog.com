import React, { useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
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

          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px]">
            <div className="border-l border-t border-border bg-input font-bold">&nbsp;</div>
            <div className="bg-input font-bold">
              Company name
            </div>
            <div className="bg-input font-bold">
              Product(s) used
            </div>
            <div className="bg-input font-bold">
              Case study?
            </div>
            <div className="bg-input font-bold">
              Notes
            </div>

            <div className="">
              1
            </div>
            <div>
              Y Combinator
            </div>
            <div className="">
              Experiments, Analytics
            </div>
            <div className="">
              <Link href="/customers/ycombinator">Link</Link>
            </div>
            <div className="">
              &nbsp;
            </div>

            <div className="">
              2
            </div>
            <div>
              Mistral AI
            </div>
            <div className="max-w-[200px]">
              Experiments, Analytics
            </div>
            <div className="">
              &nbsp;
            </div>
            <div className="">
              &nbsp;
            </div>
          </div>
          
        </Editor>
      </>
    )
}
