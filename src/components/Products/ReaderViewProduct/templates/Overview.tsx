import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'

const Overview = ({ id, productData }: SectionComponentProps) => {
    const { name, Icon, overview, screenshots, status } = productData ?? {}

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="flex flex-col @lg:flex-row gap-8 items-start">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-3 text-secondary">
                        {Icon && <Icon className="size-6" />}
                        <span className="text-sm font-semibold uppercase tracking-wider">{name}</span>
                        {status === 'beta' && (
                            <span className="font-bold uppercase border-2 border-current px-1 rounded text-xs">
                                Beta
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl font-bold text-primary mt-0 mb-3 leading-tight">
                        {overview?.title || name}
                    </h2>
                    <p className="text-lg text-secondary m-0 leading-relaxed">{overview?.description}</p>
                </div>
                {screenshots?.overview?.src && (
                    <div className="flex-1 w-full">
                        <CloudinaryImage
                            src={screenshots.overview.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.overview.alt || name}
                            className="w-full"
                            imgClassName="w-full h-auto rounded shadow-xl"
                        />
                    </div>
                )}
            </header>
        </section>
    )
}

export default Overview
