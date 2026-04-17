import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCommand from 'components/WizardCommand'

export default function WizardCTA(): JSX.Element {
    return (
        <div className="relative overflow-hidden rounded not-prose my-6 border border-secondary">
            <div className="max-w-2xl mx-auto">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                    className="dark:hidden absolute inset-0 -bottom-12"
                    imgClassName="h-full w-full object-cover"
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                    className="hidden dark:block absolute inset-0 -bottom-12"
                    imgClassName="h-full w-full object-cover"
                />
                <div className="relative flex flex-col-reverse @lg:flex-row items-center pl-5 @lg:pl-8 pr-5 py-4 @lg:py-3">
                    <div className="flex-1 text-center @lg:text-left">
                        <p className="text-lg font-bold !mb-0">Install PostHog with one command</p>
                        <p className="!mt-1 !mb-3 text-sm opacity-75">
                            Paste this into your terminal and make AI do all the work.
                        </p>
                        <WizardCommand latest={false} />
                    </div>
                    <div className="shrink-0">
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_3f8bb7a240.png"
                            alt="PostHog Wizard hedgehog"
                            className="w-36 @lg:w-32 @xl:w-40 @2xl:w-48"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
