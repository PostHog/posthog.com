import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { User } from '../../hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'

export default function Newsletter({ user }: { user: User }) {
    //const { email } = user

    return (
        <div className="flex flex-col @md:flex-row items-center gap-4 @md:gap-8">
            <div className="text-center @md:text-right">
                <StaticImage
                    src="../../images/newsletter-signup.png"
                    objectFit="contain"
                    className="w-full h-full max-w-[200px] mx-auto"
                />
            </div>
            <div className="@md:pt-6 w-full">
                <p className="text-sm opacity-50 m-0">Subscribe to our Substack newsletter</p>
                <h4 className="relative text-2xl m-0">Product for engineers</h4>
                <p className="m-0 text-[15px]">Helping engineers and founders flex their product muscles</p>
                <div className="">
                    <div className="flex flex-col @md:flex-row items-start gap-2 my-4 @md:my-2">
                        <input
                            type="text"
                            placeholder="Email address"
                            className="border border-light dark:border-dark rounded text-[15px] w-full flex-1"
                        />
                        <CallToAction size="md" className="-mt-px w-full @md:w-auto">
                            Subscribe
                        </CallToAction>
                    </div>
                    <p className="text-sm opacity-50 text-center @md:text-left">
                        We'll share your email with Substack
                        <Tooltip
                            content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                            tooltipClassName="max-w-md"
                        >
                            <IconInfo className="w-4 h-4 inline-block ml-1" />
                        </Tooltip>
                    </p>
                    {/* {email && (
                        <p className="m-0 font-normal text-sm text-primary/60 dark:text-primary-dark/60">{email}</p>
                    )} */}
                </div>
            </div>
        </div>
    )
}
