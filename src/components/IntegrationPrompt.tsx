import React from 'react'
import Link from './Link'
import WizardCommand from './WizardCommand'
import { IconCheck, IconChevronRight, IconArrowUpRight, IconTerminal } from '@posthog/icons'
import NextIcon from '../../contents/images/docs/integrate/frameworks/nextjs.svg'
import ReactIcon from '../../contents/images/docs/integrate/react.svg'
import SvelteIcon from '../../contents/images/docs/integrate/frameworks/svelte.svg'
import AstroIcon from '../../contents/images/docs/integrate/frameworks/astro.svg'
import CloudinaryImage from './CloudinaryImage'
import { DebugContainerQuery } from './DebugContainerQuery'

const Row = ({ children }: { children: React.ReactNode }) => {
    return <li className="flex items-center gap-1">{children}</li>
}

export default function IntegrationPrompt() {
    return (
        <>
            <h3>Install with AI in a single prompt</h3>
            <p className="text-[15px]">Paste into your terminal or code editor and make AI do the work.</p>
            <WizardCommand latest={false} />
        </>
    )
}
