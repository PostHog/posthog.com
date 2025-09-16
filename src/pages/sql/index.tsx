import { graphql } from 'gatsby'
import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { DataVizNav } from '../../hooks/useDataVizNavigation'

const LeftSidebarContent = () => {
    return <DataVizNav />
}

export default function SQL() {
    const sqlProduct = useProduct({ handle: 'sql' }) as any

    if (!sqlProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots } = sqlProduct

    return (
        <>
            <SEO
                title={overview?.title || 'SQL (HogQL)'}
                description={overview?.description || 'Query data directly with HogQL'}
                image="/images/og/default.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title={overview.title} hideTitle>
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

                            {/* Show any other named screenshots except 'home' */}
                            {Object.keys(screenshots)
                                .filter((key) => key !== 'overview' && key !== 'additional' && key !== 'home')
                                .map((key) => {
                                    const screenshot = screenshots[key]
                                    return (
                                        <CloudinaryImage
                                            key={key}
                                            src={screenshot.src}
                                            srcDark={screenshot.srcDark}
                                            alt={screenshot.alt || ''}
                                            className="w-full rounded-md shadow-lg"
                                        />
                                    )
                                })}
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
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/sql" } }) {
            body
            frontmatter {
                title
            }
        }
    }
`
