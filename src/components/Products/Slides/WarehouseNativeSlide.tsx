import React from 'react'
import Link from 'components/Link'

interface WarehouseNativeSlideProps {
    variant?: 'default' | 'feature-flags'
}

export default function WarehouseNativeSlide({ variant = 'default' }: WarehouseNativeSlideProps) {
    return (
        <div className="h-full p-8 @md:p-12 flex flex-col justify-center bg-light dark:bg-dark">
            <h2 className="text-3xl @2xl:text-4xl font-bold text-primary mb-4">Warehouse-native workflows</h2>
            <p className="text-lg @2xl:text-xl text-primary max-w-3xl mb-4">
                PostHog supports <strong>warehouse-native workflows</strong> via an integrated data warehouse. If
                you&apos;re using PostHog as your data warehouse, you get SQL, unified data, and data stays in your
                warehouse. If you&apos;re using an external warehouse, such as Snowflake, PostHog still enables you to
                ingest data via the CDP. Either way, queries run in PostHog.
            </p>
            {variant === 'feature-flags' && (
                <p className="text-lg @2xl:text-xl text-primary max-w-3xl mb-4">
                    Feature flag and experiment targeting require person properties to be available in PostHog&apos;s
                    runtime (e.g. synced from your warehouse or CDP).
                </p>
            )}
            <p className="text-lg text-primary">
                <Link to="/warehouse-native" state={{ newWindow: true }} className="font-semibold underline">
                    Learn more about being warehouse-native with PostHog
                </Link>
            </p>
        </div>
    )
}
