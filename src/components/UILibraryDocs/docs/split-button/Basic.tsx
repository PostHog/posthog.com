import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'

export default function Basic(): JSX.Element {
    const [status, setStatus] = React.useState('Unsaved insight')
    return (
        <div className="flex flex-col items-start gap-3">
            <SplitButton.Root appearance="raised" variant="primary" aria-label="Save insight">
                <SplitButton.Button onClick={() => setStatus('Insight saved')}>Save</SplitButton.Button>
                <SplitButton.Trigger aria-label="More save actions" />
                <SplitButton.Popup>
                    <Menu.Item onClick={() => setStatus('Draft saved')}>Save as draft</Menu.Item>
                    <Menu.Item onClick={() => setStatus('Insight published')}>Save and publish</Menu.Item>
                </SplitButton.Popup>
            </SplitButton.Root>
            <span role="status" className="text-body-sm text-secondary">
                {status}
            </span>
        </div>
    )
}
