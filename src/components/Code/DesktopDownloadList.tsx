import List from 'components/List'
import { FeatureFlagged } from 'components/FeatureFlagged'
import React from 'react'
import { DownloadList } from './DownloadContent'
import { DESKTOP_LAUNCH_FLAG } from './flags'
import { PLATFORMS } from './platforms'

const listClassName = 'grid gap-4 grid-cols-1 @md:grid-cols-2 not-prose'

/**
 * The "Downloads" list on the PostHog Desktop download docs page. Lives in a
 * component rather than inline MDX because the flag-gated variants need
 * multi-line JSX attributes, which MDX v1 doesn't parse reliably.
 */
export function DesktopDownloadList(): JSX.Element {
    return (
        <FeatureFlagged flag={DESKTOP_LAUNCH_FLAG} fallback={<DownloadList />}>
            <List
                className={listClassName}
                items={PLATFORMS.map((platform) => ({
                    label: platform.label,
                    url: platform.url,
                    icon: platform.key.startsWith('mac')
                        ? 'IconApple'
                        : platform.key.startsWith('windows')
                        ? 'IconLaptop'
                        : 'IconServer',
                }))}
            />
        </FeatureFlagged>
    )
}
