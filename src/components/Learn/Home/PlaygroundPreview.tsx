import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { TWIG_URL } from '../../../constants'
import { handOffToTwig } from '../learnTracking'
import TwigHomePreview from '../TwigExhibits/TwigHomePreview'

const PANEL_ACTIONS = ['Take a tour', 'Explore on your own']
const LABS = ['Product Analytics', 'AI Observability', 'Session Replay', 'Error Tracking']

/** The Playground section of the Learn home: what Twig is, one link to it, and a preview of Twig with its PostHog panel. */
export default function PlaygroundPreview(): JSX.Element {
    const posthog = usePostHog()
    const exploreTwig = (event: React.MouseEvent) => {
        posthog?.capture('learn_resource_selected', { resource: 'twig', option: 'explore_twig', surface: 'learn_home' })
        // Read the live SDK: it may load after this page renders.
        handOffToTwig(event, window.posthog, TWIG_URL, 'learn_home')
    }
    return (
        <section>
            <div className="max-w-xl">
                <h2 className="m-0 text-xl font-bold">Tinker with Twig</h2>
                <p className="mb-0 mt-1 text-secondary">
                    Twig is a live vacation rental website with PostHog built in. Click around, then open the PostHog
                    Playground to see the events and code behind every click.
                </p>
                <OSButton
                    asLink
                    to={TWIG_URL}
                    external
                    variant="primary"
                    size="md"
                    onClick={exploreTwig}
                    className="mt-4"
                >
                    Explore Twig
                </OSButton>
            </div>
            <figure
                aria-label="A preview of Twig, with the PostHog Playground panel on the right"
                className="m-0 mt-5 overflow-hidden rounded-md border border-primary bg-accent"
            >
                <div aria-hidden="true" className="flex items-center gap-2 border-b border-primary px-3 py-2">
                    <span className="size-2.5 rounded-full bg-brand-coral" />
                    <span className="size-2.5 rounded-full bg-brand-yellow" />
                    <span className="size-2.5 rounded-full bg-brand-green" />
                    <span className="ml-3 w-full max-w-xs rounded border border-primary bg-primary px-3 py-0.5 text-xs text-secondary">
                        twig.com
                    </span>
                </div>
                <div className="@container flex">
                    <div className="min-w-0 flex-1">
                        <TwigHomePreview />
                    </div>
                    {/* The panel stays pinned to the right. Narrow windows show Twig only. */}
                    <aside className="hidden w-60 shrink-0 border-l border-primary bg-white p-4 dark:bg-dark @2xl:block">
                        <p className="m-0 text-xs font-semibold text-secondary">PostHog Playground</p>
                        <p className="mb-0 mt-2 text-lg font-bold">Meet Twig</p>
                        <p className="mb-0 mt-1 text-sm text-secondary">
                            Twig is a demo vacation rental site. The PostHog Playground shows the PostHog events and
                            code behind it.
                        </p>
                        {PANEL_ACTIONS.map((label) => (
                            <span
                                key={label}
                                className="mt-3 flex items-center justify-between rounded border border-primary px-3 py-2 text-sm font-semibold"
                            >
                                {label}
                                <IconArrowRight className="size-4" />
                            </span>
                        ))}
                        <div className="mt-3 rounded border border-primary px-3 py-2">
                            <p className="m-0 text-sm font-semibold">Learn with labs</p>
                            <ul className="m-0 mt-1 list-none p-0 text-sm">
                                {LABS.map((lab) => (
                                    <li key={lab} className="border-t border-primary py-1.5 first:border-t-0">
                                        {lab} labs
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </figure>
        </section>
    )
}
