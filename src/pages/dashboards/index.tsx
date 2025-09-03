import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'

export default function Dashboards() {
    const dashboardsProduct = useProduct({ handle: 'dashboards' }) as any

    if (!dashboardsProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots } = dashboardsProduct

    return (
        <>
            <SEO title={overview?.title} description={overview?.description} image="/images/og/product-analytics.jpg" />
            <Editor>
                <div className="space-y-8">
                    <div>
                        <div className="flex gap-2 items-center">
                            {Icon && (
                                <div className={`size-8 my-4 text-${color}`}>
                                    <Icon />
                                </div>
                            )}
                            <h1 className="!m-0">{name}</h1>
                        </div>
                        <h2 className="!m-0 pb-2">{overview?.title}</h2>
                        <p>{overview?.description}</p>
                    </div>

                    {screenshots && (
                        <div className="space-y-4">
                            {/* Show overview screenshot if it exists */}
                            {screenshots.overview && (
                                <CloudinaryImage
                                    src={screenshots.overview.src}
                                    alt={screenshots.overview.alt}
                                    className="w-full rounded-md shadow-lg"
                                />
                            )}

                            {/* Show additional screenshots, filtering out 'home' if it exists */}
                            {screenshots.additional &&
                                screenshots.additional.map((screenshot: any, index: number) => (
                                    <CloudinaryImage
                                        key={index}
                                        src={screenshot.src}
                                        srcDark={screenshot.srcDark}
                                        alt={screenshot.alt || ''}
                                        className="w-full rounded-md shadow-lg"
                                    />
                                ))}
                        </div>
                    )}

                    {features && features.length > 0 && (
                        <div>
                            <h2>Features</h2>
                            <div className="space-y-6">
                                {features.map((feature: any, index: number) => (
                                    <div key={index}>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {feature.headline || feature.title}
                                        </h3>
                                        <p className="[&>p]:mb-0">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <OSButton
                        asLink
                        variant="primary"
                        size="md"
                        to="/docs/product-analytics/dashboards"
                        state={{ newWindow: true }}
                    >
                        Learn more about dashboards
                    </OSButton>
                </div>
            </Editor>
        </>
    )
}
