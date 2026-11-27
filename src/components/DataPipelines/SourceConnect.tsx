import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import PlatformInstall from 'components/PlatformInstall'

const HEDGEHOG_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/wizard_3f8bb7a240.png'

/** Connect section for a source page: the title and description sit in the tan wizard box. */
export default function SourceConnect({
    id,
    title,
    description,
    manualTo,
    command = 'warehouse',
}: {
    id?: string
    title: string
    description: string
    /** Docs for setting the source up by hand. */
    manualTo: string
    command?: string
}): JSX.Element {
    return (
        <section id={id} className="mt-12 scroll-mt-4">
            <div className="relative overflow-hidden rounded border border-secondary">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                    className="absolute inset-0 -bottom-12 dark:hidden"
                    imgClassName="h-full w-full object-cover"
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                    className="absolute inset-0 -bottom-12 hidden dark:block"
                    imgClassName="h-full w-full object-cover"
                />
                <div className="relative flex flex-col items-start gap-6 p-5 @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:gap-10 @2xl:p-8">
                    <div className="min-w-0 max-w-2xl">
                        <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">{title}</h2>
                        <p className="m-0 mt-2 text-pretty text-base opacity-80">{description}</p>
                        <div className="mt-5">
                            <PlatformInstall variant="inline" command={command} secondaryTo={manualTo} />
                        </div>
                    </div>
                    <img src={HEDGEHOG_SRC} alt="PostHog Wizard hedgehog" className="h-auto w-36 shrink-0 @2xl:w-48" />
                </div>
            </div>
        </section>
    )
}
