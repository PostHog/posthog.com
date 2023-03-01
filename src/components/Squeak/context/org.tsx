import React, { createContext, useEffect, useState } from 'react'
import { get } from '../lib/api'

type OrgContextValue = {
    apiHost: string
    organizationId: string
    config?: any
    profileLink?: (profile: any) => string
}

export const Context = createContext<OrgContextValue | undefined>(undefined)

type ProviderProps = {
    value: OrgContextValue
    children: React.ReactNode
}

export const Provider: React.FC<ProviderProps> = ({ value: { apiHost, organizationId, profileLink }, children }) => {
    const [config, setConfig] = useState({})

    const getConfig = async () => {
        const { data } = (await get(apiHost, '/api/config', { organizationId })) || {}
        return data
    }

    useEffect(() => {
        getConfig().then((config) => {
            setConfig(config)
        })
    }, [])

    return <Context.Provider value={{ apiHost, organizationId, config, profileLink }}>{children}</Context.Provider>
}
