import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'

type UserContextValue = {
    organizationId: string
    apiHost: string
    user: Record<string, any> | null // TODO: Bring in real user type
    setUser: React.Dispatch<React.SetStateAction<Record<string, any> | null>>
}

export const UserContext = createContext<UserContextValue>({
    organizationId: '',
    apiHost: '',
    user: null,
    setUser: () => {
        // noop
    },
})

type UserProviderProps = {
    organizationId: string
    apiHost: string
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ apiHost, organizationId, children }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null)

    useEffect(() => {
        fetch(`${apiHost}/api/user?organizationId=${organizationId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res)

                /*const role = res.data.profile?.role
            const isModerator = role === 'admin' || role === 'moderator'
            setUser({ ...res.data, isModerator })*/
            })
            .catch(() => {
                setUser(null)
            })
    }, [])

    return <UserContext.Provider value={{ organizationId, apiHost, user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
