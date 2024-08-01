import React from 'react'
import { section, SectionHeader } from './Sections'
import { usePlatform } from '../Platform/usePlatform'
import useProducts from '../Products'
import { IconCheck, IconX } from '@posthog/icons'
import Logo from 'components/Logo'
import { StaticImage } from 'gatsby-plugin-image'

const comparison = [
    {
        name: 'Amplitude',
        logo: <StaticImage src={`./images/icon-amp.png`} className="" placeholder="blurred" alt="Amplitude" />,
        products: {
            ProductAnalytics: true,
            WebAnalytics: false,
            SessionReplay: true,
            FeatureFlags: false,
            AbTesting: true,
            Surveys: false,
            DataWarehouse: false,
        },
    },
    {
        name: 'Mixpanel',
        logo: <StaticImage src={`./images/icon-mp.png`} className="" placeholder="blurred" alt="Mixpanel" />,
        products: {
            ProductAnalytics: true,
            WebAnalytics: false,
            SessionReplay: false,
            FeatureFlags: false,
            AbTesting: false,
            Surveys: false,
            DataWarehouse: false,
        },
    },
    {
        name: 'Heap',
        logo: (
            <StaticImage
                src={`./images/icon-heep.png`}
                className="h-full"
                height={32}
                placeholder="blurred"
                alt="Mixpanel"
            />
        ),
        products: {
            ProductAnalytics: true,
            WebAnalytics: false,
            SessionReplay: true,
            FeatureFlags: false,
            AbTesting: false,
            Surveys: false,
            DataWarehouse: false,
        },
    },
    {
        name: 'Pendo',
        logo: <StaticImage src={`./images/icon-pnd0.png`} className="" placeholder="blurred" alt="Mixpanel" />,
        products: {
            ProductAnalytics: true,
            WebAnalytics: false,
            SessionReplay: true,
            FeatureFlags: false,
            AbTesting: false,
            Surveys: false,
            DataWarehouse: false,
        },
    },
    {
        name: 'FullStory',
        logo: (
            <StaticImage src={`./images/icon-fs.png`} className="" height={32} placeholder="blurred" alt="Mixpanel" />
        ),
        products: {
            ProductAnalytics: true,
            WebAnalytics: false,
            SessionReplay: true,
            FeatureFlags: false,
            AbTesting: false,
            Surveys: false,
            DataWarehouse: false,
        },
    },
    {
        name: 'PostHog',
        logo: (
            <div className="-ml-6">
                <Logo className="h-5" />
            </div>
        ),
        products: {
            ProductAnalytics: true,
            WebAnalytics: true,
            SessionReplay: true,
            FeatureFlags: true,
            AbTesting: true,
            Surveys: true,
            DataWarehouse: true,
        },
    },
]

export const SimilarProducts = () => {
    return (
        <section className={`${section} mb-12 mt-8 md:px-4`}>
            <SectionHeader>
                <h3 className="mb-2">Compare to similar products</h3>
            </SectionHeader>
            <div className="mt-4 -mx-4 px-4 overflow-x-auto">
                <div className="grid grid-cols-8 min-w-[1200px]">
                    <div className="col-span-1 pr-4"></div>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Product analytics</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Web analytics</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Session replay</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Feature flags</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">A/B testing</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Surveys</strong>
                    <strong className="text-center py-2 px-4 whitespace-nowrap">Data warehouse</strong>
                </div>
                <div className="grid grid-cols-8 min-w-[1200px]">
                    {comparison.map((company, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`col-span-1 flex items-center gap-2 py-2 pl-2 pr-4 border-x-2 ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-l-2 border-green bg-white dark:bg-green/15 border-r-transparent'
                                        : company.name === 'Amplitude'
                                        ? '!border-transparent'
                                        : 'border-x-transparent border-t first:border-t-0 border-y-light dark:border-y-dark'
                                }`}
                            >
                                <div className="flex-[0_0_32px] max-h-9 text-center">{company.logo}</div>
                                {company.name !== 'PostHog' && <strong>{company.name}</strong>}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.ProductAnalytics ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.WebAnalytics ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.SessionReplay ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.FeatureFlags ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.AbTesting ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.Surveys ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                            <div
                                className={`py-2 px-4 text-center ${
                                    company.name === 'PostHog'
                                        ? 'border-y-2 border-green bg-white dark:bg-green/15 border-r-2'
                                        : company.name === 'Amplitude'
                                        ? 'border-t-0'
                                        : 'border-x-transparent border-t first:border-t-0 border-light dark:border-dark'
                                }`}
                            >
                                {company.products.DataWarehouse ? (
                                    <IconCheck className="size-6 inline-block text-green" />
                                ) : (
                                    <IconX className="size-6 inline-block text-red" />
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
