import Hub from 'components/Hub'
import Link from 'components/Link'
import SEO from 'components/seo'
import React from 'react'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import SidebarExplorer from 'components/BlogLanding/variants/SidebarExplorer'

// Boolean kill-switch flag for the founders-hub redesign. Rolled out to 100% — everyone gets the
// new SidebarExplorer layout. Disable the flag in PostHog to instantly revert everyone to the
// old icon-grid Hub (no deploy needed).
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

            <h6 className="mb-2">PostHog for startups</h6>
            <p>
                Building a company? Get $50,000 in credits to build a self-driving product, plus exclusive merch and
                partner perks.
            </p>
            <p>
                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold text-primary">
                    Apply to PostHog for startups
                </Link>
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

const foundersIntro = (
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
const RedesignedHub = () => <SidebarExplorer folder="founders" title="Founder's hub" intro={foundersIntro} />

export default function Founders() {
    const posthog = usePostHog()

    return (
        <>
            <SEO title="Founder's hub - PostHog" />
            {/*
              Kill switch: show the new layout by default (it's the 100% experience) and only fall
              back to the old Hub when the flag is explicitly disabled. Rendering the new layout as
              the placeholder means no flash while flags load, and if PostHog is unreachable users
              still get the intended new layout.
            */}
            <RenderInClient
                placeholder={<RedesignedHub />}
                render={() =>
                    posthog?.isFeatureEnabled?.(FOUNDERS_REDESIGN_FLAG) === false ? <ControlHub /> : <RedesignedHub />
                }
            />
        </>
    )
}
