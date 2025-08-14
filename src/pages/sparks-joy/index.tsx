import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator, IconBrush } from 'components/OSIcons/Icons'
import { AppIcon } from 'components/OSIcons'
import { IconPencil } from '@posthog/icons'
import { Accordion } from 'components/RadixUI/Accordion'

export default function SparkJoy(): JSX.Element {
    return (
        <>
            <SEO
                title="Fun stuff - PostHog"
                description="Because we're not all work and no play"
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="spark-joy"
                title="Fun stuff"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                // accentImage={
                //     <CloudinaryImage
                //         src="https://res.cloudinary.com/dmukukwp6/image/upload/party_mode_34c15751e4.png"
                //         alt="Screenshot of hedgehog mode's party mode"
                //         className="w-full"
                //         placeholder="none"
                //     />
                // }
                leftSidebarContent={
                    <>
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconDice className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Fun stuff</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <p className="text-sm mb-0">Because we're not all work and no play.</p>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
            >
                <div className="@container">
                    <div className="grid grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-5 @3xl:grid-cols-6 @4xl:grid-cols-7 @5xl:grid-cols-8 gap-4 items-start pt-4">
                        <Link
                            to="/games/hedgehog-mode"
                            state={{ newWindow: true }}
                            className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary"
                        >
                            <AppIcon name="hedgehog_mode" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Hedgehog mode</p>
                        </Link>
                        <Link
                            to="/games/dictator-or-tech-bro"
                            state={{ newWindow: true }}
                            className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary relative top-0"
                        >
                            <IconDictator className={`!size-10 -mt-2`} />
                            <p className="text-sm font-medium">Dictator or tech bro?</p>
                        </Link>
                        <Link
                            to="/paint"
                            state={{ newWindow: true }}
                            className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary"
                        >
                            <AppIcon name="hogpaint" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">HogPaint</p>
                        </Link>
                        <Link
                            to="/photobooth"
                            state={{ newWindow: true }}
                            className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary"
                        >
                            <AppIcon name="photobooth" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Photobooth</p>
                        </Link>
                        <Link
                            to="/merch"
                            state={{ newWindow: true }}
                            className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary"
                        >
                            <AppIcon name="shoppingBag" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Store</p>
                        </Link>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
