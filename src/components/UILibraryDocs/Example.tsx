import React, { useState } from 'react'
import { IconCircleDashed, IconCode, IconDay, IconNight, IconRefresh, IconSquare } from '@posthog/icons'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Card, CardLevelBoundary } from 'components/UI/Card'
import { Button, IconButton } from 'components/UI/Button'
import { Toggle } from 'components/UI/Toggle'
import { Tooltip } from 'components/UI/Tooltip'
import { CodeBlock } from 'components/UI/CodeBlock'
import { cardInnerBottomRadius, cardInnerTopRadius, heightRevealPanel } from 'components/UI/styles'
import { cn } from '../../utils'
import { useApp } from '../../context/App'
import type { DocExample } from './types'
import { setPreviewSurface, usePreviewSurface } from './previewSurface'

const clearCard = 'bg-transparent shadow-none after:hidden dark:bg-transparent dark:shadow-none'

export default function Example({ id, title, description, Component, source, replay, prose }: DocExample): JSX.Element {
    const { siteSettings, updateSiteSettings } = useApp()
    const surface = usePreviewSurface()
    const [codeOpen, setCodeOpen] = useState(false)
    const [run, setRun] = useState(0)

    const isDark = siteSettings.theme === 'dark'
    const isTransparent = surface === 'window'
    const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'
    const surfaceLabel = isTransparent ? 'Show opaque background' : 'Show transparent background'

    const toggleSiteTheme = () => {
        const nextTheme = isDark ? 'light' : 'dark'
        if (!window.__setPreferredTheme) return
        window.__setPreferredTheme(nextTheme)
        updateSiteSettings({ ...siteSettings, theme: nextTheme, colorMode: nextTheme })
    }

    return (
        <section id={id} className="scroll-mt-4">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <Card.Root padding="none" className={cn(!prose && 'not-prose', surface === 'window' && clearCard)}>
                <div className={cn('overflow-hidden', cardInnerTopRadius)} data-skin={siteSettings.skinMode}>
                    <div data-scheme="tertiary" className="@container min-h-24 p-6 text-primary">
                        <CardLevelBoundary>
                            <Component key={run} />
                        </CardLevelBoundary>
                    </div>
                </div>
                <Card.StatusBar className={cn('not-prose justify-between px-2 py-1', codeOpen && 'rounded-none')}>
                    <Tooltip.Provider>
                        <div className="flex items-center gap-1">
                            <Tooltip.Root>
                                <Tooltip.Trigger
                                    render={
                                        <IconButton
                                            appearance="flat"
                                            size="sm"
                                            aria-label={surfaceLabel}
                                            icon={isTransparent ? <IconCircleDashed /> : <IconSquare />}
                                            onClick={() => setPreviewSurface(isTransparent ? 'card' : 'window')}
                                        />
                                    }
                                />
                                <Tooltip.Popup>{surfaceLabel}</Tooltip.Popup>
                            </Tooltip.Root>
                            <Tooltip.Root>
                                <Tooltip.Trigger
                                    render={
                                        <IconButton
                                            appearance="flat"
                                            size="sm"
                                            aria-label={themeLabel}
                                            icon={isDark ? <IconNight /> : <IconDay />}
                                            onClick={toggleSiteTheme}
                                        />
                                    }
                                />
                                <Tooltip.Popup>{themeLabel}</Tooltip.Popup>
                            </Tooltip.Root>
                        </div>
                    </Tooltip.Provider>
                    <div className="flex items-center gap-1">
                        {replay && (
                            <Button
                                appearance="flat"
                                size="sm"
                                icon={<IconRefresh />}
                                onClick={() => setRun((count) => count + 1)}
                            >
                                Replay
                            </Button>
                        )}
                        <Toggle appearance="flat" size="sm" pressed={codeOpen} onPressedChange={setCodeOpen}>
                            <IconCode className="size-3.5" />
                            Code
                        </Toggle>
                    </div>
                </Card.StatusBar>
                <BaseCollapsible.Root open={codeOpen} className="not-prose">
                    <BaseCollapsible.Panel
                        className={cn(
                            heightRevealPanel,
                            'border-t border-[rgb(var(--text-primary)/0.12)]',
                            cardInnerBottomRadius
                        )}
                    >
                        <CodeBlock
                            snippets={[{ id: `${id}-source`, label: 'Example', language: 'tsx', code: source.trim() }]}
                            className="rounded-none border-0 shadow-none"
                        />
                    </BaseCollapsible.Panel>
                </BaseCollapsible.Root>
            </Card.Root>
        </section>
    )
}
