import React from 'react'
import { Marquee } from 'components/UI/Marquee'
import { cardLevels } from 'components/UI/styles'

const tools = ['Product analytics', 'Session replay', 'Feature flags', 'Experiments', 'Surveys', 'Error tracking']

export default function Tools(): JSX.Element {
    const items = tools.map((tool) => (
        <span key={tool} className={`${cardLevels[1]} px-5 py-3 text-sm font-semibold text-primary`}>
            {tool}
        </span>
    ))
    return (
        <Marquee label="PostHog tools" direction="right" speed={28} gap={12} secondRow={items}>
            {items}
        </Marquee>
    )
}
