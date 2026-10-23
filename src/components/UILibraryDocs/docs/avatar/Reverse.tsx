import React from 'react'
import { Avatar } from 'components/UI/Avatar'

const authors = [
    { name: 'Ada Lovelace', initials: 'AL' },
    { name: 'Grace Hopper', initials: 'GH' },
    { name: 'Jane Jones', initials: 'JJ' },
    { name: 'Max Hedgehog', initials: 'MH' },
]

export default function Reverse(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-6">
            {[false, true].map((reverse) => (
                <div key={String(reverse)} className="flex flex-col gap-2">
                    <span className="text-sm text-secondary">
                        {reverse ? 'First author on top' : 'Last author on top'}
                    </span>
                    <Avatar.Group reverse={reverse} max={3} aria-label="Article authors">
                        {authors.map(({ name, initials }) => (
                            <Avatar.Root key={name} title={name}>
                                <Avatar.Fallback>{initials}</Avatar.Fallback>
                            </Avatar.Root>
                        ))}
                    </Avatar.Group>
                </div>
            ))}
        </div>
    )
}
