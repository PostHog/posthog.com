import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import qs from 'qs'
import { ProfileData } from 'lib/strapi'
import usePostHog from './usePostHog'

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
    profile: {
        id: number
    } & ProfileData
    role: {
        type: 'authenticated' | 'public' | 'moderator'
    }
}

type UserContextValue = {
    isLoading: boolean
    user: User | null
    isModerator: boolean
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
    isSubscribed: (contentType: 'topic' | 'question', id: number | string) => Promise<boolean>
    setSubscription: (contentType: 'topic' | 'question', id: number | string, subscribe: boolean) => Promise<void>
}

export const UserContext = createContext<UserContextValue>({
    isLoading: true,
    user: null,
    isModerator: false,
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
    isSubscribed: async () => false,
    setSubscription: async () => undefined,
})

type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [jwt, setJwt] = useState<string | null>(null)

    const posthog = usePostHog()

    const validateUser = async () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt && (await fetchUser(jwt))) {
            setJwt(jwt)
        } else {
            logout()
        }
    }

    useEffect(() => {
        validateUser()
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
            posthog?.capture('squeak login start')

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
                throw new Error(userData?.error?.message)
            }

            const user = await fetchUser(userData.jwt)

            if (!user) {
                throw new Error('Failed to fetch user data')
            }

            posthog?.capture('squeak login success', {
                email,
            })

            localStorage.setItem('jwt', userData.jwt)
            setJwt(userData.jwt)

            try {
                const distinctId = posthog?.get_distinct_id?.()

                if (distinctId) {
                    await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userData.jwt}`,
                        },
                        body: JSON.stringify({
                            distinctId,
                        }),
                    })
                }
            } catch (error) {
                console.error(error)
            }

            return user
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useUser.login',
                email,
                error: JSON.stringify(error),
            })

            console.error(error)

            if (error instanceof Error) {
                return { error: error.message }
            }

            return null
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        posthog?.capture('squeak logout')

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
        setIsLoading(true)

        try {
            posthog?.capture('squeak signup start')

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
                throw new Error(userData?.error?.message)
            }

            const user = await fetchUser(userData.jwt)

            localStorage.setItem('jwt', userData.jwt)
            setJwt(userData.jwt)

            posthog?.capture('squeak signup success', {
                email,
            })

            return user
        } catch (error) {
            posthog?.capture('squeak error', {
                type: 'useUser.signup',
                email,
                firstName,
                lastName,
                error: JSON.stringify(error),
            })

            console.error(error)

            if (error instanceof Error) {
                return { error: error.message }
            }

            return null
        } finally {
            setIsLoading(false)
        }
    }

    const fetchUser = async (token?: string | null): Promise<User | null> => {
        const meQuery = qs.stringify(
            {
                populate: {
                    profile: {
                        populate: {
                            avatar: true,
                            questionSubscriptions: {
                                filters: {
                                    $or: [
                                        {
                                            archived: {
                                                $null: true,
                                            },
                                        },
                                        {
                                            archived: {
                                                $eq: false,
                                            },
                                        },
                                    ],
                                },
                            },
                            topicSubscriptions: {
                                fields: ['slug', 'label'],
                            },
                            postLikes: {
                                fields: ['id'],
                            },
                            roadmapLikes: {
                                fields: ['id'],
                            },
                            teams: {
                                fields: ['id'],
                            },
                        },
                    },
                    role: {
                        fields: ['type'],
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
            posthog?.capture('community', {
                error: 'failed to fetch user',
            })
            return null
        }

        const meData: User = await meRes.json()

        setUser(meData)

        // We don't want any error thrown here to bubble up to the caller.
        try {
            // We use the existing distinct_id here so we don't clobber the currently identified user.
            const distinctId = posthog?.get_distinct_id?.()

            if (distinctId && meData?.profile) {
                posthog?.identify(distinctId, {
                    // IMPORTANT: Make sure all properties start with `squeak` so we don't override any existing properties!
                    squeakEmail: meData.email,
                    squeakUsername: meData.username,
                    squeakCreatedAt: meData.createdAt,
                    squeakProfileId: meData.profile.id,
                    squeakFirstName: meData.profile.firstName,
                    squeakLastName: meData.profile.lastName,
                    squeakBiography: meData.profile.biography,
                    squeakCompany: meData.profile.company,
                    squeakCompanyRole: meData.profile.companyRole,
                    squeakGithub: meData.profile.github,
                    squeakLinkedIn: meData.profile.linkedin,
                    squeakLocation: meData.profile.location,
                    squeakTwitter: meData.profile.twitter,
                    squeakWebsite: meData.profile.website,
                })
            }
        } catch (error) {
            console.error(error)
        }

        return meData
    }

    const isSubscribed = async (contentType: 'topic' | 'question', id: number | string) => {
        const profileID = user?.profile?.id
        if (!profileID || !contentType || !id) return false

        const query = qs.stringify({
            filters: {
                id: {
                    $eq: profileID,
                },
                [`${contentType}Subscriptions`]: {
                    id: {
                        $eq: id,
                    },
                },
            },
            populate: {
                [`${contentType}Subscriptions`]: true,
            },
        })

        const profileRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)

        if (!profileRes.ok) {
            throw new Error(`Failed to fetch profile`)
        }

        const { data } = await profileRes.json()

        return data?.length > 0
    }

    const setSubscription = async (
        contentType: 'topic' | 'question',
        id: number | string,
        subscribe: boolean
    ): Promise<void> => {
        const profileID = user?.profile?.id
        if (!profileID || !contentType || !id) return

        const body = {
            data: {
                [`${contentType}Subscriptions`]: {
                    [subscribe ? 'connect' : 'disconnect']: [id],
                },
            },
        }

        const subscriptionRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!subscriptionRes.ok) {
            throw new Error(`Failed to update subscription`)
        }

        await fetchUser()
    }

    const likePost = async (id: number, unlike = false, slug = '') => {
        const profileID = user?.profile?.id
        if (!profileID || !id) return
        const body = {
            data: {
                postLikes: unlike
                    ? { disconnect: [id] }
                    : {
                          connect: [id],
                      },
            },
        }
        const likeRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!likeRes.ok) {
            throw new Error(`Failed to like post`)
        }

        posthog?.capture(unlike ? 'post downvote' : 'post upvote', {
            post: {
                id,
                url: `https://posthog.com${slug}`,
            },
        })

        await fetchUser()
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const contextValue = {
        user,
        setUser,
        isModerator: user?.role?.type === 'moderator',
        isLoading,
        getJwt,
        login,
        logout,
        signUp,
        fetchUser,
        isSubscribed,
        setSubscription,
        likePost,
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
