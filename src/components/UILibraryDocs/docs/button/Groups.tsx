import React from 'react'
import { IconCopy, IconDownload, IconShare } from '@posthog/icons'
import { Button, ButtonGroup, IconButton } from 'components/UI/Button'

export default function ButtonGroups(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonGroup aria-label="Date range">
                <Button>Day</Button>
                <Button>Week</Button>
                <Button>Month</Button>
            </ButtonGroup>
            <ButtonGroup aria-label="File actions">
                <IconButton aria-label="Copy" icon={<IconCopy />} />
                <IconButton aria-label="Download" icon={<IconDownload />} />
                <IconButton aria-label="Share" icon={<IconShare />} />
            </ButtonGroup>
            <ButtonGroup aria-label="Export" appearance="raised" variant="primary">
                <IconButton aria-label="Copy" icon={<IconCopy />} />
                <IconButton aria-label="Download" icon={<IconDownload />} />
                <IconButton aria-label="Share" icon={<IconShare />} />
            </ButtonGroup>
            <ButtonGroup aria-label="Date range" appearance="raised">
                <Button>Day</Button>
                <Button>Week</Button>
                <Button>Month</Button>
            </ButtonGroup>
        </div>
    )
}
