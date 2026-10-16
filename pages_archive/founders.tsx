import Hub from 'components/Hub'
import Link from 'components/Link'
import SEO from 'components/seo'
import React from 'react'

export const Sidebar = () => {
    return (
        <>
            <h6 className="mb-2">About Founder's hub</h6>

            <p>We've curated the best advice to build a successful company.</p>

            <p>
                Some are lessons we've heard from fellow founders, others are from first-hand experience in building
                PostHog to product-market fit and beyond.
            </p>

            {/* <p>
                        Each collection is a work in progress. You can{' '}
                        <Link to="/suggestion" className="underline font-medium">
                            suggest an article topic
                        </Link>{' '}
                        or{' '}
                        <Link to="/vote" className="underline font-medium">
                            vote on ideas
                        </Link>{' '}
                        we haven't written about yet.
                    </p> */}

            {/* <hr className="my-4" />

        <h6>Key</h6>

        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
                <Icons.IconLightBulb className="size-4" />
                <span className="font-medium italic">An article we haven't written yet</span>
            </div>
            <p className="text-sm text-muted ml-6">
                Vote on unwritten articles — we prioritize writing the most popular ones!
            </p>
        </div>

        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
                <Icons.IconArrowUpRight className="size-4" />
                <span className="font-medium">Links to another site</span>
            </div>
            <p className="text-sm text-muted ml-6">
                Somebody else wrote a banger — no sense in writing our own!
            </p>
        </div> */}

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

export default function Founders() {
    return (
        <>
            <SEO title="Founder's hub - PostHog" />
            <Hub title="Founder's hub" folder="founders" sidebar={<Sidebar />} />
        </>
    )
}
