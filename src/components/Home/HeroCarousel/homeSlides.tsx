import React from 'react'
import { IconArrowRight, IconAtSign, IconCheck, IconCoffee, IconSparkles } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import useProduct from 'hooks/useProduct'
import { useApp } from '../../../context/App'

export const SlackSlide = () => {
    const allProducts = useProduct() as any[]
    const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_slack') : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const screenshot = product?.screenshots?.home

    return (
        <div data-scheme="primary" className="@container rounded p-4 @md:p-6 h-full bg-[#F3F4F0] dark:bg-[#131316]">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            <IconAtSign className="size-4" /> PostHog Slackbot
                        </p>
                        <h2 className="text-2xl font-bold m-0">Create pull requests in Slack</h2>
                    </div>
                    <p className="text-secondary m-0">
                        Tag <code>@PostHog</code> in a thread to analyze customer behavior or create a PR – all without
                        ever leaving Slack. Triage and build with your team in your existing tools.
                    </p>
                    <OSButton to="/slack" state={{ newWindow: true }} variant="secondary" asLink>
                        Explore PostHog Slackbot
                    </OSButton>
                </div>
            </div>
        </div>
    )
}

export const FixBugsSlide = () => {
    const allProducts = useProduct() as any[]
    const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_code') : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const screenshot = product?.screenshots?.home

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            <IconCoffee className="size-4" /> PostHog Code
                        </p>
                        <h2 className="text-2xl font-bold m-0">Fix bugs automatically</h2>
                    </div>
                    <p className="text-secondary m-0">
                        <strong>PostHog Code</strong>, our AI code editor:
                    </p>
                    <ul className="list-none p-0 m-0 space-y-1.5">
                        <li className="flex items-center gap-2 text-secondary">
                            <IconCheck className="size-5 text-green shrink-0" /> Identifies product usage patterns
                        </li>
                        <li className="flex items-center gap-2 text-secondary">
                            <IconCheck className="size-5 text-green shrink-0" /> Triages bugs and errors
                        </li>
                        <li className="flex items-center gap-2 text-secondary">
                            <IconCheck className="size-5 text-green shrink-0" /> Creates pull requests automatically
                        </li>
                    </ul>
                    <OSButton to="/code" state={{ newWindow: true }} variant="secondary" asLink>
                        Explore PostHog Code
                    </OSButton>
                </div>
            </div>
        </div>
    )
}

export const AskAnythingSlide = () => {
    const allProducts = useProduct() as any[]
    const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_ai') : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const screenshot = product?.screenshots?.home

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            <IconSparkles className="size-4" /> PostHog AI
                        </p>
                        <h2 className="text-2xl font-bold m-0">Ask PostHog anything</h2>
                    </div>
                    <p className="text-secondary m-0">
                        PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                        customer usage or data question you have.
                    </p>
                    <p className="text-secondary m-0">
                        Pipe in third party data to analyze alongside customer usage data for a more complete picture of
                        product usage.
                    </p>
                    <OSButton to="/ai" state={{ newWindow: true }} variant="secondary" asLink>
                        Explore PostHog AI
                    </OSButton>
                </div>
            </div>
        </div>
    )
}
