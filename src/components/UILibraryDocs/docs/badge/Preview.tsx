import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function BadgePreview(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Badge
                href="/docs/feature-flags"
                color="blue"
                preview={
                    <>
                        <div className="text-15 font-semibold leading-snug text-primary">Feature flags</div>
                        <div className="mt-1 text-sm text-secondary">
                            Release features to specific users or groups, and roll them back without a deploy.
                        </div>
                    </>
                }
            >
                Feature flags
            </Badge>
            <Badge
                color="purple"
                appearance="soft"
                preview={
                    <>
                        <div className="text-15 font-semibold leading-snug text-primary">Beta</div>
                        <div className="mt-1 text-sm text-secondary">
                            This feature works, but its behavior and its pricing can change.
                        </div>
                    </>
                }
            >
                Beta
            </Badge>
        </div>
    )
}
