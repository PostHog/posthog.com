import React from 'react'
import OSButton from 'components/OSButton'

interface IntegratedWarehouseSlideProps {
    variant?: 'default' | 'feature-flags'
}

export default function IntegratedWarehouseSlide({ variant = 'default' }: IntegratedWarehouseSlideProps) {
    return (
        <div className="h-full p-8 @md:p-12 flex flex-col justify-center bg-primary">
            <h2 className="text-4xl font-bold text-primary mb-2 text-center">Working with your data warehouse</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto mb-8 text-center"></p>

            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 @2xl:gap-6 mb-8">
                <div className="border border-primary rounded-md p-6 bg-accent flex flex-col">
                    <h3 className="text-2xl font-bold text-primary mb-2">Use our integrated data warehouse</h3>
                    <p className="text-lg text-secondary flex-1 mb-4">
                        Tired of maintaining ETL pipelines? Keep data in our managed warehouse and use it across a
                        variety of PostHog tools. Queries run on our compute, and you can send data externally if
                        needed.
                    </p>
                    <OSButton asLink to="/data-stack" state={{ newWindow: true }} variant="secondary" size="md">
                        Learn more
                    </OSButton>
                </div>

                <div className="border border-primary rounded-md p-6 bg-accent flex flex-col">
                    <h3 className="text-2xl font-bold text-primary mb-2">Use an external data warehouse</h3>
                    <p className="text-lg text-secondary flex-1 mb-4">
                        Keep data in an existing warehouse and just sync the tables and fields you need into PostHog via
                        our warehouse sources. Keep full control of what data you move, when.
                    </p>
                    <OSButton asLink to="/cdp" state={{ newWindow: true }} variant="secondary" size="md">
                        Explore warehouse connections
                    </OSButton>
                </div>
            </div>

            {variant === 'feature-flags' && (
                <div className="rounded-lg border border-primary bg-accent p-4 mb-6 max-w-3xl mx-auto">
                    <p className="text-base text-secondary text-center mb-0">
                        Feature flag and experiment targeting require person properties to be available in
                        PostHog&apos;s runtime (e.g. synced from your warehouse or CDP).
                    </p>
                </div>
            )}
        </div>
    )
}
