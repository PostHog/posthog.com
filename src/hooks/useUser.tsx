import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import { post } from 'components/Squeak/lib/api'

type User = {
    id: string
    email: string
    isMember: boolean
    isModerator: boolean
    profile: {
        avatar: string
        first_name: string
        last_name: string
    }
}

type UserContextValue = {
    organizationId: string
    apiHost: string
    isLoading: boolean

    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>

    getSession: () => Promise<User | null>
    login: (args: { email: string; password: string }) => Promise<User | null>
}

export const UserContext = createContext<UserContextValue>({
    organizationId: '',
    apiHost: '',
    isLoading: true,
    user: null,
    setUser: () => {
        // noop
    },

    getSession: async () => null,
    login: async () => null,
})

type UserProviderProps = {
    organizationId: string
    apiHost: string
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ apiHost, organizationId, children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getSession()
    }, [])

    const getSession = async (): Promise<User | null> => {
        setIsLoading(true)

        if (user) {
            return user
        }

        try {
            const res = await fetch(`${apiHost}/api/user?organizationId=${organizationId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                return null
            }

            const data = await res.json()

            if (data.error) {
                return null
            } else {
                setUser(data)
                return data as User
            }
        } catch (error) {
            console.error(error)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const login = async ({ email, password }: { email: string; password: string }): Promise<User | null> => {
        setIsLoading(true)

        const { data, error } =
            (await post(apiHost, '/api/login', {
                email,
                password,
                organizationId,
            })) || {}

        if (error) {
            setIsLoading(false)

            // TODO: Should probably throw here
            return null
        } else {
            setUser(data)

            return data
        }
    }

    return (
        <UserContext.Provider value={{ organizationId, apiHost, user, setUser, isLoading, getSession, login }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
