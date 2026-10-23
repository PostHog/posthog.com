import React from 'react'
import { Kbd } from 'components/UI/Kbd'

export default function Examples(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <Kbd size="sm">K</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd.Shortcut keys={['meta', 'shift', 'k']} />
            <Kbd.Shortcut keys={['meta', 'alt', 'arrowright']} platform="other" />
        </div>
    )
}
