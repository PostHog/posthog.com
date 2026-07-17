import React, { useEffect, useMemo, useState } from 'react'
import { IconInfo, IconQuestion } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { cn } from '../../utils'
import ZoomHover from 'components/ZoomHover'
import useCloud from 'hooks/useCloud'
import IconButton from './IconButton'
import { CopyableCommand } from './CopyableCommand'
import { InlineCommand } from './InlineCommand'
import { buildWizardCommand, buildSchemaCommand } from './buildCommand'
import {
    cliInstallSchema,
    mcpInstallSchema,
    wizardInstallSchema,
    type InstallMethod,
    type InstallSchema,
    type Platform,
    type PlatformOption,
} from './schema'

type SubTabProps = {
    label: string
    selected: boolean
    onClick: () => void
}

function SubTab({ label, selected, onClick }: SubTabProps): JSX.Element {
    return (
        <ZoomHover size="sm">
            <button
                type="button"
                onClick={onClick}
                aria-pressed={selected}
                className={cn(
                    'inline-flex items-center px-2 py-1 rounded text-sm font-semibold cursor-pointer border border-b-2',
                    selected
                        ? 'border-primary bg-primary text-primary'
                        : 'border-transparent text-secondary hover:text-primary hover:border-primary hover:bg-primary'
                )}
            >
                {label}
            </button>
        </ZoomHover>
    )
}

function MethodList({ methods, platformLabel }: { methods: InstallMethod[]; platformLabel: string }): JSX.Element {
    return (
        <>
            {methods.length > 1 ? (
                <p className="text-sm text-secondary py-2 mb-2">
                    There are {methods.length} installation methods for {platformLabel}.
                </p>
            ) : null}
            <div className="space-y-5">
                {methods.map((method) => (
                    <div key={method.label} className="space-y-1.5">
                        <div className="text-sm font-semibold text-primary">{method.label}</div>
                        {method.helper ? <div className="text-xs text-secondary">{method.helper}</div> : null}
                        {method.command ? (
                            method.indentCommand ? (
                                <div className="pl-4">
                                    <CopyableCommand command={method.command} copyCommand={method.copyCommand} />
                                </div>
                            ) : (
                                <CopyableCommand command={method.command} copyCommand={method.copyCommand} />
                            )
                        ) : null}
                        {method.note ? <div className="text-xs text-secondary">{method.note}</div> : null}
                        {method.button ? (
                            <div>
                                <Link
                                    to={method.button.href}
                                    externalNoIcon={method.button.external}
                                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-b-2 border-input hover:border-primary bg-primary text-primary text-sm font-semibold !no-underline"
                                >
                                    {method.button.icon ? (
                                        <span className="inline-flex items-center justify-center shrink-0 size-4">
                                            {method.button.icon}
                                        </span>
                                    ) : null}
                                    {method.button.label}
                                </Link>
                            </div>
                        ) : null}
                        {method.content ? <div>{method.content}</div> : null}
                    </div>
                ))}
            </div>
        </>
    )
}

function PlatformOptionContent({ option }: { option: PlatformOption }): JSX.Element {
    const [activeSubId, setActiveSubId] = useState<string | null>(option.subOptions?.[0]?.id ?? null)

    useEffect(() => {
        setActiveSubId(option.subOptions?.[0]?.id ?? null)
    }, [option.id, option.subOptions])

    if (option.content) {
        return <div>{option.content}</div>
    }

    if (option.subOptions && option.subOptions.length > 0) {
        const activeSub = option.subOptions.find((s) => s.id === activeSubId) ?? option.subOptions[0]
        return (
            <div className="space-y-3">
                <div className="flex flex-wrap gap-px">
                    {option.subOptions.map((sub) => (
                        <SubTab
                            key={sub.id}
                            label={sub.label}
                            selected={activeSub.id === sub.id}
                            onClick={() => setActiveSubId(sub.id)}
                        />
                    ))}
                </div>
                <PlatformOptionContent option={activeSub} />
            </div>
        )
    }

    if (option.methods && option.methods.length > 0) {
        return <MethodList methods={option.methods} platformLabel={option.label} />
    }

    return <div className="text-sm text-secondary">No install instructions yet.</div>
}

export interface PlatformInstallProps {
    schema?: InstallSchema
    className?: string
    /**
     * `card` (default) = the full/compact schema-driven card. `inline` = the bare inline command
     * button (the consolidated home of the old `WizardCommand`). Inline ignores the schema and
     * builds `npx @posthog/wizard …` from the flag props below.
     */
    variant?: 'card' | 'inline'
    /** Append the `self-driving` subcommand to the command (display + copy). */
    selfDriving?: boolean
    /** Escape hatch to append any other subcommand to the command (display + copy). */
    command?: string
    /** Inline only: hide the "Learn more" tab and fully round the button. */
    slim?: boolean
    /** Inline only: bordered button style. */
    bordered?: boolean
    /** Inline only: "Learn more" link target (default `/wizard`). */
    secondaryTo?: string
    /** Copy callback (inline). */
    onCopy?: () => void
}

export default function PlatformInstall({
    schema = mcpInstallSchema,
    className = '',
    variant = 'card',
    selfDriving = false,
    command,
    slim = false,
    bordered = false,
    secondaryTo,
    onCopy,
}: PlatformInstallProps): JSX.Element {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [lastSelected, setLastSelected] = useState<Platform | null>(null)
    const [titleTooltipOpen, setTitleTooltipOpen] = useState(false)

    const editors = useMemo(() => schema.platforms.filter((p) => p.group === 'editors'), [schema])
    const platforms = useMemo(() => schema.platforms.filter((p) => p.group === 'platforms'), [schema])
    const selected: Platform | null = useMemo(
        () => schema.platforms.find((p) => p.id === selectedId) ?? null,
        [schema, selectedId]
    )

    // Keep the most recent selection mounted so the panel can animate closed
    // (instead of unmounting the moment selectedId becomes null).
    useEffect(() => {
        if (selected) setLastSelected(selected)
    }, [selected])

    const handleToggle = (id: string) => {
        setSelectedId((current) => (current === id ? null : id))
    }

    // `selfDriving` is shorthand for the `self-driving` subcommand; `command` is the escape hatch.
    const cloud = useCloud()
    const subcommand = selfDriving ? 'self-driving' : command || undefined

    // Inline variant: the bare command button (consolidated WizardCommand look). Builds the command
    // from flags via the shared builder so display/copy semantics can never drift from the card.
    if (variant === 'inline') {
        const inline = buildWizardCommand({ subcommand, cloud })
        return (
            <InlineCommand
                displayCommand={inline.displayCommand}
                copyCommand={inline.copyCommand}
                slim={slim}
                bordered={bordered}
                className={className}
                secondaryTo={secondaryTo}
                onCopy={onCopy}
            />
        )
    }

    // Card variant: append the subcommand + the user's cloud region (when the schema opts in) to the
    // schema's base command(s), e.g. `npx @posthog/wizard self-driving --region eu`.
    const { displayCommand, copyCommand } = buildSchemaCommand({
        base: schema.defaultCommand,
        copyBase: schema.defaultCopyCommand,
        subcommand,
        appendRegion: schema.appendRegion,
        cloud,
    })

    return (
        <div
            className={`not-prose min-w-96 max-w-md inline-block border border-primary rounded bg-accent/40 shadow-2xl mb-2 ${className}`}
        >
            <div className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <h3 className="!text-base font-bold text-primary m-0">{schema.title}</h3>
                        {schema.titleInfoAction ? (
                            <Link
                                to={schema.titleInfoAction.to}
                                state={schema.titleInfoAction.state}
                                aria-label={schema.titleInfoAction.label}
                                className="inline-flex text-secondary hover:text-primary"
                            >
                                <IconInfo className="size-4" />
                            </Link>
                        ) : schema.titleTooltip ? (
                            <Tooltip
                                delay={0}
                                open={titleTooltipOpen}
                                onOpenChange={setTitleTooltipOpen}
                                trigger={
                                    <IconQuestion className="size-4 text-secondary inline-block relative -top-px" />
                                }
                            >
                                {/* Dismiss when anything inside is clicked (e.g. the "Learn more" link) */}
                                <div
                                    className="max-w-xs text-sm leading-normal font-normal"
                                    onClick={() => setTitleTooltipOpen(false)}
                                >
                                    {schema.titleTooltip}
                                </div>
                            </Tooltip>
                        ) : null}
                    </div>
                    {schema.secondaryAction ? (
                        <Link
                            to={schema.secondaryAction.to}
                            state={schema.secondaryAction.state}
                            className="inline-flex items-center gap-0.5 text-sm text-secondary hover:text-primary whitespace-nowrap"
                        >
                            {schema.secondaryAction.label}
                            {schema.secondaryAction.icon}
                        </Link>
                    ) : null}
                </div>

                <CopyableCommand command={displayCommand} copyCommand={copyCommand} animate />

                {schema.supports ? <div className="text-sm text-secondary">{schema.supports}</div> : null}
            </div>

            {/* Install-methods row + expandable panel. Hidden when the schema has no
               platforms (e.g. the homepage wizard flow). Restore by re-adding platforms. */}
            {schema.platforms.length > 0 ? (
                <>
                    <div
                        className={`flex items-center justify-between gap-2 bg-accent border-t border-primary px-3 py-2 ${
                            selected ? '' : 'rounded-b'
                        }`}
                    >
                        <div className="flex items-center gap-px flex-wrap">
                            {editors.map((p) => (
                                <IconButton
                                    key={p.id}
                                    label={p.label}
                                    icon={p.icon}
                                    selected={selected?.id === p.id}
                                    onClick={() => handleToggle(p.id)}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-px flex-wrap justify-end">
                            {platforms.map((p) => (
                                <IconButton
                                    key={p.id}
                                    label={p.label}
                                    icon={p.icon}
                                    selected={selected?.id === p.id}
                                    onClick={() => handleToggle(p.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className={cn(
                            'grid transition-[grid-template-rows] duration-300 ease-in-out',
                            selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        )}
                    >
                        <div className="overflow-hidden min-h-0">
                            {lastSelected ? (
                                <div className="pt-2 border-t border-primary p-3">
                                    <PlatformOptionContent key={lastSelected.id} option={lastSelected} />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export { CopyableCommand } from './CopyableCommand'
export { cliInstallSchema, mcpInstallSchema, wizardInstallSchema }
export type { InstallSchema, Platform, PlatformOption, InstallMethod } from './schema'
