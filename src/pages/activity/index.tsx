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

export default function Activity() {
    const activityProduct = useProduct({ handle: 'activity' }) as any

    if (!activityProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = activityProduct

    return (
        <>
            <SEO
                title={seo?.title || 'Activity - PostHog'}
                description={seo?.description}
                image="/images/og/product-analytics.jpg"
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
                        <h2 className="!m-0 pb-2">A customizable list of captured events</h2>
                        <p>
                            The activity tab is a customizable list of events that you've captured. It's great for
                            checking events are being captured, debugging captured events, and being a jumping off point
                            for further analysis. You can expand each event to see specific properties, metadata, raw
                            JSON, and feature flags.
                        </p>
                    </div>

                    {/* Main activity screenshot */}
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_16_at_13_25_44_2x_c459debf3b.png"
                        srcDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_16_at_13_26_23_2x_f1d2038057.png"
                        alt="Activity tab"
                        className="w-full rounded-md shadow-lg"
                    />

                    <div>
                        <h2>Key features</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Flexible filtering and customization</h3>
                                <p>
                                    Filter by date, event, properties, and more. Customize the columns shown including
                                    event properties, person properties, feature flags, and even SQL queries. Reorder
                                    columns and set your customization as the default for all project members.
                                </p>
                            </div>
                            <div>
                                <h3>Custom SQL expressions</h3>
                                <p>
                                    Add SQL expressions for advanced customization. For example, to show an absolute
                                    timestamp like "Jul 16, 09:12:55", you can add an SQL expression like{' '}
                                    <code>
                                        formatDateTime(toTimeZone($timestamp, 'America/Chicago'), '%b %d, %H:%i:%s')
                                    </code>
                                    .
                                </p>
                            </div>
                            <div>
                                <h3>Multiple activity views</h3>
                                <p>Switch between different views to see your data in the most useful format:</p>
                                <ul>
                                    <li>
                                        <strong>PostHog default:</strong> Shows a list of events with their person, URL
                                        or screen, library, and time
                                    </li>
                                    <li>
                                        <strong>Project default:</strong> Shows events with your configured columns
                                    </li>
                                    <li>
                                        <strong>Event count:</strong> Shows each event along with the number of times
                                        it's been captured
                                    </li>
                                    <li>
                                        <strong>Live:</strong> Shows a live feed of events as they are captured with
                                        currently active users
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3>Live event streaming</h3>
                                <p>
                                    Watch events flow in real-time as they are captured. See the number of currently
                                    active users, filter for specific events, or pause the stream to inspect events in
                                    detail.
                                </p>
                            </div>
                            <div>
                                <h3>Event debugging</h3>
                                <p>
                                    Expand any event to inspect its properties, metadata, and raw JSON. Perfect for
                                    debugging your event tracking implementation and understanding what data is being
                                    captured.
                                </p>
                            </div>
                            <div>
                                <h3>Feature flag evaluation</h3>
                                <p>
                                    See which feature flags were active when each event was captured. Understand how
                                    feature rollouts affect user behavior and debug flag targeting.
                                </p>
                            </div>
                        </div>
                    </div>

                    {screenshots && (
                        <div className="space-y-4">
                            {/* Show additional screenshots if they exist */}
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

                    <OSButton asLink variant="primary" size="md" to="/docs/activity" state={{ newWindow: true }}>
                        Learn more about the activity tab
                    </OSButton>
                </div>
            </ReaderView>
        </>
    )
}
