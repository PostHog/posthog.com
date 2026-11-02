import React from 'react'
import { IconCopy, IconDownload, IconShare } from '@posthog/icons'
import { Button, ButtonGroup, IconButton } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function ButtonGroups(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="raised">
                <ButtonGroup aria-label="Date range">
                    <Button>Day</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                </ButtonGroup>
                <ButtonGroup aria-label="Export" variant="primary">
                    <IconButton aria-label="Copy" icon={<IconCopy />} />
                    <IconButton aria-label="Download" icon={<IconDownload />} />
                    <IconButton aria-label="Share" icon={<IconShare />} />
                </ButtonGroup>
            </DemoRow>
            <DemoRow label="flat">
                <ButtonGroup aria-label="Date range" appearance="flat">
                    <Button>Day</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                </ButtonGroup>
                <ButtonGroup aria-label="File actions" appearance="flat">
                    <IconButton aria-label="Copy" icon={<IconCopy />} />
                    <IconButton aria-label="Download" icon={<IconDownload />} />
                    <IconButton aria-label="Share" icon={<IconShare />} />
                </ButtonGroup>
            </DemoRow>
        </DemoRows>
    )
}
