import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import getGravatar from 'gravatar'
import qs from 'qs'
import { ProfileData, StrapiRecord, StrapiResult } from 'lib/strapi'

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
    profile: StrapiRecord<ProfileData>
}

type UserContextValue = {
    isLoading: boolean

    user: User | null

    getJwt: () => Promise<string | null>
    login: (args: { email: string; password: string }) => Promise<User | null>
    logout: () => Promise<void>
    signUp: (args: { email: string; password: string; firstName: string; lastName: string }) => Promise<User | null>
}

export const UserContext = createContext<UserContextValue>({
    isLoading: true,
    user: null,

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
            setJwt(null)
            setUser(null)

            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
        }
    }, [])

    const getJwt = async () => {
        return jwt
    }

    const login = async ({ email, password }: { email: string; password: string }): Promise<User | null> => {
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
                    populate: ['avatar'],
                },
                {
                    encodeValuesOnly: true,
                }
            )

            // TODO: Abstract this so signUp can share
            const profileRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${profileQuery}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })

            if (!profileRes.ok) {
                return null
            }

            const profileData: StrapiResult<ProfileData[]> = await profileRes.json()

            const user: User = {
                ...userData.user,
                profile: profileData.data[0],
            }

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('jwt', userData.jwt)

            setUser(user)
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
    }): Promise<User | null> => {
        try {
            const gravatar = getGravatar.url(email)
            const avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')

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

            if (!res.ok) {
                return null
            }

            const userData = await res.json()

            const profileRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?populate=avatar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        user: userData.user.id,
                        firstName,
                        lastName,
                        gravatarURL: avatar,
                    },
                }),
            })

            if (!profileRes.ok) {
                return null
            }

            const { data: profileData }: { data: StrapiRecord<ProfileData> } = await profileRes.json()

            console.log(profileData)

            const user: User = {
                ...userData.user,
                profile: {
                    ...profileData,
                },
            }

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('jwt', userData.jwt)

            setUser(user)
            setJwt(userData.jwt)

            return user
        } catch (error) {
            console.error(error)
            return null
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, getJwt, login, logout, signUp }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
