import React, { createContext, useContext } from 'react'

type Locale = 'en' | 'ko'

const LocaleContext = createContext<Locale>('en')

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
    return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
    return useContext(LocaleContext)
}
