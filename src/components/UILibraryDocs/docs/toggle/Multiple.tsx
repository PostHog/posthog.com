import React from 'react'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'

export default function ToggleGroupMultiple(): JSX.Element {
    return (
        <ToggleGroup multiple defaultValue={['bold']} aria-label="Text style">
            <Toggle value="bold" aria-label="Bold">
                <span className="w-3 text-center font-bold">B</span>
            </Toggle>
            <Toggle value="italic" aria-label="Italic">
                <span className="w-3 text-center italic">I</span>
            </Toggle>
            <Toggle value="underline" aria-label="Underline">
                <span className="w-3 text-center underline">U</span>
            </Toggle>
        </ToggleGroup>
    )
}
