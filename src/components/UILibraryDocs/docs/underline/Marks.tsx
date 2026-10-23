import React from 'react'
import { Underline } from 'components/UI/Underline'
import type { UnderlineStyle } from 'components/UI/Underline'

const types: UnderlineStyle[] = ['underline', 'circle', 'box', 'strike-through', 'crossed-off', 'bracket']

export default function Marks(): JSX.Element {
    return (
        <div className="space-y-5 text-2xl">
            {types.map((type) => (
                <p key={type} className="!m-0">
                    <Underline type={type} tone="brand" padding={type === 'underline' ? 0 : 3}>
                        product context
                    </Underline>{' '}
                    <span className="text-sm text-secondary">({type})</span>
                </p>
            ))}
        </div>
    )
}
