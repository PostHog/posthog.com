import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'
import Glow from 'components/Glow'
import { CTAs } from 'components/CTAs'

const Overview = ({ id, productData }: SectionComponentProps) => {
    const { name, Icon, overview, screenshots, status } = productData ?? {}

    return (
        <section id={id} className="scroll-mt-20 not-prose flex flex-col gap-12 max-w-7xl mx-auto">
            <header className="">
                {screenshots?.home?.src && (
                    <Glow
                        color={productData?.color}
                        className="mb-8 @3xl/reader-content:max-w-lg @3xl/reader-content:float-right @3xl/reader-content:ml-8"
                    >
                        <CloudinaryImage
                            src={screenshots.home.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.home.alt || name}
                            className="w-full"
                            imgClassName="h-auto rounded-lg"
                        />
                    </Glow>
                )}

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Glow color="white" size="md" intensity="strong" className="">
                            {Icon && <Icon className={`size-6 text-${productData?.color}`} />}
                        </Glow>
                        <span className="text-lg font-bold">{name}</span>
                        {status === 'beta' && (
                            <span className="font-bold uppercase border-2 border-current px-1 rounded text-xs">
                                Beta
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold leading-tight">{overview?.title || name}</h2>
                        <p className="leading-relaxed">{overview?.description}</p>
                    </div>
                    <div>
                        <CTAs />
                    </div>
                </div>
            </header>
        </section>
    )
}

export default Overview
