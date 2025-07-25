import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CloudinaryImage from "components/CloudinaryImage"

export default function QuickCallsScript(): JSX.Element {
  return (
    <>
      <SEO title="quick calls script.txt – PostHog" description="" image={`/images/og/customers.jpg`} />
      <Editor
        showFilters
        title="quick calls script"
        type="txt"
        slug="/quick-calls-script"

      >
        <ScrollArea>
          <div className="bg-tan rounded-md relative @xl:float-right @xl:w-1/2 @xl:ml-4">
            <div className="dark:hidden">
              <CloudinaryImage
                quality={100}
                placeholder="none"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-light.png"
                className=""
                loading="eager"
                objectPosition="left top"
                objectFit="cover"
              />
            </div>
            <div className="hidden dark:block">
              <CloudinaryImage
                quality={100}
                placeholder="none"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-dark.png"
                className=""
                loading="eager"
                objectPosition="left top"
                objectFit="cover"
              />
            </div>
          </div>

          <p>
            Sorry, this doesn't actually exist because we don't force you to talk to anyone.
          </p>
          <p>But you can{' '}
            <Link to="/demo" state={{ newWindow: true }}>
              watch a recorded demo
            </Link>{' '}
            (at your own pace) or{' '}
            <Link to="/talk-to-a-human" state={{ newWindow: true }}>
              request a personalized demo
            </Link>{' '}
            if you like.
          </p>
          <p>
            You may also enjoy <Link href="/pricing#sales" state={{ newWindow: true }}>our in-depth comparison</Link> of how we do "sales" compared to everybody else.
          </p>
        </ScrollArea>
      </Editor>
    </>
  )
}
