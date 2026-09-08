import React, { useMemo, useRef, useState } from 'react'
import { IconChevronDown, IconFolder, IconSearch } from '@posthog/icons'
import type { DiffFile, DiffLine } from './inboxData'

/**
 * Gutter marker and tint per line kind. Literal classes so Tailwind's JIT keeps them.
 */
const LINE_STYLE: Record<DiffLine['kind'], { marker: string; className: string }> = {
    add: { marker: '+', className: 'bg-green/10 text-primary' },
    remove: { marker: '−', className: 'bg-red/10 text-primary' },
    context: { marker: ' ', className: 'text-secondary' },
}

/** Runs of unchanged lines at least this long collapse into a band you can expand. */
const COLLAPSE_THRESHOLD = 4

/**
 * The old and new starting line numbers out of a hunk header like `@@ -604,7 +604,20 @@`.
 *
 * Real headers from the GitHub API, so the numbers we render down the gutter are the
 * file's actual line numbers rather than an index into the excerpt. Falls back to 1 for
 * an unparseable header instead of rendering `NaN`.
 */
const hunkStart = (hunk: string): { old: number; new: number } => {
    const match = /@@\s*-(\d+)(?:,\d+)?\s*\+(\d+)(?:,\d+)?\s*@@/.exec(hunk)
    return match ? { old: Number(match[1]), new: Number(match[2]) } : { old: 1, new: 1 }
}

interface NumberedLine extends DiffLine {
    oldNumber?: number
    newNumber?: number
}

/** Walks the hunk once, giving each line the numbers its kind earns it. */
const numberLines = (file: DiffFile): NumberedLine[] => {
    const start = hunkStart(file.hunk)
    let oldNumber = start.old
    let newNumber = start.new
    return file.lines.map((line) => {
        if (line.kind === 'add') return { ...line, newNumber: newNumber++ }
        if (line.kind === 'remove') return { ...line, oldNumber: oldNumber++ }
        return { ...line, oldNumber: oldNumber++, newNumber: newNumber++ }
    })
}

type Chunk = { kind: 'lines'; lines: NumberedLine[] } | { kind: 'collapsed'; lines: NumberedLine[] }

/**
 * Groups a hunk into rendered chunks, folding long runs of unchanged lines away.
 *
 * The app does this to keep a large diff readable. Derived from the lines we already
 * have rather than from any extra data – a run is collapsible precisely when it's
 * `COLLAPSE_THRESHOLD` context lines with no change in it.
 */
const chunkLines = (lines: NumberedLine[]): Chunk[] => {
    const chunks: Chunk[] = []
    let run: NumberedLine[] = []

    const flushRun = (): void => {
        if (!run.length) return
        chunks.push(
            run.length >= COLLAPSE_THRESHOLD ? { kind: 'collapsed', lines: run } : { kind: 'lines', lines: run }
        )
        run = []
    }

    lines.forEach((line) => {
        if (line.kind === 'context') {
            run.push(line)
            return
        }
        flushRun()
        const last = chunks[chunks.length - 1]
        if (last?.kind === 'lines') last.lines.push(line)
        else chunks.push({ kind: 'lines', lines: [line] })
    })
    flushRun()
    return chunks
}

const Gutter = ({ value }: { value?: number }): JSX.Element => (
    <span aria-hidden className="w-10 shrink-0 select-none px-1 text-right text-secondary/70">
        {value ?? ''}
    </span>
)

const UnifiedLine = ({ line }: { line: NumberedLine }): JSX.Element => {
    const style = LINE_STYLE[line.kind]
    return (
        <div className={`flex ${style.className}`}>
            <Gutter value={line.oldNumber} />
            <Gutter value={line.newNumber} />
            <span aria-hidden className="w-5 shrink-0 select-none text-center text-secondary">
                {style.marker}
            </span>
            <span className="whitespace-pre pr-3">{line.text}</span>
        </div>
    )
}

/** One collapsed band of unchanged lines, which expands in place. */
const CollapsedBand = ({ lines }: { lines: NumberedLine[] }): JSX.Element => {
    const [open, setOpen] = useState(false)
    if (open)
        return (
            <>
                {lines.map((line, i) => (
                    <UnifiedLine key={i} line={line} />
                ))}
            </>
        )
    return (
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-1.5 bg-accent px-3 py-1 text-left text-secondary transition-colors hover:text-primary"
        >
            <IconChevronDown className="size-3.5 shrink-0" />
            {lines.length} unmodified lines
        </button>
    )
}

/**
 * Split view: removals on the left, additions on the right, context on both.
 *
 * Pairs each removal with the addition at the same offset in its run, which is what a
 * side-by-side diff shows. An unpaired line leaves the other side blank.
 */
const SplitChunk = ({ lines }: { lines: NumberedLine[] }): JSX.Element => {
    const rows: { left?: NumberedLine; right?: NumberedLine }[] = []
    let index = 0
    while (index < lines.length) {
        const line = lines[index]
        if (line.kind === 'context') {
            rows.push({ left: line, right: line })
            index += 1
            continue
        }
        const removals: NumberedLine[] = []
        const additions: NumberedLine[] = []
        while (index < lines.length && lines[index].kind === 'remove') removals.push(lines[index++])
        while (index < lines.length && lines[index].kind === 'add') additions.push(lines[index++])
        const height = Math.max(removals.length, additions.length)
        for (let row = 0; row < height; row += 1) rows.push({ left: removals[row], right: additions[row] })
    }

    return (
        <>
            {rows.map((row, i) => (
                <div key={i} className="flex">
                    <div className={`flex w-1/2 min-w-0 ${row.left ? LINE_STYLE[row.left.kind].className : ''}`}>
                        <Gutter value={row.left?.oldNumber} />
                        {/* Each side scrolls itself, so a long line can't shove the other off-screen. */}
                        <span className="min-w-0 flex-1 overflow-x-auto whitespace-pre pr-2">
                            {row.left?.text ?? ''}
                        </span>
                    </div>
                    <div
                        className={`flex w-1/2 min-w-0 border-l border-primary ${
                            row.right ? LINE_STYLE[row.right.kind].className : ''
                        }`}
                    >
                        <Gutter value={row.right?.newNumber} />
                        <span className="min-w-0 flex-1 overflow-x-auto whitespace-pre pr-2">
                            {row.right?.text ?? ''}
                        </span>
                    </div>
                </div>
            ))}
        </>
    )
}

/* ── File tree ─────────────────────────────────────────────────────────────── */

interface TreeNode {
    name: string
    children: Map<string, TreeNode>
    file?: DiffFile
}

/** Nests the flat paths into the folder tree the app's left pane shows. */
const buildTree = (files: DiffFile[]): TreeNode => {
    const root: TreeNode = { name: '', children: new Map() }
    files.forEach((file) => {
        const segments = file.path.split('/')
        let node = root
        segments.forEach((segment, depth) => {
            if (!node.children.has(segment)) node.children.set(segment, { name: segment, children: new Map() })
            node = node.children.get(segment) as TreeNode
            if (depth === segments.length - 1) node.file = file
        })
    })
    return root
}

const TreeRows = ({
    node,
    depth,
    onPick,
}: {
    node: TreeNode
    depth: number
    onPick: (path: string) => void
}): JSX.Element => (
    <>
        {[...node.children.values()].map((child) => (
            <React.Fragment key={child.name}>
                {child.file ? (
                    <button
                        type="button"
                        onClick={() => onPick(child.file?.path ?? '')}
                        style={{ paddingLeft: `${depth * 0.75 + 0.5}rem` }}
                        className="flex w-full items-center gap-1.5 rounded py-1 pr-2 text-left transition-colors hover:bg-accent"
                    >
                        <span className="min-w-0 flex-1 truncate font-mono text-primary">{child.name}</span>
                        <span className="shrink-0 font-mono tabular-nums">
                            <span className="text-green">+{child.file.added}</span>{' '}
                            <span className="text-red">−{child.file.removed}</span>
                        </span>
                    </button>
                ) : (
                    <div
                        style={{ paddingLeft: `${depth * 0.75 + 0.5}rem` }}
                        className="flex items-center gap-1.5 py-1 pr-2 font-semibold text-primary"
                    >
                        <IconFolder className="size-3.5 shrink-0 text-secondary" />
                        <span className="min-w-0 truncate">{child.name}</span>
                    </div>
                )}
                <TreeRows node={child} depth={depth + 1} onPick={onPick} />
            </React.Fragment>
        ))}
    </>
)

/**
 * The "Files changed" tab: a file tree with its own filter on the left, and the diff on
 * the right with a Unified / Split toggle.
 *
 * Hand-rolled rather than using `components/CodeBlock`, which brings a language selector,
 * a copy button, and an "Ask AI" button – none of which belong on a read-only diff.
 *
 * Each file here carries **one excerpted hunk**, not its whole diff, which is why the
 * header says "N of M files" when the pull request touched more than we show. The
 * per-file `+`/`−` counts are the real whole-file totals from the GitHub API.
 */
export default function FilesChanged({ files, totalFiles }: { files: DiffFile[]; totalFiles?: number }): JSX.Element {
    const [query, setQuery] = useState('')
    const [view, setView] = useState<'unified' | 'split'>('unified')
    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase()
        return needle ? files.filter((file) => file.path.toLowerCase().includes(needle)) : files
    }, [files, query])

    const tree = useMemo(() => buildTree(visible), [visible])

    const pick = (path: string): void => {
        refs.current[path]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const shown = files.length
    const total = totalFiles ?? shown
    const countLabel =
        total > shown ? `${shown} of ${total} files changed` : `${shown === 1 ? '1 file' : `${shown} files`} changed`

    return (
        <div className="grid gap-3 @2xl:grid-cols-[13rem_1fr]">
            {/* File tree */}
            <aside className="min-w-0 text-xs">
                <div className="mb-1.5 flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1.5">
                    <IconSearch className="size-3.5 shrink-0 text-secondary" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filter files"
                        aria-label="Filter files"
                        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-xs text-primary placeholder:text-secondary focus:outline-none"
                    />
                </div>
                {visible.length ? (
                    <TreeRows node={tree} depth={0} onPick={pick} />
                ) : (
                    <p className="m-0 px-2 py-2 text-secondary">No file matches “{query.trim()}”.</p>
                )}
            </aside>

            {/* Diff */}
            <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold text-primary">{countLabel}</span>
                    <div className="flex shrink-0 overflow-hidden rounded border border-primary text-xs">
                        {(['unified', 'split'] as const).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setView(option)}
                                aria-pressed={view === option}
                                className={`px-2 py-1 font-semibold capitalize transition-colors ${
                                    view === option
                                        ? 'bg-accent text-primary'
                                        : 'bg-primary text-secondary hover:text-primary'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {visible.map((file) => {
                        const numbered = numberLines(file)
                        return (
                            <div
                                key={file.path}
                                ref={(el) => {
                                    refs.current[file.path] = el
                                }}
                                className="overflow-hidden rounded-md border border-primary bg-primary"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-primary px-3 py-2">
                                    <span className="min-w-0 break-all font-mono text-xs font-semibold text-primary">
                                        {file.path}
                                    </span>
                                    <span className="shrink-0 font-mono text-xs tabular-nums">
                                        <span className="text-green">+{file.added}</span>{' '}
                                        <span className="text-red">−{file.removed}</span>
                                    </span>
                                </div>
                                {/*
                                 * Unified scrolls as one wide block, so it sizes to its content.
                                 * Split must stay inside the container instead: `min-w-max` there
                                 * sizes the row to the longest line and pushes the additions column
                                 * off the right edge, so each side scrolls on its own – see
                                 * `SplitChunk`.
                                 */}
                                <div className={view === 'split' ? '' : 'overflow-x-auto'}>
                                    <div
                                        className={`font-mono text-xs leading-relaxed ${
                                            view === 'split' ? 'w-full' : 'min-w-max'
                                        }`}
                                    >
                                        <div className="bg-accent px-3 py-1 text-secondary">{file.hunk}</div>
                                        {view === 'split' ? (
                                            <SplitChunk lines={numbered} />
                                        ) : (
                                            chunkLines(numbered).map((chunk, index) =>
                                                chunk.kind === 'collapsed' ? (
                                                    <CollapsedBand key={index} lines={chunk.lines} />
                                                ) : (
                                                    chunk.lines.map((line, lineIndex) => (
                                                        <UnifiedLine key={`${index}-${lineIndex}`} line={line} />
                                                    ))
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
