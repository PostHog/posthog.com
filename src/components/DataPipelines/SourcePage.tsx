import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import { normalizeUrl } from 'components/Learn/PocketGuides/bookModel'
import { useSkillFiles } from 'components/Learn/PocketGuides/useSkillFile'
import { pocketGuideDestination } from 'constants/pocketGuides'

/** Building blocks shared by the source pages under /data-pipelines/sources/. */

/** Opens PostHog AI with the prompt pre-filled but not sent, so the reader can fill in the [placeholders] first. */
export const maxPromptUrl = (prompt: string): string =>
    `https://app.posthog.com/#panel=max:${encodeURIComponent(prompt)}`

// Same highlight as the /enterprise hero.
export const HIGHLIGHT_COLOR = 'rgba(247, 165, 1, 0.15)'

export const CARD = 'flex h-full flex-col rounded border border-primary bg-primary p-5'
export const SECTION = 'mt-12 border-t border-primary pt-10'

export function Section({
    id,
    title,
    intro,
    children,
}: {
    id: string
    title: string
    intro?: React.ReactNode
    children: React.ReactNode
}): JSX.Element {
    return (
        <section id={id} className={`${SECTION} scroll-mt-4`}>
            <div className="mb-6">
                <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">{title}</h2>
                {intro && <p className="m-0 mt-2 max-w-2xl text-pretty text-base text-secondary">{intro}</p>}
            </div>
            {children}
        </section>
    )
}

export interface JumpLink {
    id: string
    label: string
}

export const DEFAULT_JUMP_LINKS: JumpLink[] = [
    { id: 'what-syncs', label: 'What syncs' },
    { id: 'connect', label: 'How to connect' },
    { id: 'questions', label: 'Questions you can answer' },
    { id: 'across-posthog', label: 'Use it across PostHog' },
]

// Resolve targets inside this page, not the whole document: another open window can have a
// section with the same id (like /mcp's "connect").
export function JumpLinks({
    pageRef,
    links = DEFAULT_JUMP_LINKS,
}: {
    pageRef: React.RefObject<HTMLDivElement>
    links?: JumpLink[]
}): JSX.Element {
    return (
        <nav aria-label="On this page" className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-semibold text-muted">On this page:</span>
            {links.map((link) => (
                <button
                    key={link.id}
                    type="button"
                    onClick={() =>
                        pageRef.current?.querySelector(`[id="${link.id}"]`)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="font-semibold text-red dark:text-yellow"
                >
                    {link.label}
                </button>
            ))}
        </nav>
    )
}

/** "Read the guide" + "Copy skill" buttons for a card that links to a pocket guide. */
export function GuideCardActions({ href }: { href: string }): JSX.Element {
    const skills = useSkillFiles()
    const guideUrl = pocketGuideDestination(href)
    const skill = skills.get(normalizeUrl(guideUrl))
    const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

    // Only report success once the write resolves: it rejects when the browser blocks clipboard access.
    const copySkill = async () => {
        if (!skill?.raw) return
        try {
            await navigator.clipboard.writeText(skill.raw)
            setCopyState('copied')
        } catch {
            setCopyState('failed')
        }
        window.setTimeout(() => setCopyState('idle'), 1500)
    }

    return (
        <div className="mt-auto flex items-center gap-2 pt-4">
            <CallToAction to={guideUrl} size="sm">
                Read the guide
            </CallToAction>
            <CallToAction type="secondary" size="sm" disabled={!skill?.raw} onClick={copySkill}>
                {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? "Couldn't copy" : 'Copy skill'}
            </CallToAction>
        </div>
    )
}
