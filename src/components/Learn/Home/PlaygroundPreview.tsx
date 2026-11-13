import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { TWIG_URL } from '../../../constants'
import { handOffToTwig } from '../learnTracking'

const TWIG_PLAYGROUND_SCREENSHOT =
    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/twig_playground_3cbc146b4b.jpg'

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
            <figure className="m-0 mt-5 overflow-hidden rounded-md border border-primary bg-accent">
                <div aria-hidden="true" className="flex items-center gap-2 border-b border-primary px-3 py-2">
                    <span className="size-2.5 rounded-full bg-brand-coral" />
                    <span className="size-2.5 rounded-full bg-brand-yellow" />
                    <span className="size-2.5 rounded-full bg-brand-green" />
                    <span className="ml-3 w-full max-w-xs rounded border border-primary bg-primary px-3 py-0.5 text-xs text-secondary">
                        twig.com
                    </span>
                </div>
                {/* A screenshot of twig.com with the PostHog Playground open, so the sidebar and tool rail match Twig exactly.
                    Retake it when Twig's Playground changes. It stays light in dark mode, like Twig. */}
                <div className="leading-[0]">
                    <CloudinaryImage
                        src={TWIG_PLAYGROUND_SCREENSHOT}
                        alt="Twig's home page, with the PostHog Playground open on the right: Meet Twig, Take a tour, Explore on your own, and labs for each PostHog product"
                        width={2200}
                        height={1375}
                        loading="lazy"
                        imgClassName="block h-auto w-full"
                    />
                </div>
            </figure>
        </section>
    )
}
