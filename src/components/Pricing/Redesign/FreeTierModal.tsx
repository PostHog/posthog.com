import React, { useEffect } from 'react'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { freeTierProducts } from 'components/Pricing/Test/freeTierData'

/**
 * Window key. Must match the entry in `appSettings` in context/App.tsx, which is what
 * gives this its centering and modal chrome.
 */
export const FREE_TIER_MODAL_KEY = 'pricing-free-tier'

interface FreeTierModalProps {
    /** Set by the caller so the window system can match this to its `appSettings` entry. */
    location?: { pathname: string }
    newWindow?: boolean
}

/**
 * Every product's monthly free-tier allowance, as a plain two-column list.
 *
 * The same numbers are already on the page in `FreeTierTicker`, but that's the glanceable
 * version: it scrolls, it's cut off at both edges, and you can't scan it for a product you
 * care about. This is the readable one, for when someone reads "monthly free tier" in the
 * Free card and wants to know what that actually amounts to.
 *
 * Opened through the window system (`addWindow`) rather than a bare Radix dialog, the same
 * way the community sign-in modal works, so it inherits the standard window chrome, title
 * bar, and dismiss behavior.
 *
 * Deliberately no icons: the ticker uses them to make products recognizable at a glance
 * while moving, but in a static list they'd add a column without adding information.
 */
export default function FreeTierModal(_props: FreeTierModalProps): JSX.Element {
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Monthly free tier')
        }
    }, [])

    return (
        // Sized here rather than by the window's `size` config: the modal renders in a Radix
        // portal, so its content dictates the dialog's dimensions.
        <div data-scheme="primary" className="bg-primary text-primary">
            <ScrollArea>
                <div className="p-5">
                    <p className="text-[15px] text-secondary mb-4">
                        Resets monthly. Same allowance whether or not you have a card on file.
                    </p>

                    {/* Rules between rows only — the outer two would box the list in against
                        edges the modal already provides. */}
                    <ul className="list-none p-0 m-0">
                        {freeTierProducts.map(({ name, allocation, description, badge, note }) => (
                            <li key={name} className="border-t border-primary first:border-t-0 py-2.5">
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-[15px] font-semibold flex items-center gap-1.5">
                                        {name}
                                        {badge && (
                                            <span className="bg-yellow uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                                                {badge}
                                            </span>
                                        )}
                                    </span>
                                    <span
                                        className={`text-[15px] text-right ${
                                            description ? 'text-secondary italic' : ''
                                        }`}
                                    >
                                        {description || allocation}
                                    </span>
                                </div>
                                {/* Full width rather than under the allowance: these run long, and
                                    right-aligned paragraphs are unreadable. */}
                                {note && <p className="text-xs text-secondary mt-1 mb-0">{note}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    )
}
