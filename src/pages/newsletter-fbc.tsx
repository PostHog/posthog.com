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

function NewsletterFBC() {
    const { user } = useUser()
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [showContent, setShowContent] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        posthog?.capture('newsletter_subscribed', { email })
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
            <div className="mx-auto px-8 pt-2">
                <div className="flex flex-col items-center min-h-[60vh]">
                    {showContent && <ProductManagerNewsletterContent />}
                    <div className="w-full max-w-[175px] mb-8">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-8 border-light dark:border-dark border-y !mb-6 xs:!my-6 !py-4 w-full">
                        <div className="w-full ">
                            {!submitted ? (
                                <>
                                    <p className="!text-sm opacity-50 !m-0">Subscribe to our newsletter</p>
                                    <h4 className="relative !text-2xl !m-0 !leading-tight">Product for Engineers</h4>
                                    <p className="!m-0 !text-sm md:!text-[15px] !leading-normal !pt-1">
                                        Read by 60,000+ founders and builders.
                                    </p>
                                    <div className="">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col lg:flex-row items-start gap-2 my-4 lg:my-2"
                                        >
                                            <input
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                placeholder="Email address"
                                                className="dark:bg-accent-dark border border-light dark:border-dark rounded text-[15px] w-full flex-1"
                                                value={email}
                                            />
                                            <button className={`${container(undefined, 'md')} -mt-px w-full lg:w-auto`}>
                                                <span className={child(undefined, undefined, undefined, 'md')}>
                                                    Subscribe
                                                </span>
                                            </button>
                                        </form>
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="!text-sm opacity-50 text-center md:text-left !mb-0">
                                                We'll share your email with{' '}
                                                <span className="whitespace-nowrap inline-flex">
                                                    Substack
                                                    <Tooltip
                                                        content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                                                        tooltipClassName="max-w-md"
                                                    >
                                                        <Info className="pl-2 w-4 h-4 inline-block ml-1" />
                                                    </Tooltip>
                                                </span>
                                            </p>
                                            <button
                                                onClick={() => setShowContent(true)}
                                                className="text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary underline"
                                            >
                                                Read it first
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-accent dark:bg-accent-dark border border-border dark:border-dark px-6 py-4 rounded-md">
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
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterFBC
