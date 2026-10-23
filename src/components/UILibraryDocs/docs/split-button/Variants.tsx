import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'

export default function Variants(): JSX.Element {
    const [status, setStatus] = React.useState('Choose an action')
    return (
        <div className="flex flex-col items-start gap-4">
            {(['default', 'primary', 'secondary', 'danger'] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-4">
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                        <SplitButton.Root
                            key={size}
                            variant={variant}
                            size={size}
                            aria-label={`${variant} ${size} save actions`}
                        >
                            <SplitButton.Button onClick={() => setStatus(`Saved with ${variant} ${size}`)}>
                                Save
                            </SplitButton.Button>
                            <SplitButton.Trigger aria-label={`More ${variant} ${size} save actions`} />
                            <SplitButton.Popup>
                                <Menu.Item onClick={() => setStatus('Draft saved')}>Save as draft</Menu.Item>
                                <Menu.Item onClick={() => setStatus('Insight published')}>Save and publish</Menu.Item>
                            </SplitButton.Popup>
                        </SplitButton.Root>
                    ))}
                </div>
            ))}
            <span role="status" className="text-sm text-secondary">
                {status}
            </span>
        </div>
    )
}
