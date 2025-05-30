import Layout from 'components/Layout'
import React, { useState, useEffect, FormEvent } from 'react'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'
import { Info } from 'components/Icons/Icons'
import { container, child } from 'components/CallToAction'
import ProductManagerNewsletterContent from 'components/ProductManagerNewsletterContent'
import { IconInfo } from '@posthog/icons'

function NewsletterFBC() {
    const { user } = useUser()
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [showContent, setShowContent] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        const fbclid = urlParams.get('fbclid')

        posthog?.capture('newsletter_subscribed', { email })
        posthog?.capture('user_signed_up_to_newsletter_from_ad', {
            ad_source: 'meta',
            email: email,
            fbclid: fbclid || undefined,
        })
        setSubmitted(true)
    }

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email)
        }
    }, [user])

    return (
        <Layout>
            <SEO title="Newsletter" description="Subscribe to our newsletter" />
            <div className="mx-auto px-4 pt-2">
                <div className="flex flex-col items-center min-h-[60vh]">
                    {showContent && <ProductManagerNewsletterContent />}
                    {!showContent && (
                        <div className="w-full max-w-[250px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                                className="w-full h-full"
                            />
                        </div>
                    )}
                    <div className="max-w-lg flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-8 !mb-4 xs:!my-4 !py-4 w-full border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark">
                        <div className="w-full">
                            {!submitted ? (
                                <>
                                    <p className="!text-[15px] opacity-50 !mb-2 text-center">
                                        Subscribe to our newsletter
                                    </p>
                                    <h4 className="relative !text-2xl !m-0 !leading-tight text-center">
                                        Product for Engineers
                                    </h4>
                                    <p className="!m-0 !text-sm md:!text-base !leading-normal !opacity-75 !pt-1 text-center">
                                        Read by 60,000+ founders and builders
                                    </p>
                                    <div className="">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col items-center gap-2 my-4 lg:my-2"
                                        >
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
                                    {!showContent && (
                                        <button
                                            onClick={() => setShowContent(true)}
                                            className={`${container(undefined, 'md')} mt-4 w-full`}
                                        >
                                            <span className={child(undefined, undefined, undefined, 'md')}>
                                                Read the newsletter
                                            </span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {!showContent && !submitted && (
                        <div className="flex justify-center items-center gap-1">
                            <span className="opacity-75">or</span>
                            <button
                                onClick={() => {
                                    posthog?.capture('newsletter_read_first_clicked')
                                    setShowContent(true)
                                }}
                                className="text-red dark:text-yellow font-semibold"
                            >
                                read it first
                            </button>
                        </div>
                    )}
                    {showContent && (
                        <div className="w-full max-w-[250px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                                className="w-full h-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterFBC
