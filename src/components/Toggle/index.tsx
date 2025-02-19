import React from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from 'lib/utils'
import Tooltip from 'components/Tooltip'
import { IconInfo, IconShieldLock } from '@posthog/icons'

export default function Toggle({
    checked,
    onChange,
    iconLeft,
    iconRight,
    label,
    tooltip,
    position = 'left',
    activeOpacity = true,
}: {
    checked: boolean
    onChange: (checked: boolean) => void
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    label?: string
    tooltip?: string
    position?: 'left' | 'right'
    activeOpacity?: boolean
}) {
    return (
        <span className="flex space-x-1.5 items-center justify-between">
            <Switch.Group>
                {((position === 'right' && label) || iconLeft) && (
                    <span className="flex items-center">
                        {iconLeft && (
                            <span
                                className={`${
                                    activeOpacity && checked ? 'opacity-50' : 'opacity-80'
                                } font-semibold transition-opacity`}
                            >
                                {iconLeft}
                            </span>
                        )}
                        {position === 'right' && label && (
                            <Switch.Label>
                                <span className="ml-1 font-semibold text-sm">{label}</span>
                            </Switch.Label>
                        )}
                    </span>
                )}
                <Switch
                    checked={checked}
                    onChange={onChange}
                    className="group flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-2 w-8 cursor-pointer focus:outline-none"
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bg-[#c4c4c4] dark:bg-[#5A5A5A] w-full h-full rounded-md"
                    />
                    <span
                        aria-hidden="true"
                        className={classNames(
                            checked
                                ? 'translate-x-5 bg-teal dark:bg-teal'
                                : 'translate-x-0 bg-[#555] hover:bg-[#222] dark:bg-[#999] dark:group-hover:bg-[#ddd]',
                            'pointer-events-none absolute left-0 inline-block h-4 w-4 rounded-full transform ring-0 transition-transform ease-in-out duration-200'
                        )}
                    />
                </Switch>
                {((position === 'left' && label) || iconRight) && (
                    <span className="flex items-center">
                        {position === 'left' && label && (
                            <Switch.Label>
                                <span className="ml-1 font-semibold text-sm">{label}</span>
                            </Switch.Label>
                        )}
                        {iconRight && (
                            <span
                                className={`${
                                    activeOpacity && !checked ? 'opacity-50' : 'opacity-80'
                                } font-semibold transition-opacity`}
                            >
                                {iconRight}
                            </span>
                        )}
                    </span>
                )}
                {tooltip && (
                    <Tooltip content={tooltip} contentContainerClassName="max-w-xs">
                        <div className="inline-block relative">
                            <IconInfo className="w-4 h-4 opacity-50 inline-block" />
                        </div>
                    </Tooltip>
                )}
            </Switch.Group>
        </span>
    )
}
