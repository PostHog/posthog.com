import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconArrowUpRight, IconInfo, IconRefresh } from '@posthog/icons'
import Roadmap from 'components/Home/New/Roadmap'
import Pricing from 'components/Home/New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'
import { JsxComponentDescriptor } from '@mdxeditor/editor'

import Logo from 'components/Logo'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { PRODUCT_COUNT, APP_COUNT } from '../../constants'
import Start from 'components/Start'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import Tagline from 'components/Home/Tagline'
import ELI5Blurb from 'components/Home/ELI5Blurb'

const CTAs = () => {
  const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
  return (
    <div>
      <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
        <CallToAction
          to="https://app.posthog.com/signup"
          size="md"
          state={{ newWindow: true, initialTab: 'signup' }}
        >
          Get started - free
        </CallToAction>
        <CallToAction type="secondary" size="md" onClick={() => setShowIntegrationPrompt(true)}>
          Install with AI
        </CallToAction>
      </div>
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: showIntegrationPrompt ? 'auto' : 0 }}
      >
        <div
          data-scheme="secondary"
          className="mt-4 p-4 border border-primary rounded-md bg-primary [&_h3]:mt-0 [&_ul]:mb-0 [&_ul]:p-0"
        >
          <IntegrationPrompt />
        </div>
      </motion.div>
    </div>
  )
}

const ProductCount = () => {
  return <strong>{PRODUCT_COUNT}+ products</strong>
}

const AppCount = () => {
  return APP_COUNT
}

const Button = ({ url, children }: { url: string; children: React.ReactNode }) => {
  return (
    <OSButton asLink to={url} variant="secondary" size="md" state={{ newWindow: true }}>
      {children}
    </OSButton>
  )
}

const Image = ({ src, className }: { src: string; className?: string }) => {
  return <CloudinaryImage src={src} className={className} />
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'ImageMaths',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/maths_116f02abd0.jpg"
        className="max-w-full rounded"
      />
    ),
  },
  {
    name: 'ImageHogDashboards',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_dashboards_996851ce65.png"
        className="float-right max-w-[192px] @sm:max-w-[384px] ml-2 @sm:ml-4 mb-2 @sm:-mt-4"
      />
    ),
  },
  {
    name: 'ImageRetailHogs',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/retail_hogs_540cf065e4.png"
        className="@md:hidden @xl:block @lg:float-right max-w-full @xl:max-w-xs -mb-2 @lg:mb-2 @lg:ml-4 @lg:-mt-2"
      />
    ),
  },
  {
    name: 'AppCount',
    kind: 'flow',
    props: [],
    Editor: () => <AppCount />,
  },
  {
    name: 'CTAs',
    kind: 'flow',
    props: [],
    Editor: () => <CTAs />,
  },
  {
    name: 'CTA',
    kind: 'flow',
    props: [],
    Editor: () => (
      <>
        <p className="-mt-2">
          If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
        </p>
        <CTA headline={false} />
      </>
    ),
  },
  {
    name: 'Logo',
    kind: 'flow',
    props: [],
    Editor: () => {
      const { siteSettings } = useApp()
      return <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
    },
  },
  {
    name: 'ButtonCDI',
    kind: 'flow',
    props: [],
    Editor: () => <Button url="/customer-data-infrastructure">README: Data warehouse / CDP / ETL.md</Button>,
  },
  {
    name: 'ButtonPricing',
    kind: 'flow',
    props: [],
    Editor: () => <Button url="/pricing">Explore pricing</Button>,
  },
  {
    name: 'ButtonAI',
    kind: 'flow',
    props: [],
    Editor: () => <Button url="/ai">Learn about PostHog AI</Button>,
  },
  {
    name: 'ButtonAbout',
    kind: 'flow',
    props: [],
    Editor: () => <Button url="/about">Read more about us</Button>,
  },
  {
    name: 'ImageReading2',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
        className="hidden @md:block @md:float-right @xl:hidden @md:max-w-60 @xl:max-w-xs @sm:ml-4 @sm:mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
      />
    ),
  },
  {
    name: 'TooltipDW',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Tooltip
        trigger={
          <span>
            <IconInfo className="size-4 inline-block relative -top-px" />
          </span>
        }
        delay={0}
      >
        <p className="text-sm mb-0">You can also connect your own!</p>
      </Tooltip>
    ),
  },
  {
    name: 'Tagline',
    kind: 'flow',
    props: [],
    Editor: () => <Tagline />,
  },
  {
    name: 'ELI5Blurb',
    kind: 'flow',
    props: [],
    Editor: () => <ELI5Blurb />,
  },
]

export default function PostHog101() {
  const {
    mdx: { rawBody, mdxBody },
  } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "posthog-101" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
  const { appWindow } = useWindow()
  const { setWindowTitle } = useApp()
  const posthog = usePostHog()

  useEffect(() => {
    if (appWindow) {
      setWindowTitle(appWindow, 'posthog-101.mdx')
    }
  }, [])

  return (
    <>
      <SEO
        title="PostHog – We make dev tools for product engineers"
        updateWindowTitle={false}
        description="All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free."
        image="/images/og/default.png"
      />
      <MDXEditor
        hideTitle={true}
        jsxComponentDescriptors={jsxComponentDescriptors}
        body={rawBody}
        mdxBody={mdxBody}
        cta={{
          url: `https://${posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
            }.posthog.com/signup`,
          label: 'Get started - free',
        }}
      />
    </>
  )
}
