import React from 'react'
import Figure from './Figure'
import TwigEmbed from 'components/Twig/TwigEmbed'

export default function TwigFilterFigure({ n, caption }: { n: number; caption: string }): JSX.Element {
    return (
        <Figure number={n} caption={caption}>
            <TwigEmbed
                continueTo="corrected-filter-results"
                path="/embed/stay-filters/clicked"
                title="Twig stay filters lab: clicked property"
                height={800}
            />
        </Figure>
    )
}
