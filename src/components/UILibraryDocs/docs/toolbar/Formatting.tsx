import React from 'react'
import { Toolbar } from 'components/UI/Toolbar'

export default function FormattingToolbar(): JSX.Element {
    return (
        <Toolbar.Root aria-label="Formatting" className="max-w-xl">
            <Toolbar.Group aria-label="Text style">
                <Toolbar.Button aria-label="Bold" className="font-bold">
                    B
                </Toolbar.Button>
                <Toolbar.Button aria-label="Italic" className="italic">
                    I
                </Toolbar.Button>
                <Toolbar.Button aria-label="Underline" className="underline">
                    U
                </Toolbar.Button>
            </Toolbar.Group>
            <Toolbar.Separator />
            <Toolbar.Link href="#formatting">Link</Toolbar.Link>
            <Toolbar.Separator />
            <Toolbar.Input aria-label="Font size" defaultValue="15" className="w-14" />
        </Toolbar.Root>
    )
}
