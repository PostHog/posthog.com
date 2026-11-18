import React from 'react'
import { IconArrowRight, IconArrowUpRight, IconPlus } from '@posthog/icons'
import { Button } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function ButtonWithIcon(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="icon">
                <Button variant="primary" icon={<IconPlus />}>
                    New insight
                </Button>
            </DemoRow>
            <DemoRow label='iconPosition="end"'>
                <Button icon={<IconArrowRight />} iconPosition="end">
                    Continue
                </Button>
            </DemoRow>
            <DemoRow label="icon + iconEnd">
                <Button icon={<IconPlus />} iconEnd={<IconArrowUpRight />}>
                    Create insight
                </Button>
            </DemoRow>
        </DemoRows>
    )
}
