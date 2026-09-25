import React from 'react'
import Figure from './Figure'
import TwigEventFlow from './TwigEventFlow'

export default function TwigEventFigure(): JSX.Element {
    return (
        <Figure>
            <TwigEventFlow autoplay />
        </Figure>
    )
}
