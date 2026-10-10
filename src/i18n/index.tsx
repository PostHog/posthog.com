import React, { createContext, useContext, useMemo } from 'react'
// Gatsby's built-in webpack rule parses .yml imports, so English ships in the JS bundle.
import en from './locales/en.yml'
import { flattenMessages, type Messages } from './flatten'

export type LocaleContext = {
    locale?: string
    messages?: Messages
}

type Tags = Record<string, (children: string) => React.ReactNode>

const english = flattenMessages(en.messages)

const I18nContext = createContext<{ locale: string; messages: Messages }>({ locale: 'en', messages: english })

/**
 * Supplies the strings for one page. `pageContext` comes from `gatsby/i18n.ts`: the English home
 * page has `locale: 'en'`, a translated one also has its `messages`. Pages without a locale get
 * English. A missing translation falls back to the English string.
 */
export function I18nProvider({ pageContext, children }: { pageContext?: LocaleContext; children: React.ReactNode }) {
    const locale = pageContext?.locale || 'en'
    const messages = pageContext?.messages
    const value = useMemo(
        () => ({ locale, messages: messages ? { ...english, ...messages } : english }),
        [locale, messages]
    )
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

const interpolate = (message: string, vars?: Record<string, string | number>) =>
    vars ? message.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match)) : message

export function useTranslation() {
    const { locale, messages } = useContext(I18nContext)

    return useMemo(() => {
        const t = (key: string, vars?: Record<string, string | number>): string => {
            const message = messages[key]
            if (message === undefined) {
                if (process.env.NODE_ENV === 'development') console.warn(`[i18n] Missing key in en.yml: ${key}`)
                return key
            }
            return interpolate(message, vars)
        }

        // For copy with inline markup. "Set up <logo/> <em>for free</em>" with
        // `{ logo: () => <Logo />, em: (text) => <b>{text}</b> }`. Tags do not nest.
        const rich = (key: string, tags: Tags, vars?: Record<string, string | number>): React.ReactNode =>
            t(key, vars)
                .split(/(<\w+\/>|<\w+>.*?<\/\w+>)/)
                .map((part, index) => {
                    const match = part.match(/^<(\w+)(?:\/>|>(.*?)<\/\1>)$/)
                    const render = match && tags[match[1]]
                    return <React.Fragment key={index}>{render ? render(match[2] ?? '') : part}</React.Fragment>
                })

        return { locale, t, rich }
    }, [locale, messages])
}
