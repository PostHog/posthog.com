import Explorer from 'components/Explorer'
import Cover from 'components/PocketGuides/Cover'
import SEO from 'components/seo'
import React from 'react'

import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'

import { POCKET_GUIDE_VOLUMES } from '../../constants/pocketGuides'

export default function PocketGuidesPage(): JSX.Element {
    const counts = usePocketGuideCounts()
    const volumes = [...POCKET_GUIDE_VOLUMES].sort((a, b) => a.volume - b.volume)

    return (
        <>
            <SEO
                title="Pocket guides - PostHog"
                description="PostHog use case guides, in your pocket. Spot what's happening in your product, then fix it in a click."
                image="/images/og/default.png"
            />
            {/* showTitle false: the page owns its heading, and Explorer's would be a second h1. */}
            <Explorer
                template="generic"
                slug="pocket-guides"
                title="Pocket guides"
                showTitle={false}
                showAddressBar={false}
                // Docs-style chrome: no header-bar strip, the OS window buttons float over the
                // page. Empty options keep HeaderBar from rendering.
                headerBarOptions={[]}
                // Explorer's <main> paints opaque bg-primary over the window shell's translucent
                // material; transparent here lets the standard glass show behind the shelf.
                className="[&_main]:bg-transparent"
            >
                {/* not-prose: Explorer wraps children in prose, which underlines every cover link. */}
                <div className="@container not-prose p-2 @xl:p-6">
                    <div className="mx-auto max-w-5xl">
                        <header className="mb-10 max-w-2xl">
                            <h1 className="m-0 text-4xl font-bold leading-tight text-primary @xl:text-5xl">
                                Pocket guides
                            </h1>
                            <p className="mt-3 mb-0 text-base leading-relaxed text-secondary @xl:text-lg">
                                PostHog use case guides, in your pocket. Spot what's happening in your product, then fix
                                it in a click.
                            </p>
                        </header>

                        {/* Static list so the shelf is in built HTML; fixed widths keep covers book-sized. */}
                        {/* Narrow containers: one centered scrolling stack. Wide: the wrapping shelf. */}
                        <ul className="m-0 flex list-none flex-col items-center gap-8 p-0 @xl:flex-row @xl:flex-wrap @xl:items-stretch @xl:gap-6">
                            {volumes.map((volume) => (
                                <li key={volume.id} className="w-[250px] @xl:w-[210px] @4xl:w-[230px]">
                                    <Cover placement="shelf" volume={volume} count={counts[volume.id] ?? 0} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
