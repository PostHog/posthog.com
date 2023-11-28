import React from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from 'lib/utils'

export default function Toggle({
    checked,
    onChange,
    iconLeft,
    iconRight,
}: {
    checked: boolean
    onChange: (checked: boolean) => void
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
}) {
    return (
        <span className="flex space-x-1.5 items-center">
            {iconLeft && (
                <span className={`${checked ? 'opacity-50' : 'opacity-80'} font-semibold transition-opacity`}>
                    {iconLeft}
                </span>
            )}
            <Switch
                checked={checked}
                onChange={onChange}
                className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-2 w-8 cursor-pointer focus:outline-none"
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bg-[#c4c4c4] dark:bg-[#5A5A5A] w-full h-full rounded-md"
                />
                <span
                    aria-hidden="true"
                    className={classNames(
                        checked ? 'translate-x-5 bg-teal dark:bg-teal' : 'translate-x-0 bg-[#555] dark:bg-[#999]',
                        'pointer-events-none absolute left-0 inline-block h-4 w-4 rounded-full transform ring-0 transition-transform ease-in-out duration-200'
                    )}
                />
            </Switch>
            {iconRight && (
                <span className={`${!checked ? 'opacity-50' : 'opacity-80'} font-semibold transition-opacity`}>
                    {iconRight}
                </span>
            )}
        </span>
    )
}
