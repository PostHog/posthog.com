import List from 'components/List'
import React from 'react'
import { PLATFORMS } from './platforms'

/**
 * The "Downloads" list on the PostHog Desktop download docs page. Lives in a
 * component rather than inline MDX because it maps over the shared platform
 * list, which MDX v1 doesn't parse reliably inline.
 */
export function DesktopDownloadList(): JSX.Element {
    return (
        <List
            className="grid gap-4 grid-cols-1 @md:grid-cols-2 not-prose"
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
    )
}
