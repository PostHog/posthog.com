import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { section, SectionHeader } from './Sections'
import { usePlatform } from '../Platform/usePlatform'
import useProducts from '../Products'
import { IconCheck, IconX } from '@posthog/icons'
import Logo from 'components/Logo'
import { StaticImage } from 'gatsby-plugin-image'
import { CTA } from '../Plans'

const comparison = [
    {
        name: 'Amplitude',
        logo: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/icon_amp_4d0e457978.png"
                className=""
                width={32}
                placeholder="blurred"
                alt="Amplitude"
            />
        ),
        products: {
            'Product analytics': true,
            'Web analytics': false,
            'Session replay': true,
            'Feature flags': false,
            Experiments: true,
            Surveys: false,
            'Data warehouse': false,
        },
    },
    {
        name: 'Mixpanel',
        logo: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/icon_mp_6404158e7f.png"
                className=""
                width={32}
                placeholder="blurred"
                alt="Mixpanel"
            />
        ),
        products: {
            'Product analytics': true,
            'Web analytics': false,
            'Session replay': false,
            'Feature flags': false,
            Experiments: false,
            Surveys: false,
            'Data warehouse': false,
        },
    },
    {
        name: 'Heap',
        logo: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/icon_heep_7d9bb0f55a.png"
                width={16}
                placeholder="blurred"
                alt="Heap"
            />
        ),
        products: {
            'Product analytics': true,
            'Web analytics': false,
            'Session replay': true,
            'Feature flags': false,
            Experiments: false,
            Surveys: false,
            'Data warehouse': false,
        },
    },
    {
        name: 'Pendo',
        logo: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/icon_pnd0_dc3ea0f56f.png"
                className=""
                width={32}
                placeholder="blurred"
                alt="Pendo"
            />
        ),
        products: {
            'Product analytics': true,
            'Web analytics': false,
            'Session replay': true,
            'Feature flags': false,
            Experiments: false,
            Surveys: false,
            'Data warehouse': false,
        },
    },
    {
        name: 'FullStory',
        logo: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/icon_fs_542ca7eb05.png"
                className=""
                width={32}
                placeholder="blurred"
                alt="FullStory"
            />
        ),
        products: {
            'Product analytics': true,
            'Web analytics': false,
            'Session replay': true,
            'Feature flags': false,
            Experiments: false,
            Surveys: false,
            'Data warehouse': false,
        },
    },
    {
        name: 'PostHog',
        logo: (
            <div className="">
                <Logo noText className="h-6 mx-auto" />
            </div>
        ),
        products: {
            'Product analytics': true,
            'Web analytics': true,
            'Session replay': true,
            'Feature flags': true,
            Experiments: true,
            Surveys: true,
            'Data warehouse': true,
        },
    },
]

export const SimilarProducts = () => {
    return (
        <section className={`${section} my-8 md:px-4`}>
            <SectionHeader>
                <h3 className="mb-2">Compare to similar products</h3>
            </SectionHeader>
            <div className="mt-4 -mx-4 px-4 overflow-x-auto">
                <div className="grid grid-cols-7 min-w-[1000px]">
                    <div className="col-span-1 pr-4"></div>
                    {comparison.map((company) => (
                        <div
                            key={company.name}
                            className={`text-center py-2 px-4 whitespace-nowrap flex flex-col justify-end ${
                                company.name === 'PostHog'
                                    ? 'bg-white dark:bg-green/15 border-x-2 border-t-green border-x-green rounded-t-sm border-t-2'
                                    : ''
                            }`}
                        >
                            <div className="max-h-9 text-center mb-2">{company.logo}</div>
                            <strong>{company.name}</strong>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 min-w-[1000px] divide-y divide-light dark:divide-dark">
                    {Object.keys(comparison[0].products).map((product) => (
                        <React.Fragment key={product}>
                            <div className="col-span-1 flex items-start gap-2 py-2 pl-2 pr-4 first:border-t border-light dark:border-dark">
                                <strong className="whitespace-nowrap">{product}</strong>
                            </div>
                            {comparison.map((company) => (
                                <div
                                    key={`${company.name}-${product}`}
                                    className={`py-2 px-4 text-center ${
                                        company.name === 'PostHog'
                                            ? 'bg-white border-x-2 !border-x-green dark:bg-green/15 last:!border-b-2 last:!border-b-green last:rounded-b-sm last:pb-4 last:px-2'
                                            : ''
                                    }`}
                                >
                                    {company.products[product] ? (
                                        <IconCheck className="size-6 inline-block text-green" />
                                    ) : (
                                        <IconX className="size-6 inline-block text-red" />
                                    )}
                                    {product === 'Data warehouse' && company.name === 'PostHog' && (
                                        <div className="pt-2">
                                            <CTA size="sm" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
