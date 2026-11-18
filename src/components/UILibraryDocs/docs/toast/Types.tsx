import React from 'react'
import { Button } from 'components/UI/Button'
import { Toast } from 'components/UI/Toast'
export default function Types(): JSX.Element {
    const manager = Toast.useToastManager()
    return (
        <div className="flex flex-wrap gap-2">
            {(['success', 'error', 'warning', 'info'] as const).map((type) => (
                <Button
                    key={type}
                    onClick={() => manager.add({ title: type, description: 'This toast shows a status icon.', type })}
                >
                    {type}
                </Button>
            ))}
        </div>
    )
}
