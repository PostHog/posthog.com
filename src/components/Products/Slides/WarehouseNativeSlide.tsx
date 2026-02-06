import React from 'react'
import OSButton from 'components/OSButton'

interface WarehouseNativeSlideProps {
    variant?: 'default' | 'feature-flags'
}

export default function WarehouseNativeSlide({ variant = 'default' }: WarehouseNativeSlideProps) {
    return (
        <div className="h-full p-8 @md:p-12 flex flex-col justify-center bg-light dark:bg-dark">
            <h2 className="text-4xl font-bold text-primary mb-2 text-center">Warehouse-native workflows</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto mb-8 text-center">
                Choose between warehouse-native workflows using our data warehouse, or bringing data in from external
                warehouses. Either way, you control where your data lives and how it&apos;s used.
            </p>

            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 @2xl:gap-6 mb-8">
                <div className="border-2 border-primary rounded-lg p-6 bg-primary flex flex-col">
                    <h3 className="text-2xl font-bold text-primary mb-2">Use our integrated data warehouse</h3>
                    <p className="text-lg text-secondary flex-1 mb-4">
                        Store, query, and model data in PostHog's integrated data warehouse. Use it in warehouse native workflows across other PostHog tools, or in notebooks supporting SQL and Python. Queries run on. our infrastructure and your data never needs to travel. 
                    </p>
                    <OSButton asLink to="/data-stack" state={{ newWindow: true }} variant="secondary" size="md">
                        Learn more about being warehouse native
                    </OSButton>
                </div>

                <div className="border-2 border-primary rounded-lg p-6 bg-primary flex flex-col">
                    <h3 className="text-2xl font-bold text-primary mb-2">Use an external data warehouse</h3>
                    <p className="text-lg text-secondary flex-1 mb-4">
                        Keep data in an existing warehouse and sync the tables and fields you need into PostHog via our
                        warehouse sources. Queries run in PostHog.
                    </p>
                    <OSButton asLink to="/cdp" state={{ newWindow: true }} variant="secondary" size="md">
                        Explore available data sources
                    </OSButton>
                </div>
            </div>

            {variant === 'feature-flags' && (
                <div className="rounded-lg border border-primary bg-accent p-4 mb-6 max-w-3xl mx-auto">
                    <p className="text-base text-secondary text-center mb-0">
                        Feature flag and experiment targeting require person properties to be available in PostHog’s
                        runtime (e.g. synced from your warehouse or CDP).
                    </p>
                </div>
            )}
        </div>
    )
}
