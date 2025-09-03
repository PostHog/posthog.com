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

export default function Notebooks() {
    const notebooksProduct = useProduct({ handle: 'notebooks' }) as any

    if (!notebooksProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = notebooksProduct

    return (
        <>
            <SEO
                title={seo?.title || 'Notebooks - PostHog'}
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
                        <h2 className="!m-0 pb-2">Combine PostHog tools into a single space for analysis</h2>
                        <p>
                            Notebooks enable you to combine the tools of PostHog into a single space for analysis.
                            Rather than jumping between dashboards, insights, replays, experiment results, and more,
                            your chain of analysis exists on a single page. It provides a flexible interface for
                            organizing ad-hoc analysis, bug investigations, internal documentation, and feature
                            releases.
                        </p>
                    </div>

                    {screenshots && screenshots.overview && (
                        <CloudinaryImage
                            src={screenshots.overview.src}
                            alt={screenshots.overview.alt}
                            className="w-full rounded-md shadow-lg"
                        />
                    )}

                    <div>
                        <h2>Key capabilities</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Notebook popover - access from anywhere</h3>
                                <p>
                                    Critical to combining PostHog functionality is being able to access notebooks from
                                    anywhere, like a scratchpad for analysis which you can organize and clean up later.
                                    Click and drag any link in PostHog to open a notebook popover.
                                </p>
                                <video className="w-full rounded-md shadow-lg mb-4" autoPlay loop muted playsInline>
                                    <source
                                        src="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/popover-light-mode.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div>
                                <h3>Rich content types</h3>
                                <p>
                                    Notebooks support a wide variety of content types to help you tell the complete
                                    story:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Text and markdown:</strong> Headings, lists, bold, italic, code blocks
                                    </li>
                                    <li>
                                        <strong>All insight types:</strong> Trends, funnels, retention, paths,
                                        stickiness, lifecycle, and SQL
                                    </li>
                                    <li>
                                        <strong>Events and persons:</strong> Event lists, person profiles, groups, and
                                        cohorts
                                    </li>
                                    <li>
                                        <strong>Session replays:</strong> Individual replays and filtered playlists with
                                        comments
                                    </li>
                                    <li>
                                        <strong>Feature flags:</strong> Flag status, release conditions, and
                                        implementation code
                                    </li>
                                    <li>
                                        <strong>Surveys:</strong> Survey responses with visualizations
                                    </li>
                                    <li>
                                        <strong>LaTeX:</strong> Mathematical formulas and equations
                                    </li>
                                    <li>
                                        <strong>Images and GIFs:</strong> Visual documentation
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>Multiple ways to add content</h3>
                                <p>Add content to notebooks in the way that works best for you:</p>
                                <video className="w-full rounded-md shadow-lg mb-4" autoPlay loop muted playsInline>
                                    <source
                                        src="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/slash-light-mode.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                                <ul>
                                    <li>
                                        <strong>Slash commands:</strong> Type <code>/</code> for a menu of options like{' '}
                                        <code>/trend</code> for trend insights
                                    </li>
                                    <li>
                                        <strong>Plus icon:</strong> Click the <code>+</code> on empty lines for the same
                                        menu
                                    </li>
                                    <li>
                                        <strong>Drag and drop:</strong> Click and hold any link in PostHog to drag into
                                        the notebook popover
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>Insights with full customization</h3>
                                <p>
                                    Every PostHog insight can be fully customized within notebooks just like in the
                                    insights interface. Click the three-line icon to edit filters, breakdowns, and
                                    visualizations.
                                </p>
                                <video className="w-full rounded-md shadow-lg mb-4" autoPlay loop muted playsInline>
                                    <source
                                        src="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/insights-light-mode.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div>
                                <h3>Session replay integration</h3>
                                <p>
                                    Add individual replays or filtered playlists. Within notebooks, you can see new
                                    replays, update filters, pin important sessions, and add timestamped comments for
                                    collaboration.
                                </p>
                                <video className="w-full rounded-md shadow-lg mb-4" autoPlay loop muted playsInline>
                                    <source
                                        src="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/replay-light-mode.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div>
                                <h3>Canvas for quick exploration</h3>
                                <p>
                                    Canvas notebooks persist entirely in the URL, making them perfect for quick
                                    explorations you want to share but don't need to save. The shareable link updates as
                                    you edit.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Use cases</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Ad-hoc analysis chains</h3>
                                <p>
                                    Follow your analysis from question to answer without switching between tools. Keep
                                    all related insights, replays, and data in one place.
                                </p>
                            </div>
                            <div>
                                <h3>Bug investigation reports</h3>
                                <p>
                                    Document bug discoveries with session replays, event timelines, and affected
                                    cohorts. Share findings with engineering teams.
                                </p>
                            </div>
                            <div>
                                <h3>Feature launch documentation</h3>
                                <p>
                                    Track feature rollouts with flag configurations, adoption metrics, and user feedback
                                    all in one notebook.
                                </p>
                            </div>
                            <div>
                                <h3>Team knowledge sharing</h3>
                                <p>
                                    Create living documents that update automatically as your product evolves. Perfect
                                    for onboarding and team alignment.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-accent rounded-md p-6">
                        <h3 className="mt-0">Notebooks vs Dashboards</h3>
                        <p>
                            <strong>Dashboards</strong> are great for metrics you want to check repeatedly and
                            understanding the status of your product.
                        </p>
                        <p className="mb-0">
                            <strong>Notebooks</strong> are great for doing analysis and piecing data together into a
                            narrative that incorporates all of PostHog's tools.
                        </p>
                    </div>

                    <OSButton asLink variant="primary" size="md" to="/docs/notebooks" state={{ newWindow: true }}>
                        Learn more about notebooks
                    </OSButton>
                </div>
            </ReaderView>
        </>
    )
}
