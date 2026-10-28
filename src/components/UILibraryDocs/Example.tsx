import React, { useEffect, useState } from 'react'
import { IconCode, IconDay, IconNight, IconRefresh } from '@posthog/icons'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Card, CardLevelBoundary } from 'components/UI/Card'
import { Button } from 'components/UI/Button'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'
import { CodeBlock } from 'components/UI/CodeBlock'
import { Heading, Text } from 'components/UI/Typography'
import { cardInnerBottomRadius, cardInnerTopRadius, heightRevealPanel } from 'components/UI/styles'
import { cn } from '../../utils'
import { useApp } from '../../context/App'
import type { DocExample } from './types'
import { proseLinks } from './styles'

type PreviewTheme = 'light' | 'dark'

type PreviewSurface = 'window' | 'card'

const clearCard = 'bg-transparent shadow-none after:hidden dark:bg-transparent dark:shadow-none'

export default function Example({ id, title, description, Component, source, replay }: DocExample): JSX.Element {
    const { siteSettings } = useApp()
    const siteTheme: PreviewTheme = siteSettings.theme
    const [theme, setTheme] = useState<PreviewTheme>(siteTheme)
    const [surface, setSurface] = useState<PreviewSurface>('card')
    const [codeOpen, setCodeOpen] = useState(false)
    const [run, setRun] = useState(0)

    useEffect(() => {
        setTheme(siteTheme)
    }, [siteTheme])

    const choosePreviewSurface = (next: string[]) => {
        const [chosen] = next
        if (chosen === 'window' || chosen === 'card') {
            setSurface(chosen)
        }
    }

    const choosePreviewTheme = (next: string[]) => {
        const [chosen] = next
        if (chosen === 'light' || chosen === 'dark') {
            setTheme(chosen)
        }
    }

    return (
        <section id={id} className="scroll-mt-4">
            <Heading level={2} size="md" className="mb-1">
                {title}
            </Heading>
            {description && (
                <Text color="secondary" className={`mb-3 ${proseLinks}`}>
                    {description}
                </Text>
            )}
            <Card.Root padding="none" className={cn('not-prose', surface === 'window' && clearCard)}>
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
                    <div className="flex items-center gap-1">
                        <ToggleGroup
                            appearance="flat"
                            size="sm"
                            aria-label="Preview surface"
                            value={[surface]}
                            onValueChange={choosePreviewSurface}
                        >
                            <Toggle value="card">Card</Toggle>
                            <Toggle value="window">Window</Toggle>
                        </ToggleGroup>
                        <ToggleGroup
                            appearance="flat"
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
                    </div>
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
                <BaseCollapsible.Root open={codeOpen}>
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
