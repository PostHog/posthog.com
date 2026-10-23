import React, { useEffect, useState } from 'react'
import { IconCode, IconDay, IconNight, IconRefresh } from '@posthog/icons'
import { SingleCodeBlock } from 'components/CodeBlock'
import { Card, CardLevelBoundary } from 'components/UI/Card'
import { Button } from 'components/UI/Button'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'
import { cardInnerBottomRadius, cardInnerTopRadius } from 'components/UI/styles'
import { cn } from '../../utils'
import { useApp } from '../../context/App'
import type { DocExample } from './types'

type PreviewTheme = 'light' | 'dark'

export default function Example({ id, title, description, Component, source, replay }: DocExample): JSX.Element {
    const { siteSettings } = useApp()
    const siteTheme: PreviewTheme = siteSettings.theme
    const [theme, setTheme] = useState<PreviewTheme>(siteTheme)
    const [codeOpen, setCodeOpen] = useState(false)
    const [run, setRun] = useState(0)

    useEffect(() => {
        setTheme(siteTheme)
    }, [siteTheme])

    const choosePreviewTheme = (next: string[]) => {
        const [chosen] = next
        if (chosen === 'light' || chosen === 'dark') {
            setTheme(chosen)
        }
    }

    return (
        <section id={id} className="scroll-mt-4">
            <h2 className="mb-1 mt-0 text-lg">{title}</h2>
            {description && <p className="mb-3 mt-0 text-[15px] text-secondary">{description}</p>}
            <Card.Root padding="none" className="not-prose">
                <div
                    className={cn('overflow-hidden', cardInnerTopRadius, theme, theme === 'light' && 'ui-force-light')}
                    data-skin={siteSettings.skinMode}
                >
                    <div
                        data-scheme="tertiary"
                        className={cn('@container min-h-24 p-6 text-primary', theme !== siteTheme && 'bg-primary/90')}
                    >
                        <CardLevelBoundary>
                            <Component key={run} />
                        </CardLevelBoundary>
                    </div>
                </div>
                <Card.StatusBar className={cn('justify-between px-2 py-1', codeOpen && 'rounded-none')}>
                    <ToggleGroup
                        size="sm"
                        aria-label="Preview theme"
                        value={[theme]}
                        onValueChange={choosePreviewTheme}
                    >
                        <Toggle value="light">
                            <IconDay className="size-3.5" />
                            Light
                        </Toggle>
                        <Toggle value="dark">
                            <IconNight className="size-3.5" />
                            Dark
                        </Toggle>
                    </ToggleGroup>
                    <div className="flex items-center gap-1">
                        {replay && (
                            <Button size="sm" icon={<IconRefresh />} onClick={() => setRun((count) => count + 1)}>
                                Replay
                            </Button>
                        )}
                        <Toggle size="sm" pressed={codeOpen} onPressedChange={setCodeOpen}>
                            <IconCode className="size-3.5" />
                            Code
                        </Toggle>
                    </div>
                </Card.StatusBar>
                {codeOpen && (
                    <div
                        className={cn(
                            'overflow-hidden border-t border-[rgb(var(--text-primary)/0.12)]',
                            cardInnerBottomRadius
                        )}
                    >
                        <SingleCodeBlock language="tsx" showLabel={false}>
                            {source.trim()}
                        </SingleCodeBlock>
                    </div>
                )}
            </Card.Root>
        </section>
    )
}
