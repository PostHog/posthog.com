import React, { useEffect, useMemo, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import Link from 'components/Link'
import { useToast } from '../../context/Toast'
import { cn } from '../../utils'
import ZoomHover from 'components/ZoomHover'
import IconButton from './IconButton'
import { mcpInstallSchema, type InstallMethod, type InstallSchema, type Platform, type PlatformOption } from './schema'

type CopyableProps = {
    command: string
    className?: string
    /** Apply the wizard gradient text effect to the command */
    animate?: boolean
}

function CopyableCommand({ command, className = '', animate = false }: CopyableProps): JSX.Element {
    const { addToast } = useToast()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(command)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
        addToast({
            description: (
                <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="size-4 text-green" />
                    Copied to clipboard
                </span>
            ),
            duration: 2000,
        })
    }

    const isMultiline = command.includes('\n')

    return (
        <div
            className={cn(
                'group flex items-start gap-2 bg-primary border border-primary rounded px-2 py-1.5',
                className
            )}
        >
            <pre className="flex-1 m-0 p-0 bg-transparent text-[13px] leading-[1.45] font-mono text-primary whitespace-pre-wrap break-all">
                <code className={cn('!bg-transparent !p-0 !border-0', animate && 'text-gradient-wizard')}>
                    {command}
                </code>
            </pre>
            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                className={cn(
                    'shrink-0 inline-flex items-center justify-center size-5 rounded text-primary opacity-60 hover:opacity-100 cursor-pointer',
                    isMultiline ? 'self-start' : 'self-center'
                )}
            >
                {copied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
            </button>
        </div>
    )
}

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
                        : 'border-transparent text-secondary hover:text-primary hover:border-primary'
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
                                    <CopyableCommand command={method.command} />
                                </div>
                            ) : (
                                <CopyableCommand command={method.command} />
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
}

export default function PlatformInstall({
    schema = mcpInstallSchema,
    className = '',
}: PlatformInstallProps): JSX.Element {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [lastSelected, setLastSelected] = useState<Platform | null>(null)

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

    return (
        <div
            className={cn(
                'not-prose min-w-96 max-w-md inline-block border border-primary rounded bg-accent/40 p-3 space-y-2 mb-4',
                className
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <h3 className="!text-base font-bold text-primary m-0">{schema.title}</h3>
                <Link
                    to={schema.learnMoreHref}
                    state={{ newWindow: true }}
                    className="text-sm text-secondary hover:text-primary"
                >
                    Learn more
                </Link>
            </div>

            <CopyableCommand command={schema.defaultCommand} animate />

            <div className="flex items-center justify-between gap-2">
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
                        <div className="pt-2 border-t border-primary">
                            <PlatformOptionContent key={lastSelected.id} option={lastSelected} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export { mcpInstallSchema }
export type { InstallSchema, Platform, PlatformOption, InstallMethod } from './schema'
