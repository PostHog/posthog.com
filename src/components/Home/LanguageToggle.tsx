import React from 'react'
import { useLocation } from '@reach/router'
import Link from 'components/Link'
import { IconGlobe } from '@posthog/icons'

/**
 * Returns true if the user's browser language is Korean (client-side only).
 * Used to show the language toggle only to Korean users on / and /ko.
 */
export function useIsKoreanUser(): boolean {
    if (typeof window === 'undefined') return false
    return (
        navigator.language?.startsWith('ko') === true ||
        (Array.isArray(navigator.languages) && navigator.languages.some((l) => String(l).startsWith('ko')))
    )
}

/**
 * Toggle between English (/) and Korean (/ko). Only rendered when user is auto-detected as Korean.
 * Shown on both / and /ko so they can switch; hidden for non-Korean users.
 */
export default function LanguageToggle() {
    const isKorean = useIsKoreanUser()
    const location = useLocation()
    const pathname = location?.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '')
    const isKoPage = pathname === '/ko' || pathname === '/ko/'

    if (!isKorean) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="flex items-center rounded-full border border-light dark:border-dark bg-accent dark:bg-accent-dark shadow-lg overflow-hidden">
                <Link
                    to="/"
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors no-underline ${
                        !isKoPage ? 'bg-primary text-primary-inverse' : 'text-primary hover:bg-light dark:hover:bg-dark'
                    }`}
                >
                    <IconGlobe className="size-4" />
                    <span>English</span>
                </Link>
                <Link
                    to="/ko"
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors no-underline ${
                        isKoPage ? 'bg-primary text-primary-inverse' : 'text-primary hover:bg-light dark:hover:bg-dark'
                    }`}
                >
                    <span>한국어</span>
                </Link>
            </div>
        </div>
    )
}
