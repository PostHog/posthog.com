import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { AppIcon, AppIconName, AppLink } from 'components/OSIcons/AppIcon'
import { Accordion } from 'components/RadixUI/Accordion'
import ZoomHover from 'components/ZoomHover'
import { IconPresentation } from 'components/OSIcons'
import { productMenu } from '../../navs'
import { PRODUCT_COUNT } from '../../constants'

// Create selectOptions for the address bar
const selectOptions = [
  {
    label: 'Products',
    items: [
      { value: 'products', label: 'Products', icon: productMenu.icon, color: productMenu.color },
      ...productMenu.children.flatMap((item) => {
        // Skip items without valid slugs
        if (!item.slug) return []

        // Add the base product
        return [
          {
            value: item.slug,
            label: item.name,
            icon: item.icon,
            color: item.color,
          },
        ]
      }),
    ],
  },
]

export default function FeetPics(): JSX.Element {

  return (
    <>
      <SEO
        title="Feet pics - PostHog"
        description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
        image={`/images/og/product-analytics.jpg`}
      />
      <Explorer
        template="generic"
        slug="feet-pics"
        title="Feet Pics"
        showTitle={false}
        selectOptions={selectOptions}
        // options below only needed to override matching the slug
        // teamName="product-analytics"
        // roadmapCategory="product-analytics"
        // changelogCategory="product-analytics"

        leftSidebarContent={[
          {
            title: 'Feet pics',
            content: (
              <>
                <p className="text-sm mb-0">
                  PostHog, the only Silicon Valley-backed SaaS company that gives you free feet pics.
                </p>
              </>
            ),
          },
          {
            title: 'Legal notice',
            content: (
              <>
                <p className="text-sm mb-0">
                  &copy; 2025 PostHog, Inc. Do not redistribute without permission. Each image is protected with an invisible watermark. Violators will be prosecuted to the fullest extent of the law.
                </p>
              </>
            ),
          },
        ]}
      >
        <div className="@md:pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-x-1 gap-y-4 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center">
          <AppLink
            label="employee #30200.jpg"
            Icon={<CloudinaryImage
              src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_tulum_f6092da65d.jpg"
              alt="employee #30200.jpg"
              className="w-full h-full object-cover"
              imgClassName="size-24"
            />}
            background="bg-primary"
            className={`size-24`}
          >
          </AppLink>

          <AppLink
            label="employee #30174.jpg"
            Icon={<CloudinaryImage
              src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_mykonos_bd4fe1a4dc.jpg"
              alt="employee #30174.jpg"
              className="w-full h-full object-cover"
              imgClassName="size-24"
            />}
            background="bg-primary"
            className={`size-24`}
          >
          </AppLink>

          <AppLink
            label="plenty of feet.jpg"
            Icon={<CloudinaryImage
              src="https://res.cloudinary.com/dmukukwp6/image/upload/plenty_of_feet_49ae3ecedc.jpg"
              alt="plenty of feet.jpg"
              className="w-full h-full object-cover"
              imgClassName="size-24"
            />}
            background="bg-primary"
            className={`size-24`}
          >
          </AppLink>
        </div>
      </Explorer>
    </>
  )
}
