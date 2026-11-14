import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import { normalizeUrl } from 'components/Learn/PocketGuides/bookModel'
import { useSkillFiles } from 'components/Learn/PocketGuides/useSkillFile'
import { pocketGuideDestination } from 'constants/pocketGuides'

/** "Read the guide" + "Copy skill" buttons for a card that links to a pocket guide. */
export default function GuideCardActions({ href }: { href: string }): JSX.Element {
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
