import React, { useState, useMemo } from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect } from 'components/OSForm'
import type { SelectOption as OSSelectOption } from 'components/OSForm/select'
import { Checkbox } from 'components/RadixUI/Checkbox'
import { IconX, IconChevronDown, IconRevert } from '@posthog/icons'

export type SelectOption = {
    value: string
    label: string
    description?: string
}

export type CheckboxOption = {
    id: string
    label: string
    description?: string
    defaultValue?: boolean
    showWhen?: (selectedValue: string) => boolean
    group?: 'essential' | 'advanced'
}

export type InputField = {
    id: string
    label: string
    description?: string
    type: 'number' | 'text' | 'environment-list'
    defaultValue?: string | number
    min?: number
    max?: number
    placeholder?: string
    showWhen?: (selectedValue: string) => boolean
    group?: 'essential' | 'advanced'
}

export type ToggleOption = {
    value: string
    label: string
}

export type ConfigBuilderProps = {
    select?: {
        label: string
        options: SelectOption[]
        defaultValue?: string
    }
    toggle?: {
        label: string
        options: [ToggleOption, ToggleOption]
        defaultValue?: string
    }
    checkboxes?: CheckboxOption[]
    inputs?: InputField[]
    generateCode: (config: ConfigState) => string
    getFilename: (selectedValue: string) => string
    getLanguage: (selectedValue: string) => string
    optionsHeader?: React.ReactNode
    previewHeader?: string
}

export type ConfigState = {
    selectedValue: string
    checkboxes: Record<string, boolean>
    inputs: Record<string, string | number | string[]>
}

export const ConfigBuilder: React.FC<ConfigBuilderProps> = ({
    select,
    toggle,
    checkboxes = [],
    inputs = [],
    generateCode,
    getFilename,
    getLanguage,
    optionsHeader,
    previewHeader = 'Generated configuration',
}) => {
    const initialConfig = useMemo<ConfigState>(
        () => ({
            selectedValue:
                toggle?.defaultValue ||
                toggle?.options[0]?.value ||
                select?.defaultValue ||
                select?.options[0]?.value ||
                '',
            checkboxes: checkboxes.reduce((acc, c) => ({ ...acc, [c.id]: c.defaultValue ?? false }), {}),
            inputs: inputs.reduce(
                (acc, i) => ({
                    ...acc,
                    [i.id]: i.type === 'environment-list' ? [] : i.defaultValue ?? (i.type === 'number' ? 0 : ''),
                }),
                {}
            ),
        }),
        [toggle, select, checkboxes, inputs]
    )

    const [config, setConfig] = useState<ConfigState>(initialConfig)

    const [environmentInput, setEnvironmentInput] = useState('')
    const [showAdvanced, setShowAdvanced] = useState(false)
    const hasAdvancedOptions =
        checkboxes.some((c) => c.group === 'advanced') || inputs.some((i) => i.group === 'advanced')

    const generatedCode = useMemo(() => generateCode(config), [config, generateCode])
    const filename = useMemo(() => getFilename(config.selectedValue), [config.selectedValue, getFilename])
    const language = useMemo(() => getLanguage(config.selectedValue), [config.selectedValue, getLanguage])

    const handleSelectChange = (value: string) => {
        setConfig((prev) => ({
            ...prev,
            selectedValue: value,
        }))
    }

    const handleReset = () => {
        setConfig(initialConfig)
        setEnvironmentInput('')
        setShowAdvanced(false)
    }

    const handleCheckboxToggle = (checkboxId: string) => {
        setConfig((prev) => ({
            ...prev,
            checkboxes: {
                ...prev.checkboxes,
                [checkboxId]: !prev.checkboxes[checkboxId],
            },
        }))
    }

    const handleInputChange = (inputId: string, value: string | number) => {
        setConfig((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [inputId]: value,
            },
        }))
    }

    const handleAddEnvironment = (inputId: string) => {
        if (environmentInput.trim()) {
            const currentEnvs = config.inputs[inputId] as string[]
            if (!currentEnvs.includes(environmentInput.trim())) {
                setConfig((prev) => ({
                    ...prev,
                    inputs: {
                        ...prev.inputs,
                        [inputId]: [...currentEnvs, environmentInput.trim()],
                    },
                }))
                setEnvironmentInput('')
            }
        }
    }

    const handleRemoveEnvironment = (inputId: string, env: string) => {
        const currentEnvs = config.inputs[inputId] as string[]
        setConfig((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [inputId]: currentEnvs.filter((e) => e !== env),
            },
        }))
    }

    const visibleCheckboxes = checkboxes.filter((c) => !c.showWhen || c.showWhen(config.selectedValue))
    const visibleInputs = inputs.filter((i) => !i.showWhen || i.showWhen(config.selectedValue))
    const essentialCheckboxes = visibleCheckboxes.filter((c) => c.group !== 'advanced')
    const advancedCheckboxes = visibleCheckboxes.filter((c) => c.group === 'advanced')
    const essentialInputs = visibleInputs.filter((i) => i.group !== 'advanced')
    const advancedInputs = visibleInputs.filter((i) => i.group === 'advanced')

    const selectOptions: OSSelectOption[] =
        select?.options.map((o) => ({
            label: o.label,
            value: o.value,
            description: o.description,
        })) || []

    return (
        <div className="my-4 border border-primary rounded grid md:grid-cols-[1fr_1.5fr]" data-scheme="primary">
            {/* Left panel, config options */}
            <div className="bg-accent p-4 md:border-r border-primary">
                {optionsHeader && <div className="mb-4">{optionsHeader}</div>}

                {toggle && (
                    <div className="mb-4">
                        <label className="block text-base font-semibold mb-2">{toggle.label}</label>
                        <div className="inline-flex gap-2">
                            {toggle.options.map((option) => (
                                <OSButton
                                    key={option.value}
                                    variant={config.selectedValue === option.value ? 'primary' : 'secondary'}
                                    size="md"
                                    onClick={() => handleSelectChange(option.value)}
                                >
                                    {option.label}
                                </OSButton>
                            ))}
                        </div>
                    </div>
                )}

                {select && select.options.length > 1 && (
                    <div className="mb-4">
                        <OSSelect
                            label={select.label}
                            options={selectOptions}
                            value={config.selectedValue}
                            onChange={handleSelectChange}
                            direction="column"
                            showLabel={true}
                            searchable={false}
                            dataScheme="primary"
                        />
                    </div>
                )}

                {essentialCheckboxes.length > 0 && (
                    <div className="mb-6 mt-4 space-y-4">
                        {essentialCheckboxes.map((checkbox) => (
                            <label
                                key={checkbox.id}
                                className="flex items-start gap-2 cursor-pointer group"
                                htmlFor={`checkbox-${checkbox.id}`}
                            >
                                <Checkbox
                                    id={`checkbox-${checkbox.id}`}
                                    checked={config.checkboxes[checkbox.id] || false}
                                    onCheckedChange={() => handleCheckboxToggle(checkbox.id)}
                                    dataScheme="primary"
                                />
                                <div className="flex-1 -mt-0.5">
                                    <span className="text-base font-semibold">{checkbox.label}</span>
                                    {checkbox.description && (
                                        <p className="text-sm text-muted m-0 mt-0.5">{checkbox.description}</p>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                )}

                {essentialInputs.map((input) => (
                    <div key={input.id} className="mb-4">
                        {input.type === 'environment-list' ? (
                            <>
                                <label className="block text-base mb-1.5">
                                    <span className="font-semibold">{input.label}</span>
                                    {input.description && (
                                        <span className="text-sm text-muted ml-2 font-normal">{input.description}</span>
                                    )}
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <div className="flex-1">
                                        <OSInput
                                            label="Environment"
                                            showLabel={false}
                                            type="text"
                                            value={environmentInput}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setEnvironmentInput(e.target.value)
                                            }
                                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                                e.key === 'Enter' && handleAddEnvironment(input.id)
                                            }
                                            placeholder={input.placeholder || 'e.g., localhost, dev.example.com'}
                                            width="full"
                                            dataScheme="primary"
                                        />
                                    </div>
                                    <OSButton
                                        variant="primary"
                                        size="lg"
                                        onClick={() => handleAddEnvironment(input.id)}
                                    >
                                        Add
                                    </OSButton>
                                </div>
                                {(config.inputs[input.id] as string[]).length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {(config.inputs[input.id] as string[]).map((env) => (
                                            <div
                                                key={env}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent border border-primary rounded-md text-sm"
                                            >
                                                <span className="text-primary">{env}</span>
                                                <button
                                                    onClick={() => handleRemoveEnvironment(input.id, env)}
                                                    className="text-muted hover:text-red dark:hover:text-yellow transition-colors p-0.5 -mr-1"
                                                    aria-label={`Remove ${env}`}
                                                >
                                                    <IconX className="size-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <label className="block text-base mb-1.5">
                                    <span className="font-semibold">{input.label}</span>
                                    {input.description && (
                                        <span className="text-sm text-muted ml-2 font-normal">{input.description}</span>
                                    )}
                                </label>
                                <OSInput
                                    label={input.label}
                                    showLabel={false}
                                    type={input.type === 'number' ? 'number' : 'text'}
                                    value={String(config.inputs[input.id])}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange(
                                            input.id,
                                            input.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                                        )
                                    }
                                    min={input.min}
                                    max={input.max}
                                    placeholder={input.placeholder}
                                    width="full"
                                    dataScheme="primary"
                                />
                            </>
                        )}
                    </div>
                ))}

                {hasAdvancedOptions && (
                    <div className="mt-4">
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 text-sm font-semibold text-primary/75 hover:text-primary transition-colors"
                        >
                            <IconChevronDown
                                className={`size-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                            />
                            {showAdvanced ? 'Hide' : 'Show'} advanced options
                        </button>

                        {showAdvanced && (
                            <div className="mt-4 space-y-4">
                                {advancedCheckboxes.length > 0 && (
                                    <div className="space-y-4">
                                        {advancedCheckboxes.map((checkbox) => (
                                            <label
                                                key={checkbox.id}
                                                className="flex items-start gap-2 cursor-pointer group"
                                                htmlFor={`checkbox-${checkbox.id}`}
                                            >
                                                <Checkbox
                                                    id={`checkbox-${checkbox.id}`}
                                                    checked={config.checkboxes[checkbox.id] || false}
                                                    onCheckedChange={() => handleCheckboxToggle(checkbox.id)}
                                                    dataScheme="primary"
                                                />
                                                <div className="flex-1 -mt-0.5">
                                                    <span className="text-base font-semibold">{checkbox.label}</span>
                                                    {checkbox.description && (
                                                        <p className="text-sm text-muted m-0 mt-0.5">
                                                            {checkbox.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {advancedInputs.map((input) => (
                                    <div key={input.id}>
                                        <label className="block text-base mb-1.5">
                                            <span className="font-semibold">{input.label}</span>
                                            {input.description && (
                                                <span className="text-sm text-muted ml-2 font-normal">
                                                    {input.description}
                                                </span>
                                            )}
                                        </label>
                                        <OSInput
                                            label={input.label}
                                            showLabel={false}
                                            type={input.type === 'number' ? 'number' : 'text'}
                                            value={String(config.inputs[input.id])}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleInputChange(
                                                    input.id,
                                                    input.type === 'number'
                                                        ? parseInt(e.target.value) || 0
                                                        : e.target.value
                                                )
                                            }
                                            min={input.min}
                                            max={input.max}
                                            placeholder={input.placeholder}
                                            width="full"
                                            dataScheme="primary"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right panel, config preview */}
            <div className="bg-primary p-4 border-t md:border-t-0 border-primary min-w-0">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-base font-semibold">{previewHeader}</label>
                    <OSButton variant="secondary" size="sm" onClick={handleReset}>
                        <IconRevert className="size-4" />
                        Reset
                    </OSButton>
                </div>
                <div className="sticky top-4">
                    <SingleCodeBlock language={language} showCopy={true} showLineNumbers={false} label={filename}>
                        {generatedCode}
                    </SingleCodeBlock>
                </div>
            </div>
        </div>
    )
}
