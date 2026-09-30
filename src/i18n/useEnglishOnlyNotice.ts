import { useEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import { useToast } from '../context/Toast'
import { useTranslation } from '.'
import { getDirection } from './locales'

const SEEN_KEY = 'ph_english_only_notice_seen'

/**
 * Tells a reader, once, that the page they just opened from a translated page only exists in English.
 * The toast is in the language they came from, so the text is read while the translated page is still
 * current: the English page has no translation to read it from.
 */
export const useEnglishOnlyNotice = (): void => {
    const { locale, t } = useTranslation()
    const { pathname } = useLocation()
    const { addToast } = useToast()
    const previous = useRef<{ locale: string; title: string; description: string }>()

    useEffect(() => {
        const from = previous.current
        previous.current = {
            locale,
            title: t('toast.english_only.title'),
            description: t('toast.english_only.description'),
        }

        // `/` is the English home page, which the reader picked with "View in English".
        if (!from || from.locale === 'en' || locale !== 'en' || pathname === '/') return
        if (localStorage.getItem(SEEN_KEY)) return
        localStorage.setItem(SEEN_KEY, '1')

        addToast({
            title: from.title,
            description: from.description,
            duration: 10000,
            lang: from.locale,
            dir: getDirection(from.locale),
        })
    }, [locale, t, pathname])
}
