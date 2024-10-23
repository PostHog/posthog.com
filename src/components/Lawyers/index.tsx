import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import { YouTube, LinkedIn } from 'components/Icons'

export default function Lawyers() {
    return (
        <>
            <p className="text-sm opacity-60 uppercase mb-4 text-center">Some of our crack team of lawyers:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 mb-4 border-b border-light dark:border-dark">
                <div className="flex flex-col items-center gap-1 text-center">
                    <figure className="size-24 rounded-full overflow-hidden p-0.5 border border-light dark:border-dark">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/lawyers/barry-zuckerkorn.jpg"
                            className="rounded-full "
                            alt="Barry Zuckerkorn"
                        />
                    </figure>
                    <span className="pt-1">Barry Zuckerkorn</span>
                    <div>
                        <Link
                            href="https://www.youtube.com/watch?v=v84IxZHQ6wQ"
                            externalNoIcon
                            className="opacity-60 hover:opacity-100"
                        >
                            <YouTube className="size-6 inline-block relative -top-0.5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                    <figure className="size-24 rounded-full overflow-hidden p-0.5 border border-light dark:border-dark">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/lawyers/wayne-jarvis.jpg"
                            className="rounded-full "
                            alt="Wayne Jarvis"
                        />
                    </figure>
                    <span className="pt-1">Wayne Jarvis</span>
                    <div>
                        <Link
                            href="https://www.youtube.com/watch?v=PcW8yfJFWBw"
                            externalNoIcon
                            className="opacity-60 hover:opacity-100"
                        >
                            <YouTube className="size-6 inline-block relative -top-0.5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                    <figure className="size-24 rounded-full overflow-hidden p-0.5 border border-light dark:border-dark">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/lawyers/maggie-lizer.jpg"
                            className="rounded-full "
                            alt="Maggie Lizer"
                        />
                    </figure>
                    <span className="pt-1">Maggie Lizer</span>
                    <div>
                        <Link
                            href="https://www.youtube.com/watch?v=cPHtRs5tfkw"
                            externalNoIcon
                            className="opacity-60 hover:opacity-100"
                        >
                            <YouTube className="size-6 inline-block relative -top-0.5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                    <figure className="size-24 rounded-full overflow-hidden p-0.5 border border-light dark:border-dark">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/lawyers/bob-loblaw.jpg"
                            className="rounded-full "
                            alt="Bob Loblaw"
                        />
                    </figure>
                    <span className="pt-1">Bob Loblaw</span>
                    <div className="flex items-center gap-1">
                        <Link
                            href="https://youtu.be/ZgfiV2g5DPY?si=BkFB4Eoj1PN18AcX&t=55"
                            externalNoIcon
                            className="opacity-60 hover:opacity-100"
                        >
                            <YouTube className="size-6 inline-block relative -top-0.5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/bob-loblaw-934693118"
                            externalNoIcon
                            className="opacity-60 hover:opacity-100"
                        >
                            <LinkedIn className="size-5 inline-block relative top-[-3px]" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 justify-center py-1">
                <div className="mt-1 rounded-full bg-accent w-12 h-12 overflow-hidden">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1683655764/james_b841adce96.png"
                        alt='James ("Veg"/"JC") Hawkins'
                        className="w-12 h-12"
                    />
                </div>
                <div>
                    <p className="max-w-sm !mb-0 !pb-0">
                        <em>"They're expensive, but we haven't gotten sued yet!"</em>
                    </p>
                    <p className="mb-0 leading-tight">
                        <span className="font-semibold">James Hawkins</span>
                        <br />
                        <span className="text-xs opacity-70">CEO &amp; Co-founder</span>
                    </p>
                </div>
            </div>
        </>
    )
}
