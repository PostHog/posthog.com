import React from 'react'
import { Breadcrumbs } from 'components/UI/Breadcrumbs'
import { Chip } from 'components/UI/Chip'
import { wrapText } from 'components/UI/truncation'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Overflow(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Truncate">
                <div className="flex w-56 flex-col gap-2">
                    <Breadcrumbs.Root>
                        <Breadcrumbs.Item>
                            <Breadcrumbs.Link to="/docs">Documentation</Breadcrumbs.Link>
                        </Breadcrumbs.Item>
                        <Breadcrumbs.Separator />
                        <Breadcrumbs.Item>
                            <Breadcrumbs.Page>Product analytics and session replay</Breadcrumbs.Page>
                        </Breadcrumbs.Item>
                    </Breadcrumbs.Root>
                    <Chip className="max-w-full">feature-flag-new-onboarding-experiment</Chip>
                </div>
            </DemoRow>
            <DemoRow label="Wrap">
                <p className={`${wrapText} m-0 w-56 text-sm text-secondary`}>
                    Messages and descriptions wrap, even a long word like supercalifragilisticexpialidocious_event_name.
                </p>
            </DemoRow>
        </DemoRows>
    )
}
