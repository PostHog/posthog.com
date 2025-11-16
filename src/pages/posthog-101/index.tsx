import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconArrowUpRight, IconInfo, IconMouseScrollDown, IconRefresh } from '@posthog/icons'
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

interface ProductButtonsProps {
  productTypes: string[]
  className?: string
  beta?: boolean
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
  const allProducts = useProduct()

  // Helper to get product by handle
  const getProduct = (handle: string) =>
    Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

  return (
    <span className={`flex flex-wrap gap-1 pt-1 ${className}`}>
      {productTypes.map((type, index) => {
        const product = getProduct(type)
        return product ? (
          <OSButton
            key={type}
            icon={product.Icon ? <product.Icon /> : undefined}
            iconClassName={`text-${product.color}`}
            color={product.color}
            className="font-medium text-primary hover:text-primary"
            to={`/${product.slug}`}
            state={{ newWindow: true }}
            asLink
          >
            {product.name}
            {beta && <span className="text-xs opacity-50">beta</span>}
          </OSButton>
        ) : null
      })}
    </span>
  )
}

// Single product button for inline use
const ProductButton = ({ handle }: { handle: string }) => {
  const allProducts = useProduct()
  const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

  if (!product) return null

  return (
    <OSButton
      icon={product.Icon ? <product.Icon /> : undefined}
      iconClassName={`text-${product.color}`}
      color={product.color}
      size="md"
      className="font-medium text-primary hover:text-primary relative top-0.5"
      to={`/${product.slug}`}
      state={{ newWindow: true }}
      asLink
    >
      {product.name}
    </OSButton>
  )
}

const ProductCount = () => {
  return <strong>{PRODUCT_COUNT}+ products</strong>
}

const AppCount = () => {
  return <>{APP_COUNT}</>
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

const SmoothScrollLink = ({ targetId, children }: { targetId: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 16 // 1rem offset

      // Custom smooth scroll with slower duration
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 1000 // 1 second (slower than default)
      let start: number | null = null

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function for smooth deceleration
        const ease = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress

        window.scrollTo(0, startPosition + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        } else {
          window.history.pushState(null, '', `#${targetId}`)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="underline cursor-pointer hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  )
}

const SkipToWhatYouCanDo = () => {
  return (
    <SmoothScrollLink targetId="what-can-you-do-with-posthog">
      <IconMouseScrollDown className="size-5 inline-block relative -top-px" />
      What you can do with PostHog
    </SmoothScrollLink>
  )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'ImageMaths',
    kind: 'flow',
    props: [],
    Editor: () => (
      <>
        <Image
          src="https://res.cloudinary.com/dmukukwp6/image/upload/maths_116f02abd0.jpg"
          className="max-w-full @lg/editor-content:float-right @lg/editor-content:w-1/2 mt-4 @lg/editor-content:ml-4 rounded"
        />
      </>
    ),
  },
  {
    name: 'ImageHogDashboards',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto/hog_dashboards_996851ce65.png"
        className="@lg/editor-content:float-right @lg/editor-content:w-2/5 @lg/editor-content:ml-4 max-w-[192px] @lg/editor-content:max-w-[384px]"
      />
    ),
  },
  {
    name: 'ImageRetailHogs',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto/retail_hogs_540cf065e4.png"
        className="@lg/editor-content:float-right @lg/editor-content:w-3/5 @lg/editor-content:ml-4 -mt-4 max-w-[192px] @lg/editor-content:max-w-[400px]"
      />
    ),
  },
  {
    name: 'ImageReplayHog',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto/replay_hog_13a2853b54.png"
        className="@lg/editor-content:float-right @lg/editor-content:w-3/5 @lg/editor-content:ml-4 max-w-sm @lg/editor-content:max-w-[400px]"
      />
    ),
  },
  {
    name: 'ImageChartHog',
    kind: 'flow',
    props: [],
    Editor: () => (
      <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto/chart_hog_31fcb37849.png"
        className="@lg/editor-content:float-right @lg/editor-content:w-1/2 @lg/editor-content:ml-4 -mt-4 max-w-md"
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
  {
    name: 'ProductButtonSessionReplay',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="session_replay" />,
  },
  {
    name: 'ProductButtonProductAnalytics',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="product_analytics" />,
  },
  {
    name: 'ProductButtonDashboards',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="dashboards" />,
  },
  {
    name: 'ProductButtonFeatureFlags',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="feature_flags" />,
  },
  {
    name: 'ProductButtonExperiments',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="experiments" />,
  },
  {
    name: 'ProductButtonDataWarehouse',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="data_warehouse" />,
  },
  {
    name: 'ProductButtonSurveys',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="surveys" />,
  },
  {
    name: 'ProductButtonAI',
    kind: 'text',
    props: [],
    Editor: () => <ProductButton handle="posthog_ai" />,
  },
  {
    name: 'IconMouseScrollDown',
    kind: 'text',
    props: [],
    Editor: () => <IconMouseScrollDown className="size-5 inline-block relative -top-px" />,
  },
  {
    name: 'SkipToWhatYouCanDo',
    kind: 'text',
    props: [],
    Editor: () => <SkipToWhatYouCanDo />,
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
