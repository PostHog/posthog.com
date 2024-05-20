import React, { useEffect, useState } from 'react'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import { StaticImage } from 'gatsby-plugin-image'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
import { child, container } from 'components/CallToAction'

export const NewsletterForm = ({ className = '' }): JSX.Element => {
    const { user } = useUser()
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
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
        <div
            className={`flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-8 py-8 md:py-12 ${className}`}
        >
            <div className="text-center">
                <StaticImage
                    src="../../images/newsletter-signup.png"
                    objectFit="contain"
                    className="w-full h-full max-w-[200px] mx-auto flex-shrink-0"
                />
            </div>
            <div className="w-full max-w-md">
                {!submitted ? (
                    <>
                        <p className="text-sm opacity-50 m-0">Subscribe to our newsletter</p>
                        <h4 className="relative text-2xl m-0">Product for Engineers</h4>
                        <p className="m-0 text-[15px]">Helping engineers and founders flex their product muscles</p>
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
                                    <span className={child(undefined, undefined, undefined, 'md')}>Subscribe</span>
                                </button>
                            </form>
                            <p className="text-sm opacity-50 text-center md:text-left">
                                We'll share your email with Substack
                                <Tooltip
                                    content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                                    tooltipClassName="max-w-md"
                                >
                                    <IconInfo className="w-4 h-4 inline-block ml-1" />
                                </Tooltip>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="bg-accent dark:bg-accent-dark border border-border dark:border-dark px-6 py-4 rounded-md">
                        <h3 className="text-lg font-bold m-0">Thanks for subscribing!</h3>
                        <p className="m-0 opacity-60">
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
