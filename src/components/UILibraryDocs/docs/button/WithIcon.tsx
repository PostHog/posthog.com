import React from 'react'
import { IconArrowRight, IconPlus, IconShare } from '@posthog/icons'
import { Button } from 'components/UI/Button'

export default function ButtonWithIcon(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button appearance="raised" variant="primary" icon={<IconPlus />}>
                New insight
            </Button>
            <Button icon={<IconShare />}>Share</Button>
            <Button appearance="raised" icon={<IconArrowRight />} iconPosition="end">
                Continue
            </Button>
        </div>
    )
}
