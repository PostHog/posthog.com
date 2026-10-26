import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'

const looks = [
    { label: 'flat', appearance: 'flat', variant: 'secondary' },
    { label: 'outline', appearance: 'outline', variant: 'secondary' },
    { label: 'raised primary', appearance: 'raised', variant: 'primary' },
    { label: 'raised secondary', appearance: 'raised', variant: 'secondary' },
    { label: 'raised danger', appearance: 'raised', variant: 'danger' },
] as const

export default function Variants(): JSX.Element {
    const [status, setStatus] = React.useState('Choose an action')
    return (
        <div className="flex flex-col items-start gap-4">
            {looks.map(({ label, appearance, variant }) => (
                <div key={label} className="flex flex-wrap items-center gap-4">
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                        <SplitButton.Root
                            key={size}
                            appearance={appearance}
                            variant={variant}
                            size={size}
                            aria-label={`${label} ${size} save actions`}
                        >
                            <SplitButton.Button onClick={() => setStatus(`Saved with ${label} ${size}`)}>
                                Save
                            </SplitButton.Button>
                            <SplitButton.Trigger aria-label={`More ${label} ${size} save actions`} />
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
