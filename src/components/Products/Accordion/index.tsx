import React, { useState } from 'react'
import { IconMinus, IconPlus } from '@posthog/icons'

export const Accordion = ({ children, label, initialOpen = false, className = '' }) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                type="button"
                className={`py-3 w-full border-t first:border-0 border-border dark:border-dark ${className}`}
            >
                <div className={`flex justify-between items-center text-left gap-4`}>
                    <p className="m-0 font-bold text-[15px] text-red dark:text-yellow leading-tight">{label}</p>
                    {open ? <IconMinus className="w-4" /> : <IconPlus className="w-4" />}
                </div>
            </button>
            <div className={`text-sm ${open ? '-mt-2 pb-2' : 'hidden'}`}>{children}</div>
        </>
    )
}
