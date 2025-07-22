import Layout from 'components/Layout'
import React, { useState, useEffect, FormEvent } from 'react'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'
import { container, child } from 'components/CallToAction'
import { IconInfo } from '@posthog/icons'
import Link from 'components/Link'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const topIssues = [
    {
        title: "Job interview questions engineers should ask (but don't)",
        url: '/newsletter/job-interview-questions-engineers',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/job_interview_questions_35bb07c898.jpg' as `https://res.cloudinary.com/${string}`,
    },
    {
        title: 'What engineers get wrong about communication',
        url: '/newsletter/communication-mistakes',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/image_1_2594402957.png' as `https://res.cloudinary.com/${string}`,
    },
    {
        title: 'Product management is broken. Engineers can fix it',
        url: '/newsletter/product-management-is-broken',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/390823720_35b0d6be_f823_4c45_8e80_cfc0727e8827_128b8bbd57.jpg' as `https://res.cloudinary.com/${string}`,
    },
    {
        title: 'The magic of small engineering teams',
        url: '/newsletter/small-teams',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/345390691_746f2b83_6290_4d68_b612_dd9360b43515_20e0f385a7.jpg' as `https://res.cloudinary.com/${string}`,
    },
    {
        title: 'How we choose technologies',
        url: '/newsletter/choosing-technologies',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/choosetech_c01bfb0582.png' as `https://res.cloudinary.com/${string}`,
    },
    {
        title: "50 things we've learned about building successful products",
        url: '/newsletter/50-product-learnings',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/50jhog_5aef8ff9ff.png' as `https://res.cloudinary.com/${string}`,
    },
]

const HogZilla = () => {
    const [ready, setReady] = useState(false)
    const [containerRef, inView] = useInView({ threshold: 0 })
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (inView) {
            videoRef?.current?.play()
        } else {
            videoRef?.current?.pause()
        }
    }, [inView, ready])

    return (
        <div ref={containerRef}>
            <video
                ref={videoRef}
                onCanPlay={() => {
                    setReady(true)
                }}
                onEnded={() => {
                    if (videoRef?.current) {
                        videoRef.current.currentTime = 3
                        videoRef?.current?.play()
                    }
                }}
                playsInline
                muted
                className="w-full"
                poster="/images/hogzilla.jpg"
                preload="none"
            >
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/hogzilla.webm`} type="video/webm" />
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/hogzilla.mp4`} type="video/mp4" />
            </video>
        </div>
    )
}

function NewsletterSubscribeForm({
    email,
    setEmail,
    submitted,
    setSubmitted,
}: {
    email: string
    setEmail: (email: string) => void
    submitted: boolean
    setSubmitted: (submitted: boolean) => void
}) {
    const { user } = useUser()
    const posthog = usePostHog()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        const fbclid = urlParams.get('fbclid')
        const utmSource = urlParams.get('utm_source')

        posthog?.capture('newsletter_subscribed', { email })
        posthog?.capture('user_signed_up_to_newsletter_from_ad', {
            ad_source: utmSource || 'undefined',
            email: email,
            fbclid: fbclid || undefined,
        })
        setSubmitted(true)
    }

    useEffect(() => {
        if (user?.email && !email) {
            setEmail(user.email)
        }
    }, [user])

    return (
        <div className="max-w-lg flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-8 !mb-4 xs:!my-4 !py-4 w-full border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark mx-auto">
            <div className="w-full">
                {!submitted ? (
                    <>
                        <h1 className="relative !text-2xl !m-0 !leading-tight text-center">Product for Engineers</h1>
                        <p className="!m-0 !text-lg md:!text-base !leading-normal !opacity-75 !pt-1 text-center">
                            Read by 60,000+ founders and builders
                        </p>
                        <div className="">
                            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 my-4 lg:my-2">
                                <input
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email address"
                                    className="dark:bg-accent-dark border border-light dark:border-dark rounded text-[15px] w-full flex-1 max-w-xs"
                                    value={email}
                                />
                                <button className={`${container(undefined, 'md')} -mt-px w-full max-w-xs`}>
                                    <span className={child(undefined, undefined, undefined, 'md')}>
                                        Subscribe for free
                                    </span>
                                </button>
                            </form>
                            <div className="flex flex-col items-center gap-4 lg:pt-2">
                                <p className="!text-sm opacity-50 text-center md:text-left !mb-0">
                                    We'll share your email with{' '}
                                    <span className="whitespace-nowrap inline-flex">
                                        Substack{' '}
                                        <Tooltip
                                            content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                                            tooltipClassName="max-w-md"
                                        >
                                            <span>
                                                <IconInfo className="w-4 h-4 inline-block ml-0.5 relative -top-px" />
                                            </span>
                                        </Tooltip>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="px-4 pb-2">
                        <h3 className="text-lg font-bold m-0">Thanks for subscribing!</h3>
                        <p className="m-0 opacity-75 !leading-normal !text-[15px]">
                            Keep an eye out for our next edition of{' '}
                            <strong>
                                <em>Product for Engineers</em>
                            </strong>{' '}
                            from Substack in your inbox.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

function NewsletterFBC(): JSX.Element {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleNewsletterClick = (title: string) => {
        posthog?.capture('clicked_newsletter_from_newsletter_ad_landing_page', {
            newsletter_name: title,
        })
    }

    return (
        <Layout>
            <SEO title="Newsletter" description="Subscribe to our newsletter" />
            <div className="mx-auto px-4 pt-2 pb-24">
                <div className="flex flex-col items-center min-h-[60vh]">
                    <div className="w-full max-w-[150px]">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                            className="w-full h-full"
                        />
                    </div>
                    <NewsletterSubscribeForm
                        email={email}
                        setEmail={setEmail}
                        submitted={submitted}
                        setSubmitted={setSubmitted}
                    />
                    <div className="w-full max-w-5xl">
                        <h3 className="text-xl font-bold my-4 text-center">Top posts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topIssues.map((issue) => (
                                <Link
                                    key={issue.url}
                                    to={issue.url}
                                    state={{ isComingFromAd: true }}
                                    onClick={() => handleNewsletterClick(issue.title)}
                                    className="group flex flex-col items-center text-center transition-opacity border border-light dark:border-dark rounded bg-white dark:bg-dark relative hover:top-[-1px] hover:scale-[1.005] active:top-[1px] active:scale-[.995]"
                                >
                                    <div className="w-full mb-1 overflow-hidden rounded-t">
                                        <CloudinaryImage src={issue.image} className="rounded-none" />
                                    </div>
                                    <h4 className="text-xl font-bold mt-0 px-2 leading-tight">{issue.title}</h4>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-16">
                            <NewsletterSubscribeForm
                                email={email}
                                setEmail={setEmail}
                                submitted={submitted}
                                setSubmitted={setSubmitted}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterFBC
