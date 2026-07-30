import React from 'react'
import type { DiffFile, DiffLine } from './inboxData'

/**
 * Gutter marker and tint per line kind. Literal classes so Tailwind's JIT keeps them.
 */
const LINE_STYLE: Record<DiffLine['kind'], { marker: string; className: string }> = {
    add: { marker: '+', className: 'bg-green/10 text-primary' },
    remove: { marker: '−', className: 'bg-red/10 text-primary' },
    context: { marker: ' ', className: 'text-secondary' },
}

/**
 * The "Files changed" tab: one block per file, each with its own stat line and a
 * single excerpted hunk. Hand-rolled rather than using `components/CodeBlock`, which
 * brings a language selector, a copy button, and an "Ask AI" button – none of which
 * belong on a read-only diff excerpt.
 */
export default function FilesChanged({ files }: { files: DiffFile[] }): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {files.map((file) => (
                <div key={file.path} className="overflow-hidden rounded-md border border-primary bg-primary">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-primary px-3 py-2">
                        <span className="min-w-0 break-all font-mono text-xs font-semibold text-primary">
                            {file.path}
                        </span>
                        <span className="shrink-0 font-mono text-xs tabular-nums">
                            <span className="text-green">+{file.added}</span>{' '}
                            <span className="text-red">−{file.removed}</span>
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="min-w-max font-mono text-xs leading-relaxed">
                            <div className="bg-accent px-3 py-1 text-secondary">{file.hunk}</div>
                            {file.lines.map((line, index) => {
                                const style = LINE_STYLE[line.kind]
                                return (
                                    // Index keys are correct here: the diff is static authored data.
                                    <div key={index} className={`flex ${style.className}`}>
                                        <span aria-hidden className="w-6 shrink-0 select-none px-2 text-secondary">
                                            {style.marker}
                                        </span>
                                        <span className="whitespace-pre pr-3">{line.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
