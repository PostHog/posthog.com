import React, { Fragment, useRef, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import TeamMember from 'components/TeamMember'


export default function Credits(): JSX.Element {
  const fieldsets = [
    // {
    //   legend: "Company",
    //   items: [
    //     { label: "Employees", value: "###" },
    //     { label: "Customers", value: "150,000" }
    //   ]
    // },

    // {
    //   legend: "Website",
    //   items: [
    //     { label: "Framework", value: "Gatsby" },
    //     { label: "Hosting", value: "Vercel" },
    //     { label: "Assets", value: "Cloudinary" },
    //     // { label: "Search", value: "Algolia" },
    //     // { label: "AI", value: "Inkeep" },
    //     // { label: "CMS", value: "Strapi" },
    //     // { label: "Analytics", value: "PostHog" },
    //   ]
    // },

    {
      legend: "Credits",
      items: [
        {
          label: "Design",
          value: <TeamMember name="Cory Watilo" />
        },
        {
          label: "Graphics",
          value: <TeamMember name="Lottie Coxon" />
        },
        {
          label: "Development",
          value: (
            <>
              <TeamMember name="Eli Kinsey" />
              <TeamMember name="Cory Watilo" />
            </>
          )
        },
        {
          label: "Inspiration",
          value: (<>Apple, Inc.<br /> Microsoft, Inc.</>)
        },
      ]
    }
  ]

  return (
    <>
      <SEO
        title="Credits"
        description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
        image={`/images/og/product-analytics.jpg`}
      />
      <Wizard>
        <div className="bg-accent flex flex-col items-center p-6">
          <div className="flex flex-col items-center w-full mb-4">
            <figure data-skin="secondary" className="aspect-video bg-primary w-full border border-primary flex justify-center items-center mb-4 rounded">
              screenshot
            </figure>
            <h1 className="text-lg mb-1">PostHog.com</h1>
            <p className="text-sm text-secondary">Updated today at 3:23 PM</p>
          </div>

          {fieldsets.map((fieldset, index) => (
            <fieldset className="border-none mb-2 w-full" key={index}>
              <legend className="text-center bg-transparent font-medium text-secondary">{fieldset.legend}</legend>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2">
                {fieldset.items.map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <dt>
                      {item.label}
                    </dt>
                    <dd className="font-medium">
                      {item.value}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </fieldset>
          ))}

          <div className="mb-4">
            <CallToAction type="secondary" size="xs">More info</CallToAction>
          </div>

          <p className="text-sm text-secondary"><Link to="https://github.com/posthog/posthog.com" state={{ newWindow: true }} className="underline">Source code</Link></p>

          <p className="text-xs text-secondary">&copy;2025 PostHog Incorporated</p>

        </div>
      </Wizard>
    </>
  )
}
