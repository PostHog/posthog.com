import React from 'react'
import Viewer from 'components/Viewer'
import { TreeMenu } from 'components/TreeMenu'
import { whyPostHogNav } from '../../navs/whyPostHog'
import WhyPostHogHeader from './Header'

type ViewerProps = React.ComponentProps<typeof Viewer>

/**
 * Shared layout for the "Why PostHog?" page collection (`/101`, `/workflow`, `/why`, `/moat`,
 * `/start`). Wraps the `Viewer` template with the collection's left navigation sidebar:
 *
 * - `sidebarHeader`: the static `WhyPostHogHeader` (logomark + "Why PostHog?").
 * - `leftSidebar`: the `whyPostHogNav` link list (`TreeMenu` sidebar appearance), each entry an
 *   individual page with the current one highlighted automatically from the pathname.
 *
 * On `@3xl`+ containers the sidebar is a persistent ~250px column (header + page search + nav);
 * on narrow containers it collapses to a menu button that expands the search + nav downward.
 *
 * All other `Viewer` props pass through so each page controls its own content, SEO, etc.
 * `proseSize` defaults to `lg` to match the collection's reading layout.
 */
const WhyPostHogViewer = ({ children, ...props }: ViewerProps): JSX.Element => {
    return (
        <Viewer
            proseSize="lg"
            {...props}
            sidebarHeader={<WhyPostHogHeader />}
            leftSidebar={<TreeMenu items={whyPostHogNav} appearance="sidebar" />}
        >
            {children}
        </Viewer>
    )
}

export default WhyPostHogViewer
