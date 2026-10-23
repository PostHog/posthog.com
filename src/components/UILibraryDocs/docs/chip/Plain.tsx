import React from 'react'
import { Chip } from 'components/UI/Chip'

export default function ChipPlain(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Chip>Beta</Chip>
            <Chip>Free tier</Chip>
            <Chip>Open source</Chip>
        </div>
    )
}
