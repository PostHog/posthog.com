import Hub from 'components/Hub'
import Link from 'components/shared/ui/Link'
import SEO from 'components/shared/layout/seo'
import React from 'react'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/shared/layout/RenderInClient'
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

const startupPlanLink = (
    <Link to="https://posthog.com/startups" className="underline font-medium">
        startup plan
    </Link>
)

export const Sidebar = () => {
    return (
        <>
            <h6 className="mb-2">About Founders hub</h6>

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

            <p>Raised &lt;$5m? Check out our {startupPlanLink}.</p>
        </>
    )
}

const explorerIntro = (
    <>
        {intro}
        <p>Raised &lt;$5m? Check out our {startupPlanLink}.</p>
    </>
)

const ControlHub = () => <Hub title="Founders hub" folder="founders" sidebar={<Sidebar />} />
const RedesignedHub = () => <SidebarExplorer folder="founders" title="Founders hub" intro={explorerIntro} />

export default function Founders() {
    const posthog = usePostHog()

    return (
        <>
            <SEO title="Founders hub - PostHog" />
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
