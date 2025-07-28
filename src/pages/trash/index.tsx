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

export default function Trash(): JSX.Element {

  return (
    <>
      <SEO
        title="Trash - PostHog"
        description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
        image={`/images/og/product-analytics.jpg`}
      />
      <Explorer
        template="generic"
        slug="trash"
        title="Trash"
        showTitle={false}
        selectOptions={selectOptions}
        // options below only needed to override matching the slug
        // teamName="product-analytics"
        // roadmapCategory="product-analytics"
        // changelogCategory="product-analytics"

        leftSidebarContent={[
          {
            title: 'Trash',
            content: (
              <>
                <p className="text-sm mb-0">
                  Files will never actually be deleted permanently because Internet Archive.
                </p>
              </>
            ),
          },

        ]}
      >
        {(() => {
          // Static data for trash items
          const trashData = {
            "recently_deleted": [
              {
                name: "Copy of whitepaper (2) - final FINAL.docx.pdf",
                slug: "copy-of-whitepaper-final",
                url: "/Copy of whitepaper (2) - final LATEST.docx.pdf",
                extension: "pdf",
                color: "red",
                icon: "pdf" as AppIconName
              },
              {
                name: "quick calls script.txt",
                slug: "quick-calls-script",
                url: "/quick calls script.txt",
                extension: "txt",
                color: "blue",
                icon: "doc" as AppIconName
              },
              {
                name: "employee feet pics",
                slug: "feet-pics",
                url: "/feet-pics",
                extension: "folder",
                color: "yellow",
                icon: "folder" as AppIconName
              },
              {
                name: "spicy.mov",
                slug: "spicy-mov",
                url: "/spicy.mov",
                extension: "mov",
                color: "red",
                icon: "video" as AppIconName
              },
              {
                name: "Long Term Contract Template.docx",
                slug: "long-term-contract-template",
                url: "/long-term-contract-template", // placeholder link
                extension: "docx",
                color: "blue",
                icon: "doc" as AppIconName
              },
            ],
            "archive": [
              {
                name: "Synergy Framework.canvas",
                icon: "canvas" as AppIconName
              },
              {
                name: "Sync Meeting Invite.ics",
                icon: "invite" as AppIconName
              },
              {
                name: "mixpanel",
                icon: "mixpanel" as AppIconName
              },
              {
                name: "amplitude",
                icon: "amplitude" as AppIconName
              },
              {
                name: "GA 3",
                icon: "ga" as AppIconName
              },
              {
                name: "PIP.doc",
                icon: "doc" as AppIconName
              },
              {
                name: "website easter eggs.md",
                slug: "website-easter-eggs",
                url: undefined,
                extension: "md",
                color: "blue",
                icon: "doc" as AppIconName
              },
              {
                name: "[GATEKEEP] state of the industry report.pdf",
                icon: "pdf_locked" as AppIconName
              },
              {
                name: "ai slop.tsx",
                slug: "ai-slop-tsx",
                url: undefined,
                extension: "tsx",
                color: "blue",
                icon: "doc" as AppIconName
              },
              {
                name: "[HR] how to avoid a coldplay concert moment.key",
                slug: "hr-coldplay-concert-moment",
                url: undefined,
                extension: "key",
                color: "yellow",
                icon: "presentation" as AppIconName
              },
            ]
          }

          const categoryOrder = ['recently_deleted', 'archive']

          // Category display names
          const categoryDisplayNames: Record<string, string> = {
            recently_deleted: 'Recently deleted',
            archive: 'Archive (cannot be recovered)',
          }

          return (
            <div className="@container not-prose space-y-2">
              {categoryOrder.map((category) => {
                const items = trashData[category as keyof typeof trashData]
                if (!items || items.length === 0) return null

                const count = items.length

                return (
                  <Accordion
                    skin={false}
                    key={category}
                    triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                    items={[
                      {
                        value: category,
                        trigger: (
                          <span className="bg-primary pr-2 relative z-10">
                            {categoryDisplayNames[category] ||
                              category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                            ({count})
                          </span>
                        ),
                        content: (
                          <div className="@md:pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-x-1 gap-y-4 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center">
                            {items.map((item) => {
                              const appLink = (
                                <AppLink
                                  label={item.name}
                                  url={item.url}
                                  Icon={<AppIcon name={item.icon} />}
                                  background="bg-primary"
                                  className={`size-12 [&_.bg-front]:fill-${item.color} [&_.bg-rear]:fill-${item.color}`}
                                >
                                </AppLink>
                              )

                              // Only wrap clickable items (with URLs) in ZoomHover
                              if (item.url) {
                                return (
                                  <ZoomHover
                                    key={item.slug}
                                    className="w-28 justify-center"
                                  >
                                    {appLink}
                                  </ZoomHover>
                                )
                              }

                              // Non-clickable items without ZoomHover
                              return (
                                <div key={item.slug} className="w-28 justify-center mx-auto">
                                  {appLink}
                                </div>
                              )
                            })}
                          </div>
                        ),
                      },
                    ]}
                    defaultValue={category}
                  />
                )
              })}
            </div>
          )
        })()}
      </Explorer>
    </>
  )
}
