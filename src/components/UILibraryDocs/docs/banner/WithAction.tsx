import React from 'react'
import { Banner } from 'components/UI/Banner'
import { ButtonLink } from 'components/UI/Button'
export default function WithAction(): JSX.Element {
    return (
        <div className="space-y-4">
            {([640, 320] as const).map((width) => (
                <div key={width} className="space-y-1" style={{ width: `min(100%, ${width}px)` }}>
                    <div className="text-xs text-secondary">Maximum width: {width}px</div>
                    <Banner.Root>
                        <Banner.Icon />
                        <Banner.Title>Product updates</Banner.Title>
                        <Banner.Content>Read the latest product updates.</Banner.Content>
                        <Banner.Action>
                            <ButtonLink to="/changelog" appearance="raised" variant="primary" size="sm">
                                View changelog
                            </ButtonLink>
                        </Banner.Action>
                    </Banner.Root>
                </div>
            ))}
        </div>
    )
}
