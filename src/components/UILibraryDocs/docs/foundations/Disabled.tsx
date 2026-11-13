import React from 'react'
import { Button } from 'components/UI/Button'
import { Checkbox } from 'components/UI/Checkbox'
import { Input } from 'components/UI/Input'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Disabled(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Small controls">
                <label className="flex items-center gap-2 text-sm text-muted">
                    <Checkbox.Root disabled defaultChecked>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    Fades to 50%
                </label>
            </DemoRow>
            <DemoRow label="Fields">
                <Input
                    disabled
                    aria-label="Disabled field"
                    defaultValue="Dashed border and hatch"
                    className="max-w-xs"
                />
            </DemoRow>
            <DemoRow label="Buttons">
                <Button appearance="raised" disabled>
                    Raised
                </Button>
                <Button appearance="outline" disabled>
                    Outline
                </Button>
                <Button appearance="flat" disabled>
                    Flat
                </Button>
            </DemoRow>
        </DemoRows>
    )
}
