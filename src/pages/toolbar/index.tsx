import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'

const LeftSidebarContent = () => {
    return <TreeMenu items={productOSNav.children} />
}

export default function Toolbar() {
    const toolbarProduct = useProduct({ handle: 'toolbar' }) as any

    if (!toolbarProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots } = toolbarProduct

    return (
        <>
            <SEO title={overview?.title} description={overview?.description} image="/images/og/product-analytics.jpg" />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
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
                            {Array.isArray(screenshots) ? (
                                screenshots.map((screenshot: any, index: number) =>
                                    screenshot.src.includes('.mp4') ? (
                                        <video
                                            key={index}
                                            className="w-full rounded-md shadow-lg"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        >
                                            <source src={screenshot.src} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <CloudinaryImage
                                            key={index}
                                            src={screenshot.src}
                                            alt={screenshot.alt || ''}
                                            className="w-full rounded-md shadow-lg"
                                        />
                                    )
                                )
                            ) : (
                                <>
                                    {screenshots.overview && (
                                        <CloudinaryImage
                                            src={screenshots.overview.src}
                                            alt={screenshots.overview.alt}
                                            className="w-full rounded-md shadow-lg"
                                        />
                                    )}
                                </>
                            )}
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
                    <OSButton asLink variant="primary" size="md" to="/docs/toolbar" state={{ newWindow: true }}>
                        Learn more about the toolbar
                    </OSButton>
                </div>
            </ReaderView>
        </>
    )
}
