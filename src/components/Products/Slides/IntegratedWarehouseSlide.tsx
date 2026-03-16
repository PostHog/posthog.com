import React from 'react'
import Link from 'components/Link'
import { IconDatabase, IconCloud } from '@posthog/icons'

interface IntegratedWarehouseSlideProps {
    variant?: 'default' | 'feature-flags'
}

export default function IntegratedWarehouseSlide({ variant = 'default' }: IntegratedWarehouseSlideProps) {
    return (
        <div className="h-full p-8 @md:p-12 flex flex-col justify-center bg-light dark:bg-dark">
            <h2 className="text-4xl font-bold text-primary mb-2 text-center">Working with your data warehouse</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto mb-8 text-center" />

            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 @2xl:gap-6 max-w-4xl mx-auto w-full">
                <Link
                    to="/data-stack"
                    state={{ newWindow: true }}
                    className="border border-primary rounded p-6 bg-primary hover:bg-accent transition-colors flex flex-col group"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-blue size-7">
                            <IconDatabase />
                        </span>
                        <h3 className="text-xl font-bold text-primary mb-0">Use our integrated data warehouse</h3>
                    </div>
                    <p className="text-[15px] text-secondary flex-1 mb-3">
                        Tired of maintaining ETL pipelines? Keep data in our managed warehouse and use it across a
                        variety of PostHog tools. Queries run on our compute, and you can send data externally if
                        needed.
                    </p>
                    <span className="text-sm font-semibold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        Learn more &rarr;
                    </span>
                </Link>

                <Link
                    to="/cdp"
                    state={{ newWindow: true }}
                    className="border border-primary rounded p-6 bg-primary hover:bg-accent transition-colors flex flex-col group"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-seagreen size-7">
                            <IconCloud />
                        </span>
                        <h3 className="text-xl font-bold text-primary mb-0">Use an external data warehouse</h3>
                    </div>
                    <p className="text-[15px] text-secondary flex-1 mb-3">
                        Keep data in an existing warehouse and just sync the tables and fields you need into PostHog via
                        our warehouse sources. Keep full control of what data you move, when.
                    </p>
                    <span className="text-sm font-semibold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        Explore warehouse connections &rarr;
                    </span>
                </Link>
            </div>

            {variant === 'feature-flags' && (
                <p className="text-sm text-muted text-center mt-6 mb-0 max-w-2xl mx-auto">
                    Feature flag and experiment targeting require person properties to be available in PostHog&apos;s
                    runtime (e.g. synced from your warehouse or CDP).
                </p>
            )}
        </div>
    )
}
