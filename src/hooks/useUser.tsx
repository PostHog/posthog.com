import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import getGravatar from 'gravatar'
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
    logout: () => Promise<void>
    signUp: (args: { email: string; password: string; firstName: string; lastName: string }) => Promise<User | null>
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
    logout: async () => {
        // noop
    },
    signUp: async () => null,
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

    const logout = async (): Promise<void> => {
        await post(apiHost, '/api/logout')
        setUser(null)
    }

    const signUp = async ({
        email,
        password,
        firstName,
        lastName,
    }: {
        email: string
        password: string
        firstName: string
        lastName: string
    }): Promise<User | null> => {
        const gravatar = getGravatar.url(email)
        const avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')

        // FIXME: This doesn't seem to return the right format
        const { error, data } =
            (await post(apiHost, '/api/register', {
                email,
                password,
                firstName,
                lastName,
                avatar,
                organizationId,
            })) || {}

        if (error) {
            // setMessage(error.message)
            // TODO: Should probably throw here
            return null
        } else {
            // setUser(data)
            let user = await getSession()

            return user
        }
    }

    return (
        <UserContext.Provider
            value={{ organizationId, apiHost, user, setUser, isLoading, getSession, login, logout, signUp }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
