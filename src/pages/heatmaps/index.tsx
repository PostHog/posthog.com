import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'

export default function Heatmaps() {
    const heatmapsProduct = useProduct({ handle: 'heatmaps' }) as any

    if (!heatmapsProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = heatmapsProduct

    return (
        <>
            <SEO
                title={seo?.title || 'Heatmaps - PostHog'}
                description={seo?.description}
                image="/images/og/default.png"
            />
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
                        <h2 className="!m-0 pb-2">See how users interact with every element on your page</h2>
                        <p>
                            Heatmaps show you how users are interacting with elements on your website or app. Visualize
                            clicks, mouse movements, scrolling behavior, and discover where users get frustrated with
                            rageclicks.
                        </p>
                    </div>

                    {/* Main heatmap screenshot */}
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/toolbar-heatmap.png"
                        alt="PostHog heatmaps interface"
                        className="w-full rounded-md shadow-lg"
                    />

                    <div>
                        <h2>Three types of heatmaps</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>🔥 Heatmaps</h3>
                                <p>
                                    Captures mouse movements, clicks, dead clicks, and rageclicks. Shows you a visual
                                    heatmap of all interactions - not just on clickable elements. See where users are
                                    trying to click, even when there's nothing to click on.
                                </p>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/v1716592885/posthog.com/contents/docs/toolbar/settings.png"
                                    alt="Heatmap settings"
                                    className="w-full rounded-md shadow-lg mt-4"
                                />
                            </div>
                            <div>
                                <h3>📜 Scrollmaps</h3>
                                <p>
                                    Uses data from pageview and pageleave events to show how far down the page users are
                                    scrolling. Understand which content gets viewed and where users drop off.
                                </p>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/v1716593249/posthog.com/contents/docs/toolbar/scrollmap.png"
                                    alt="Scrollmap"
                                    className="w-full rounded-md shadow-lg mt-4"
                                />
                            </div>
                            <div>
                                <h3>👆 Clickmaps</h3>
                                <p>
                                    The OG heatmap. Uses autocapture to show exact click counts on specific clickable
                                    elements. Each element shows total clicks and rageclicks. Perfect for understanding
                                    which CTAs and links get the most attention.
                                </p>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/posthog-heatmap-example.png"
                                    alt="Clickmap example"
                                    className="w-full rounded-md shadow-lg mt-4"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Key features</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Flexible configuration</h3>
                                <p>Customize your heatmap experience to match your needs:</p>
                                <ul>
                                    <li>
                                        <strong>Aggregation:</strong> View by total events or unique users
                                    </li>
                                    <li>
                                        <strong>Viewport accuracy:</strong> Adjust tolerance for different screen sizes
                                    </li>
                                    <li>
                                        <strong>Color palettes:</strong> Choose gradients that work with your site
                                        design
                                    </li>
                                    <li>
                                        <strong>Fixed positioning:</strong> Handle fixed elements like headers correctly
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>Wildcard URL matching</h3>
                                <p>
                                    Combine heatmap data from similar pages using wildcards. For example, use{' '}
                                    <code>/products/*</code> to see aggregated heatmaps across all product pages.
                                    Perfect for ecommerce sites and dynamic content.
                                </p>
                            </div>

                            <div>
                                <h3>Create actions from clicks</h3>
                                <p>
                                    With the clickmap enabled, click any element to instantly create an action from it.
                                    Turn insights into trackable metrics without writing code.
                                </p>
                                <video className="w-full rounded-md shadow-lg mt-4" autoPlay loop muted playsInline>
                                    <source
                                        src="https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/products/product-analytics/heatmaps-create-action.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div>
                                <h3>Rageclick detection</h3>
                                <p>
                                    Automatically detect user frustration. A rageclick is captured when users click the
                                    same element more than three times within one second - helping you identify
                                    confusing UI elements.
                                </p>
                            </div>

                            <div>
                                <h3>Match links by target URL</h3>
                                <p>
                                    For dynamic lists, match clicks by their target URL instead of position. Understand
                                    which specific items get clicked, not just which position in the list.
                                </p>
                            </div>

                            <div>
                                <h3>No performance impact</h3>
                                <p>
                                    Heatmap data is captured efficiently alongside regular analytics events. It doesn't
                                    contribute to your bill, and visualizations only render when you view them - your
                                    users never experience any slowdown.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-accent rounded-md p-6">
                        <h3 className="mt-0">Getting started</h3>
                        <p className="mb-4">To start using heatmaps:</p>
                        <ol className="mb-4">
                            <li>
                                Enable heatmap data capture in your project settings or with the{' '}
                                <code>enable_heatmaps</code> key in your JavaScript SDK initialization
                            </li>
                            <li>Install the PostHog toolbar on your site</li>
                            <li>Click the heatmap icon in the toolbar to start viewing heatmaps</li>
                        </ol>
                        <p className="text-sm opacity-70 mb-0">
                            Note: Clickmaps require autocapture to be enabled, and scrollmaps require pageleave events.
                        </p>
                    </div>

                    <div>
                        <h2>View heatmaps two ways</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-primary rounded-md p-4">
                                <h3 className="mt-0">Via the toolbar</h3>
                                <p>
                                    View heatmaps directly on your live site. Perfect for quick analysis and creating
                                    actions on the fly.
                                </p>
                            </div>
                            <div className="border border-primary rounded-md p-4">
                                <h3 className="mt-0">In-app (beta)</h3>
                                <p>
                                    Access heatmaps from within PostHog. Currently in opt-in beta with more features
                                    coming soon.
                                </p>
                            </div>
                        </div>
                    </div>

                    {screenshots && screenshots.additional && (
                        <div className="space-y-4">
                            {screenshots.additional.map((screenshot: any, index: number) => (
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

                    <div className="grid md:grid-cols-2 gap-4">
                        <OSButton
                            asLink
                            variant="primary"
                            size="md"
                            to="/docs/toolbar/heatmaps"
                            state={{ newWindow: true }}
                            width="full"
                        >
                            Read heatmap documentation
                        </OSButton>
                        <OSButton
                            asLink
                            variant="secondary"
                            size="md"
                            to="/docs/toolbar"
                            state={{ newWindow: true }}
                            width="full"
                        >
                            Learn about the toolbar
                        </OSButton>
                    </div>
                </div>
            </Editor>
        </>
    )
}
