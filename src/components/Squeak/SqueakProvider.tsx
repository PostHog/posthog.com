import React, { createContext } from 'react'

type SqueakContextValue = {}

export const SqueakContext = createContext<SqueakContextValue>({})

type SqueakProviderProps = {
    children: React.ReactNode
}

export const SqueakProvider: React.FC<SqueakProviderProps> = ({ children }) => {
    return <SqueakContext.Provider value={{}}>{children}</SqueakContext.Provider>
}

export const useSqueak = () => {
    return React.useContext(SqueakContext)
}
