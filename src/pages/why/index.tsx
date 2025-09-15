import React, { Fragment, useRef, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { DotLottiePlayer } from '@dotlottie/react-player'

function ProductList() {
    const products = productMenu.children
    const marqueeProducts = [...products, ...products]
    const animationDuration = `${products.length * 4.5}s`
    return (
        <div className="relative overflow-x-hidden w-full" style={{ height: 'auto' }}>
            <div className="marquee flex w-max" tabIndex={0} style={{ animationDuration }}>
                {marqueeProducts.map((product, idx) => {
                    const Icon = Icons[product.icon as keyof typeof Icons]
                    return (
                        <Link
                            key={product.slug + '-' + idx}
                            to={product.url}
                            className={`flex flex-col items-center gap-1 group py-2 px-3 rounded hover:bg-accent max-w-24`}
                            state={{ newWindow: true }}
                        >
                            <span className={`size-6 mb-1 text-${product.color}`}>{Icon && <Icon />}</span>
                            <span className="text-sm font-medium leading-tight group-hover:text-primary text-center">
                                {product.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
            <style>{`
              .marquee {
                  animation: marquee-scroll linear infinite;
              }
              .marquee:hover, .marquee:focus {
                  animation-play-state: paused;
              }
              @keyframes marquee-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
              }
          `}</style>
        </div>
    )
}

function Slide({ slide }: { slide: any }) {
    if (slide.isFragment) {
        return (
            <Fragment>
                <div className="pt-4 px-8 flex flex-col items-center w-full mb-8">
                    <div className="relative">
                        <div className="absolute inset-5 bg-accent rounded-full" />
                        {slide.image}
                    </div>
                    <h2 className="text-xl font-bold mb-1" dangerouslySetInnerHTML={{ __html: slide.title }} />
                    <p
                        className="text-[15px] text-secondary text-center text-balance mb-0 leading-normal"
                        dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                    />
                </div>
                {slide.content}
            </Fragment>
        )
    }
    return (
        <div className="pt-4 px-8 pb-4 flex flex-col items-center w-full mb-8">
            <div className="relative">
                <div className="absolute inset-5 bg-accent rounded-full" />
                {slide.image}
            </div>
            <h2 className="text-xl font-bold mb-1" dangerouslySetInnerHTML={{ __html: slide.title }} />
            <p
                className="text-[15px] text-secondary text-center mb-10"
                dangerouslySetInnerHTML={{ __html: slide.subtitle }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {slide.features.map((feature: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                        <span>{feature.icon}</span>
                        <div>
                            <div className="font-semibold" dangerouslySetInnerHTML={{ __html: feature.title }} />
                            <div
                                className="text-secondary text-[15px]"
                                dangerouslySetInnerHTML={{ __html: feature.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ProductAnalyticsCustomers(): JSX.Element {
    const [slideIndex, setSlideIndex] = useState(0)

    // Create refs for each slide's lottie animation
    const lottieRefs = [
        useRef(null), // Slide 0
        useRef(null), // Slide 1
        useRef(null), // Slide 2
        useRef(null), // Slide 3
    ]

    const marqueeContent = <ProductList />

    const slides = [
        {
            image: (
                <DotLottiePlayer
                    lottieRef={lottieRefs[0]}
                    src="/lotties/kendrick.lottie"
                    autoplay
                    className="size-60"
                />
            ),
            title: "There are other dev tool companies, but they're not like us",
            subtitle:
                "We're building every piece of SaaS you need to make your product successful. A single platform for people who build things.",
            content: marqueeContent,
            isFragment: true,
        },
        {
            image: (
                <DotLottiePlayer lottieRef={lottieRefs[1]} src="/lotties/rainbow.lottie" autoplay className="size-60" />
            ),
            title: `Why we're different`,
            subtitle: `We try to treat you how <em>we'd</em> want to be treated`,
            features: [
                {
                    icon: <IconBold className="size-6" />, // placeholder
                    title: 'Self-serve',
                    description: '"Jumping on a quick call" is optional',
                },
                {
                    icon: <IconLink className="size-6" />, // placeholder
                    title: 'Public roadmap',
                    description: 'Help us decide what to build',
                },
                {
                    icon: <IconBold className="size-6" />, // placeholder
                    title: 'Public handbook',
                    description: 'Learn how we operate – no surprises',
                },
                {
                    icon: <IconLink className="size-6" />, // placeholder
                    title: '<em>Actually</em> technical support',
                    description: 'Replies from people who code',
                },
            ],
        },
        {
            image: <DotLottiePlayer lottieRef={lottieRefs[2]} src="/lotties/toy.lottie" autoplay className="size-60" />,
            title: 'Lowest prices',
            subtitle: 'Our pricing is sustainable because most customers use multiple products.',
            features: [
                {
                    icon: <IconBold className="size-6" />,
                    title: 'Huuuuge monthly free tier',
                    description: 'Even on paid plans',
                },
                {
                    icon: <IconLink className="size-6" />,
                    title: 'Usage-based pricing',
                    description: 'Only pay for what you use',
                },
                {
                    icon: <IconBold className="size-6" />,
                    title: 'Proactive price cuts',
                    description: 'When our costs go down, so do yours',
                },
                {
                    icon: <IconLink className="size-6" />,
                    title: 'Side project insurance',
                    description: 'Refund if you accidentally go viral',
                },
            ],
        },
        {
            image: (
                <DotLottiePlayer
                    lottieRef={lottieRefs[3]}
                    src="/lotties/office.lottie"
                    autoplay
                    className="size-48 my-4"
                />
            ),
            title: `We're building our dream company`,
            subtitle: `We're intentional about building the kind of company we actually enjoy working at.`,
            features: [
                {
                    icon: <IconBold className="size-6" />,
                    title: 'Default alive',
                    description: `We'll never run out of money`,
                },
                {
                    icon: <IconLink className="size-6" />,
                    title: 'We control our future',
                    description: 'Our co-founders control the board',
                },
                {
                    icon: <IconBold className="size-6" />,
                    title: 'For the little guy',
                    description: `We'll never focus on sales in lieu of taking care of our customers`,
                },
                {
                    icon: <IconLink className="size-6" />,
                    title: 'Inbound only',
                    description: 'We reinvest as much as possible into our products so they sell themselves',
                },
            ],
            isFinal: true,
        },
    ]

    const slide = slides[slideIndex]
    const isFirst = slideIndex === 0
    const isLast = slideIndex === slides.length - 1

    return (
        <>
            <SEO
                title="Tour"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Wizard
                leftNavigation={
                    <>
                        {!isFirst ? (
                            <CallToAction type="secondary" size="sm" onClick={() => setSlideIndex(slideIndex - 1)}>
                                Back
                            </CallToAction>
                        ) : (
                            <span />
                        )}
                    </>
                }
                rightNavigation={
                    <>
                        {isLast ? (
                            <Link to="/demo" state={{ newWindow: true }}>
                                <CallToAction type="primary" size="sm">
                                    Watch a demo
                                </CallToAction>
                            </Link>
                        ) : (
                            <CallToAction type="primary" size="sm" onClick={() => setSlideIndex(slideIndex + 1)}>
                                Next
                            </CallToAction>
                        )}
                    </>
                }
            >
                {slideIndex === 0 ? (
                    <div className="not-prose flex flex-col flex-1 items-center w-full">
                        <Slide slide={slide} />
                    </div>
                ) : (
                    <ScrollArea className="not-prose flex-1 w-full flex flex-col items-center">
                        <Slide slide={slide} />
                    </ScrollArea>
                )}
            </Wizard>
        </>
    )
}
