import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'

export default function Games(): JSX.Element {
    return (
        <>
            <SEO
                title="Games - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="games"
                title="Games"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                accentImage={
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/party_mode_34c15751e4.png"
                        alt="Screenshot of hedgehog mode's party mode"
                        className="w-full"
                        placeholder="none"
                    />
                }
                sidebarContent={
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
                                            <span className="flex-1">Games</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <p className="text-sm mb-0">It's all fun and games around here.</p>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
            >
                <Link
                    to="/games/hedgehog-mode"
                    state={{ newWindow: true }}
                    className="flex flex-col justify-center items-center space-y-1 w-28 text-center text-primary hover:text-primary"
                >
                    <IconDice className={`size-7 text-green`} />
                    <p className="text-sm font-medium">Hedgehog mode</p>
                </Link>
            </Explorer>
        </>
    )
}
