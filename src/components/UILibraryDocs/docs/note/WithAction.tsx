import React from 'react'
import { Note } from 'components/UI/Note'
import { ButtonLink } from 'components/UI/Button'
export default function WithAction(): JSX.Element {
    return (
        <div className="space-y-4">
            {([640, 320] as const).map((width) => (
                <div key={width} className="space-y-1" style={{ width: `min(100%, ${width}px)` }}>
                    <div className="text-xs text-secondary">Maximum width: {width}px</div>
                    <Note.Root tone="warning">
                        <Note.Icon />
                        <Note.Title>Check your settings</Note.Title>
                        <Note.Content>
                            <p>Read the guide before you change the configuration.</p>
                        </Note.Content>
                        <Note.Action>
                            <ButtonLink to="/docs" size="sm" appearance="raised">
                                Read the docs
                            </ButtonLink>
                        </Note.Action>
                    </Note.Root>
                </div>
            ))}
        </div>
    )
}
