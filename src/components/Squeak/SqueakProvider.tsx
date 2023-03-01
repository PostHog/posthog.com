import React, { createContext } from 'react'

type SqueakContextValue = {
    apiHost: string // e.g. https://squeak.posthog.cc
}

export const SqueakContext = createContext<SqueakContextValue>({
    apiHost: 'https://squeak.posthog.cc',
})

type SqueakProviderProps = {
    apiHost: string
    children: React.ReactNode
}

export const SqueakProvider: React.FC<SqueakProviderProps> = ({ apiHost, children }) => {
    return <SqueakContext.Provider value={{ apiHost }}>{children}</SqueakContext.Provider>
}

export const useSqueak = () => {
    return React.useContext(SqueakContext)
}
