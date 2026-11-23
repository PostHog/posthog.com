import React from 'react'

export default function ProseBoundary(): JSX.Element {
    return (
        <div className="grid gap-6 @lg:grid-cols-2">
            <div>
                <h3 className="mt-0">Inside prose</h3>
                <p>
                    Plain elements get a size, spacing, and color. A <a href="#prose">link</a> is underlined, and{' '}
                    <code>code</code> becomes a chip.
                </p>
                <ul>
                    <li>Lists get bullets.</li>
                    <li>No classes are needed.</li>
                </ul>
            </div>
            <div className="not-prose rounded border border-dashed border-[rgb(var(--text-primary)/0.25)] p-4">
                <h3>Inside not-prose</h3>
                <p>
                    The same elements get only the site's global rules. A <a href="#prose">link</a> has no underline.
                </p>
                <ul>
                    <li>Lists have no bullets.</li>
                    <li>Every size comes from a class.</li>
                </ul>
            </div>
        </div>
    )
}
