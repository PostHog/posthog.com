import React from 'react'
import Figure from './Figure'
import TwigEventFlow from './TwigEventFlow'

export default function TwigEventFigure({ n, caption }: { n: number; caption: string }): JSX.Element {
    return (
        <Figure number={n} caption={caption}>
            <TwigEventFlow />
        </Figure>
    )
}
