import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useState } from 'react'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import { StaticImage } from 'gatsby-plugin-image'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
import { child, container } from 'components/CallToAction'

interface NewsletterFormProps {
    className?: string
    placement?: string
}

export const NewsletterForm = ({ className = '', placement }: NewsletterFormProps): JSX.Element => {
    const { user } = useUser()
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        posthog?.capture('newsletter_subscribed', { email })
        setSubmitted(true)
    }

    const placementClasses =
        placement === 'middle'
            ? 'border-y !mt-10 !mb-6 xs:!my-6 !py-4'
            : placement === 'blog-index'
            ? 'border-0 pt-8'
            : placement === 'community'
            ? 'border-0'
            : 'border-y !mt-6 !mb-0 !py-4'

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email)
        }
    }, [user])

    return (
        <div
            className={`
                flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-8 border-light dark:border-dark ${placementClasses} ${className}`}
        >
            <div className="text-center hidden md:block">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                    objectFit="contain"
                    className="w-full h-full max-w-[200px] md:max-w-[250px] mx-auto flex-shrink-0"
                />
            </div>
            <div className="w-full max-w-md">
                {!submitted ? (
                    <>
                        <div className="float-right md:hidden -mt-6 2xs:-mt-12">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/engineer_47d6638eae.png"
                                objectFit="contain"
                                className="w-full h-full max-w-[170px]"
                            />
                        </div>
                        <p className="!text-sm opacity-50 !m-0">Subscribe to our newsletter</p>
                        <h4 className="relative !text-2xl !m-0 !leading-tight">Product for Engineers</h4>
                        <p className="!m-0 !text-sm md:!text-[15px] !leading-normal !pt-1">
                            Read by 45,000+ founders and builders.
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
                                    <span className={child(undefined, undefined, undefined, 'md')}>Subscribe</span>
                                </button>
                            </form>
                            <p className="!text-sm opacity-50 text-center md:text-left !mb-0">
                                We'll share your email with{' '}
                                <span className="whitespace-nowrap">
                                    Substack
                                    <Tooltip
                                        content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                                        tooltipClassName="max-w-md"
                                    >
                                        <IconInfo className="w-4 h-4 inline-block ml-1" />
                                    </Tooltip>
                                </span>
                            </p>
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
    )
}
