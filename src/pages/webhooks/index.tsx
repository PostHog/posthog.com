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

export default function Webhooks() {
    const webhooksProduct = useProduct({ handle: 'webhooks' }) as any

    if (!webhooksProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = webhooksProduct

    return (
        <>
            <SEO
                title={seo?.title || 'Webhooks - PostHog'}
                description={seo?.description}
                image="/images/og/default.png"
            />
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
                        <h2 className="!m-0 pb-2">Send data to external services automatically</h2>
                        <p>
                            Trigger actions in external services when events occur in PostHog. Connect to thousands of
                            tools and services to automate your workflows.
                        </p>
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

                    <div>
                        <h2>Features</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Real-time event streaming</h3>
                                <p>
                                    Send events to external services immediately as they happen. No delays, no batching
                                    - events are delivered in real-time to your configured endpoints.
                                </p>
                            </div>
                            <div>
                                <h3>Flexible filtering and routing</h3>
                                <p>
                                    Configure which events to send and where to send them. Filter by event properties,
                                    user properties, or custom conditions to ensure the right data reaches the right
                                    services.
                                </p>
                            </div>
                            <div>
                                <h3>Reliable delivery</h3>
                                <p>
                                    Built-in retry logic and error handling ensure your webhooks are delivered reliably.
                                    Monitor delivery status and troubleshoot failed requests.
                                </p>
                            </div>
                            <div>
                                <h3>Custom payload formatting</h3>
                                <p>
                                    Transform event data to match your external service requirements. Map properties,
                                    add custom fields, and format payloads exactly how you need them.
                                </p>
                            </div>
                            <div>
                                <h3>Security and authentication</h3>
                                <p>
                                    Secure your webhook endpoints with custom headers, API keys, and signature
                                    verification. Ensure only authorized requests reach your services.
                                </p>
                            </div>
                        </div>
                    </div>
                    <OSButton asLink variant="primary" size="md" to="/docs/webhooks" state={{ newWindow: true }}>
                        Learn more about webhooks
                    </OSButton>
                </div>
            </ReaderView>
        </>
    )
}
