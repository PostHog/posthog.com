import Hub from 'components/Hub'
import Link from 'components/Link'
import SEO from 'components/seo'
import React from 'react'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import SidebarExplorer from 'components/BlogLanding/variants/SidebarExplorer'

// Multivariate flag driving the founders-hub redesign A/B test.
// control = existing icon-grid Hub, test = new SidebarExplorer landing.
export const FOUNDERS_REDESIGN_FLAG = 'founders-hub-redesign'

export const Sidebar = () => {
    return (
        <>
            <h6 className="mb-2">About Founder's hub</h6>

            <p>We've curated the best advice to build a successful company.</p>

            <p>
                Some are lessons we've heard from fellow founders, others are from first-hand experience in building
                PostHog to product-market fit and beyond.
            </p>

            <hr className="my-4" />

            <p>
                You might also be interested in our{' '}
                <Link to="/product-engineers" className="underline font-medium">
                    Product engineer's hub
                </Link>
            </p>
        </>
    )
}

// Intro copy for the redesigned (test) layout. Exported so the preview page can reuse it.
export const foundersIntro = (
    <>
        <p>We've curated the best advice to build a successful company.</p>
        <p>
            Some are lessons we've heard from fellow founders, others are from first-hand experience building PostHog to
            product-market fit and beyond. You might also like our{' '}
            <Link to="/product-engineers" className="underline font-medium">
                Product engineer's hub
            </Link>
            .
        </p>
    </>
)

const ControlHub = () => <Hub title="Founder's hub" folder="founders" sidebar={<Sidebar />} />

export default function Founders() {
    const posthog = usePostHog()

    return (
        <>
            <SEO title="Founder's hub - PostHog" />
            <RenderInClient
                placeholder={<ControlHub />}
                render={() =>
                    posthog?.getFeatureFlag?.(FOUNDERS_REDESIGN_FLAG) === 'test' ? (
                        <SidebarExplorer folder="founders" title="Founder's hub" intro={foundersIntro} />
                    ) : (
                        <ControlHub />
                    )
                }
            />
        </>
    )
}
