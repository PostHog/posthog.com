import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import ReactPaint from 'components/ReactPaint'

export default function Paint(): JSX.Element {
  return (
    <>
      <SEO
        title="Paint - PostHog"
        description="Draw your best hedgehog."
        image={`/images/og/product-analytics.jpg`}
      />
      <Explorer
        template="generic"
        slug="paint"
        title="Paint"
        // options below only needed to override matching the slug
        // teamName="product-analytics"
        // roadmapCategory="product-analytics"
        // changelogCategory="product-analytics"

        fullScreen
      >
        <div className="@container reactpaint flex flex-col h-full">
          <ReactPaint />
        </div>
      </Explorer>
    </>
  )
}
