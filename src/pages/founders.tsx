import Hub from 'components/Hub'
import Link from 'components/Link'
import SEO from 'components/seo'
import React from 'react'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import SidebarExplorer from 'components/BlogLanding/variants/SidebarExplorer'

// Kill switch, not an A/B test: disabling it in PostHog reverts everyone to the old hub.
const REDESIGN_FLAG = 'founders-hub-redesign'

const intro = (
    <>
        <p>We've curated the best advice to build a successful company.</p>
        <p>
            Some are lessons we've heard from fellow founders, others are from first-hand experience building PostHog to
            product-market fit and beyond.
        </p>
    </>
)

const productEngineersLink = (
    <Link to="/product-engineers" className="underline font-medium">
        Product engineer's hub
    </Link>
)

export const Sidebar = () => {
    return (
        <>
            <h6 className="mb-2">About Founder's hub</h6>

            {intro}

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

            <p>You might also be interested in our {productEngineersLink}</p>
        </>
    )
}

const explorerIntro = (
    <>
        {intro}
        <p>You might also like our {productEngineersLink}.</p>
    </>
)

const ControlHub = () => <Hub title="Founder's hub" folder="founders" sidebar={<Sidebar />} />
const RedesignedHub = () => <SidebarExplorer folder="founders" title="Founder's hub" intro={explorerIntro} />

export default function Founders() {
    const posthog = usePostHog()

    return (
        <>
            <SEO title="Founder's hub - PostHog" />
            {/*
              Rendering the redesign as the placeholder too means no flash while flags load, and
              keeps the intended layout if PostHog is unreachable.
            */}
            <RenderInClient
                placeholder={<RedesignedHub />}
                render={() =>
                    posthog?.isFeatureEnabled?.(REDESIGN_FLAG) === false ? <ControlHub /> : <RedesignedHub />
                }
            />
        </>
    )
}
