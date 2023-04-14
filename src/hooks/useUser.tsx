import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import qs from 'qs'
import { ProfileData, StrapiRecord, StrapiResult } from 'lib/strapi'

export type User = {
    id: number
    email: string
    isMember: boolean
    isModerator: boolean
    blocked: boolean
    confirmed: boolean
    createdAt: string
    provider: 'local' | 'github' | 'google'
    username: string
    profile: StrapiRecord<ProfileData>
}

type UserContextValue = {
    isLoading: boolean

    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    fetchUser: (token?: string | null) => Promise<User | null>
    getJwt: () => Promise<string | null>
    login: (args: { email: string; password: string }) => Promise<User | null | { error: string }>
    logout: () => Promise<void>
    signUp: (args: {
        email: string
        password: string
        firstName: string
        lastName: string
    }) => Promise<User | null | { error: string }>
}

export const UserContext = createContext<UserContextValue>({
    isLoading: true,
    user: null,
    setUser: () => {
        // noop
    },
    fetchUser: async () => null,
    getJwt: async () => null,
    login: async () => null,
    logout: async () => {
        // noop
    },
    signUp: async () => null,
})

type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        const user = localStorage.getItem('user')

        if (jwt && user) {
            setJwt(jwt)
            setUser(JSON.parse(user))
        } else {
            // We shouldn't have a jwt without a user or vice versa. If we do, clear both and reset.
            logout()
        }
    }, [])

    const getJwt = async () => {
        return jwt || localStorage.getItem('jwt')
    }

    const login = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }): Promise<User | null | { error: string }> => {
        setIsLoading(true)

        try {
            const userRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/local`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    identifier: email,
                    password,
                }),
            })

            const userData = await userRes.json()

            if (!userRes.ok) {
                return { error: userData?.error?.message }
            }

            const user = await fetchUser(userData.jwt)

            localStorage.setItem('jwt', userData.jwt)
            setJwt(userData.jwt)

            return user
        } catch (error) {
            console.error(error)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')

        setUser(null)
        setJwt(null)
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
    }): Promise<User | null | { error: string }> => {
        try {
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    email,
                    password,
                    firstName,
                    lastName,
                }),
            })

            const userData = await res.json()

            if (!res.ok) {
                return { error: userData?.error?.message }
            }

            const user = await fetchUser(userData.jwt)

            localStorage.setItem('jwt', userData.jwt)
            setJwt(userData.jwt)

            return user
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const fetchUser = async (token?: string | null): Promise<User | null> => {
        const meQuery = qs.stringify(
            {
                populate: {
                    profile: {
                        populate: ['avatar'],
                    },
                    role: {
                        select: ['type'],
                    },
                },
            },
            {
                encodeValuesOnly: true,
            }
        )

        if (!token) {
            token = await getJwt()
        }

        const meRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/users/me?${meQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!meRes.ok) {
            throw new Error('Failed to fetch profile data')
        }

        const meData: User = await meRes.json()

        setUser(meData)

        return meData
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, getJwt, login, logout, signUp, fetchUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
