import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import getGravatar from 'gravatar'
import { post } from 'components/Squeak/lib/api'
import qs from 'qs'
import { ProfileData, StrapiResult } from 'lib/strapi'

type User = {
    id: number
    email: string
    isMember: boolean
    isModerator: boolean
    blocked: boolean
    confirmed: boolean
    createdAt: string
    provider: 'email' | 'github' | 'google'
    username: string
    profile: {
        avatar: string
        firstName: string
        lastName: string
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
    const [isLoading, setIsLoading] = useState(false)
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

        try {
            const userRes = await fetch(`${apiHost}/api/auth/local`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    identifier: email,
                    password,
                }),
            })

            if (!userRes.ok) {
                return null
            }

            const userData = await userRes.json()

            const profileQuery = qs.stringify(
                {
                    filters: {
                        user: {
                            id: {
                                $eq: userData.user.id,
                            },
                        },
                    },
                },
                {
                    encodeValuesOnly: true,
                }
            )
            const profileRes = await fetch(`${apiHost}/api/profiles?${profileQuery}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })

            if (!profileRes.ok) {
                return null
            }

            const profileData: StrapiResult<ProfileData[]> = await profileRes.json()

            const user = {
                ...userData.user,
                profile: profileData.data[0],
            }

            console.log(user)

            return user
        } catch (error) {
            console.error(error)
            return null
        } finally {
            setIsLoading(false)
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
