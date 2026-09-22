import React from 'react'
import Figure from './Figure'
import TwigEmbed from 'components/Twig/TwigEmbed'

export default function TwigPropertyFigure({ n, caption }: { n: number; caption: string }): JSX.Element {
    return (
        <Figure number={n} caption={caption}>
            <TwigEmbed
                continueTo="connect-the-property-to-the-selected-filter"
                path="/embed/stay-filters/fixed"
                title="Twig stay filters lab: fixed property"
                height={800}
            />
        </Figure>
    )
}
