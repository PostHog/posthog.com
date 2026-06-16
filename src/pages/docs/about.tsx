import React from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import Link from 'components/Link'
import AskMax from 'components/AskMax'
import SmallTeam from 'components/SmallTeam'
import ScrollArea from 'components/RadixUI/ScrollArea'

export default function AboutDocs(): JSX.Element {
    return (
        <>
            <SEO title="About our docs" description="Ways to explore PostHog's documentation." />
            <Wizard>
                <div className="bg-accent h-full">
                    <ScrollArea>
                        <div className="p-6 text-sm">
                            <h1 className="text-lg mb-4">About our docs</h1>

                            <h2 className="text-base font-semibold mb-1">Ways to explore</h2>
                            <p className="mb-2">
                                Search or{' '}
                                <AskMax linkOnly className="underline font-medium">
                                    Ask PostHog AI
                                </AskMax>{' '}
                                from the box at the top of any docs page.
                            </p>
                            <p className="mb-2">
                                Prefer humans? Ask a question at the end of any article and it cross-posts to our{' '}
                                <Link to="/questions" state={{ newWindow: true }} className="underline font-medium">
                                    community forums
                                </Link>
                                .
                            </p>

                            <hr className="my-4" />

                            <h2 className="text-base font-semibold mb-1">In the product</h2>
                            <p className="mb-2">
                                Tooltips across PostHog link straight to the relevant docs, and you can Ask PostHog AI
                                from inside the app too.
                            </p>

                            <hr className="my-4" />

                            <h2 className="text-base font-semibold mb-1">Feedback</h2>
                            <p className="mb-2">
                                Every page has a feedback box at the bottom. Tell us what was (or wasn't) helpful. We
                                read all of it.
                            </p>
                            <p className="mb-0 text-secondary">
                                Maintained by the
                                <SmallTeam slug="docs-wizard" />.
                            </p>
                        </div>
                    </ScrollArea>
                </div>
            </Wizard>
        </>
    )
}
