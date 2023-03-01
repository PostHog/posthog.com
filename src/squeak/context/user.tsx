import React, { createContext, useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import { get } from '../lib/api'

type UserContextValue = {
    user: Record<string, any> | null // TODO: Bring in real user type
    setUser: React.Dispatch<React.SetStateAction<Record<string, any> | null>>
}

export const Context = createContext<UserContextValue>({
    user: null,
    setUser: () => {},
})

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null)
    const { organizationId, apiHost } = useOrg()

    function getSession() {
        return get(apiHost, '/api/user', { organizationId })
    }

    useEffect(() => {
        getSession()
            .then((res) => {
                if (res?.error) {
                    console.error('ERROR', res.error)
                } else if (res && 'data' in res && res.data) {
                    const role = res.data.profile?.role
                    const isModerator = role === 'admin' || role === 'moderator'
                    setUser({ ...res.data, isModerator })
                }
            })
            .catch((err) => {
                console.log('error getting session', err)
            })
    }, [user?.id])

    return <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
}
