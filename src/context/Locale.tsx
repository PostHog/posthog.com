import React, { createContext, useContext } from 'react'

export type Locale = 'en' | 'ko'

type LocaleContextValue = {
    locale: Locale
    setLocale: ((locale: Locale) => void) | null
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: 'en',
    setLocale: null,
})

export function LocaleProvider({
    locale,
    setLocale = null,
    children,
}: {
    locale: Locale
    setLocale?: ((locale: Locale) => void) | null
    children: React.ReactNode
}) {
    return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
    return useContext(LocaleContext).locale
}

export function useSetLocale(): ((locale: Locale) => void) | null {
    return useContext(LocaleContext).setLocale
}
