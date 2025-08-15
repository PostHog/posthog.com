import React from 'react'
import Card from './Card'
import DotLeaderLink from './DotLeaderLink'

export default function TableOfContents({ steps }: { steps: [string] }) {
    return (
        <Card className="bg-accent-light">
            <aside>
                <h5 className="opacity-40 text-center mb-6">Table of contents</h5>
                <ol className="list-none p-0 m-0 font-bold space-y-2">
                    {steps.map((item, index) => (
                        <li key={index}>
                            <DotLeaderLink text={item} number={index + 1} />
                        </li>
                    ))}
                </ol>
            </aside>
        </Card>
    )
}
