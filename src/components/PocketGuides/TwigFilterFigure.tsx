import React from 'react'
import Figure from './Figure'
import TwigEventFlow from './TwigEventFlow'

export default function TwigFilterFigure(): JSX.Element {
    return (
        <Figure>
            <TwigEventFlow withDestination />
        </Figure>
    )
}
