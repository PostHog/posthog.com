import { useContext } from 'react'
import React, { createContext, useEffect, useState } from 'react'
import qs from 'qs'
import { ProfileData, SQUEAK_HOST } from 'lib/strapi'
import usePostHog from './usePostHog'
import Link from 'components/Link'
import { useToast } from '../context/Toast'

// Sentinel value used by posthog-js for cookieless tracking mode
const COOKIELESS_SENTINEL_VALUE = '$posthog_cookieless'

// Shared POST + JSON-parse + Strapi error extraction for the /api/auth/posthog/*
// endpoints. Returns the parsed body plus a normalized `error` string; callers
// handle the success shape (jwt vs ok). Throws only on network/JSON failure.
const postPosthogAuth = async (
    path: string,
    body: Record<string, unknown>,
    token?: string | null
): Promise<{ ok: boolean; data: any; error?: string }> => {
    const res = await fetch(`${SQUEAK_HOST}/api/auth/posthog/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return { ok: res.ok, data, error: data?.error?.message || data?.message }
}

export type User = {
    id: number
    email: string
    isMember: boolean
    isModerator: boolean
    blocked: boolean
    confirmed: boolean
    createdAt: string
    provider: 'local' | 'github' | 'google' | 'posthog'
    username: string
    profile: {
        id: number
    } & ProfileData
    role: {
        type: 'authenticated' | 'public' | 'moderator'
    }
    wallet: {
        balance: number
        transactions: {
            id: number
            amount: number
            date: Date
            type: 'achievement' | 'gift'
            metadata: any
        }[]
    }
    imageGenerationRateLimit?: {
        remaining: number
        limit: number
        resetTime: string | null
        windowMs: number
        monthlyCount: number
    }
    picasso?: boolean
    // Surfaced by the Strapi `me` override (the raw posthogUserId is private).
    // True when a PostHog OAuth identity is linked to this account.
    hasPosthogLogin?: boolean
}

export type DisambiguationResult = {
    status: 'needs_disambiguation'
    pendingToken: string
    emailInUse: boolean
}

type UserContextValue = {
    isLoading: boolean
    user: User | null
    isModerator: boolean
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    fetchUser: (token?: string | null) => Promise<User | null>
    getJwt: () => Promise<string | null>
    login: (args: { email: string; password: string }) => Promise<User | null | { error: string }>
    loginWithProvider: (args: {
        provider: 'posthog'
        accessToken: string
    }) => Promise<User | null | { error: string } | DisambiguationResult>
    createWithProvider: (args: { pendingToken: string }) => Promise<User | null | { error: string }>
    linkExisting: (args: {
        pendingToken: string
        identifier: string
        password: string
    }) => Promise<User | null | { error: string }>
    linkCurrent: (args: { accessToken: string }) => Promise<{ ok: true } | { error: string }>
    unlinkProvider: () => Promise<{ ok: true } | { error: string }>
    logout: () => Promise<void>
    signUp: (args: {
        email: string
        password: string
        firstName: string
        lastName: string
    }) => Promise<User | null | { error: string }>
    isSubscribed: (contentType: 'topic' | 'question', id: number | string) => Promise<boolean>
    setSubscription: (args: {
        contentType: 'topic' | 'question'
        id: number | string
        subscribe: boolean
        user?: User
    }) => Promise<void>
    likePost: (id: number, unlike?: boolean, slug?: string) => Promise<void>
    likeRoadmap: ({
        id,
        unlike,
        title,
        user,
    }: {
        id: number
        unlike?: boolean
        title?: string
        user?: User
    }) => Promise<void>
    notifications: any
    setNotifications: any
    isValidating: boolean
    voteReply: (id: number, vote: 'up' | 'down', user?: User) => Promise<void>
    addBookmark: (args: { url: string; title: string; description: string }) => Promise<void>
    removeBookmark: (args: { url: string; title: string; description: string }) => Promise<void>
    reportSpam: (type: 'reply' | 'question', id: number) => Promise<void>
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
    loginWithProvider: async () => null,
    createWithProvider: async () => null,
    linkExisting: async () => null,
    linkCurrent: async () => ({ error: '' }),
    unlinkProvider: async () => ({ error: '' }),
    logout: async () => {
        // noop
    },
    signUp: async () => null,
    isSubscribed: async () => false,
    setSubscription: async () => undefined,
    likePost: async () => undefined,
    likeRoadmap: async () => undefined,
    notifications: [],
    setNotifications: () => undefined,
    isValidating: true,
    voteReply: async () => undefined,
    addBookmark: async () => undefined,
    removeBookmark: async () => undefined,
    reportSpam: async () => undefined,
})

type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isValidating, setIsValidating] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [jwt, setJwt] = useState<string | null>(null)
    const [notifications, setNotifications] = useState<any>([])
    const { addToast } = useToast()

    const posthog = usePostHog()

    const validateUser = async () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt && (await fetchUser(jwt))) {
            setJwt(jwt)
        } else {
            clearUser()
        }
        setIsValidating(false)
    }

    useEffect(() => {
        validateUser()
    }, [])

    const getJwt = async () => {
        return jwt || localStorage.getItem('jwt')
    }

    // Shared post-authentication steps once a JWT has been obtained (via password
    // login or an OAuth provider): hydrate the user, persist the token, and run
    // the distinct-id link + achievements check.
    const finalizeLogin = async (token: string): Promise<User> => {
        const user = await fetchUser(token)

        if (!user) {
            throw new Error('Failed to fetch user data')
        }

        localStorage.setItem('jwt', token)
        setJwt(token)

        try {
            const distinctId = posthog?.get_distinct_id?.()

            if (distinctId && distinctId !== COOKIELESS_SENTINEL_VALUE) {
                await fetch(`${SQUEAK_HOST}/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        distinctId,
                    }),
                })
            }

            fetch(`${SQUEAK_HOST}/api/achievements/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        date: new Date(),
                    },
                }),
            })
        } catch (error) {
            console.error(error)
        }

        return user
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

            const userRes = await fetch(`${SQUEAK_HOST}/api/auth/local`, {
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

            const user = await finalizeLogin(userData.jwt)

            posthog?.capture('squeak login success', {
                email,
            })

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

    const loginWithProvider = async ({
        provider,
        accessToken,
    }: {
        provider: 'posthog'
        accessToken: string
    }): Promise<User | null | { error: string } | DisambiguationResult> => {
        setIsLoading(true)

        try {
            posthog?.capture('squeak oauth login start', { provider })

            const res = await fetch(
                `${SQUEAK_HOST}/api/auth/posthog/resolve?access_token=${encodeURIComponent(accessToken)}`
            )

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data?.error?.message || data?.message)
            }

            // Non-employee with no durable link and no email match: the redirect
            // page renders the disambiguation screen (create vs. log in to link).
            if (data.status === 'needs_disambiguation') {
                return {
                    status: 'needs_disambiguation',
                    pendingToken: data.pendingToken,
                    emailInUse: data.emailInUse,
                }
            }

            const user = await finalizeLogin(data.jwt)

            posthog?.capture('squeak oauth login success', {
                provider,
                email: user.email,
            })

            return user
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useUser.loginWithProvider',
                provider,
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

    // Disambiguation: create a brand-new community account from the verified
    // PostHog identity carried in the pending token.
    const createWithProvider = async ({
        pendingToken,
    }: {
        pendingToken: string
    }): Promise<User | null | { error: string }> => {
        try {
            const { ok, data, error } = await postPosthogAuth('create', { pendingToken })
            if (!ok) {
                return { error: error || 'Could not create account.' }
            }
            // await so a failure inside finalizeLogin (e.g. /me errors) is caught
            // here rather than becoming an unhandled rejection in the caller.
            return await finalizeLogin(data.jwt)
        } catch (error) {
            console.error(error)
            return { error: 'Your account was created, but loading it failed. Please refresh and sign in.' }
        }
    }

    // Disambiguation: prove ownership of an existing account via password, then
    // additively link the PostHog identity (keeps password login — dual auth).
    const linkExisting = async ({
        pendingToken,
        identifier,
        password,
    }: {
        pendingToken: string
        identifier: string
        password: string
    }): Promise<User | null | { error: string }> => {
        try {
            const { ok, data, error } = await postPosthogAuth('link', { pendingToken, identifier, password })
            if (!ok) {
                return { error: error || 'Could not link account.' }
            }
            return await finalizeLogin(data.jwt)
        } catch (error) {
            console.error(error)
            return { error: 'Your account was linked, but loading it failed. Please refresh and sign in.' }
        }
    }

    // Proactive link from account settings (user is already logged in).
    const linkCurrent = async ({ accessToken }: { accessToken: string }): Promise<{ ok: true } | { error: string }> => {
        try {
            const token = await getJwt()
            const { ok, error } = await postPosthogAuth('link-current', { accessToken }, token)
            if (!ok) {
                return { error: error || 'Could not connect PostHog.' }
            }
            await fetchUser(token)
            return { ok: true }
        } catch (error) {
            console.error(error)
            return { error: 'Could not connect PostHog. Please try again.' }
        }
    }

    const unlinkProvider = async (): Promise<{ ok: true } | { error: string }> => {
        try {
            const token = await getJwt()
            const { ok, error } = await postPosthogAuth('unlink', {}, token)
            if (!ok) {
                return { error: error || 'Could not disconnect PostHog.' }
            }
            await fetchUser(token)
            return { ok: true }
        } catch (error) {
            console.error(error)
            return { error: 'Could not disconnect PostHog. Please try again.' }
        }
    }

    const clearUser = async (): Promise<void> => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')

        setUser(null)
        setJwt(null)
    }

    const logout = async (): Promise<void> => {
        posthog?.capture('squeak logout')

        addToast({
            title: 'Successfully signed out of PostHog.com',
            description: (
                <Link to="https://app.posthog.com" className="text-red dark:text-yellow font-semibold">
                    Looking for the app?
                </Link>
            ),
        })

        clearUser()
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

            const res = await fetch(`${SQUEAK_HOST}/api/auth/local/register`, {
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
                            images: {
                                sort: ['createdAt:desc'],
                                populate: {
                                    mediaFolder: true,
                                    tags: true,
                                    related: true,
                                },
                            },
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
                            notifications: {
                                populate: {
                                    question: {
                                        populate: {
                                            replies: true,
                                        },
                                    },
                                },
                            },
                            bookmarks: true,
                            achievements: {
                                populate: {
                                    achievement: {
                                        populate: {
                                            image: true,
                                            icon: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    role: {
                        fields: ['type'],
                    },
                    wallet: {
                        populate: {
                            transactions: true,
                        },
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

        const meRes = await fetch(`${SQUEAK_HOST}/api/users/me?${meQuery}`, {
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

        const notifications = await fetch(`${SQUEAK_HOST}/api/profile/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json())

        setNotifications(notifications || [])

        // We don't want any error thrown here to bubble up to the caller.
        try {
            if (meData?.profile) {
                posthog?.setPersonProperties({
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

        const profileRes = await fetch(`${SQUEAK_HOST}/api/profiles?${query}`)

        if (!profileRes.ok) {
            throw new Error(`Failed to fetch profile`)
        }

        const { data } = await profileRes.json()

        return data?.length > 0
    }

    const setSubscription = async ({
        contentType,
        id,
        subscribe,
        ...other
    }: {
        contentType: 'topic' | 'question'
        id: number | string
        subscribe: boolean
        user?: User
    }): Promise<void> => {
        const profileID = other?.user?.profile?.id || user?.profile?.id
        if (!profileID || !contentType || !id) return

        const body = {
            data: {
                [`${contentType}Subscriptions`]: {
                    [subscribe ? 'connect' : 'disconnect']: [id],
                },
            },
        }

        const jwt = await getJwt()

        const subscriptionRes = await fetch(`${SQUEAK_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
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
        const likeRes = await fetch(`${SQUEAK_HOST}/api/profiles/${profileID}`, {
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

    const likeRoadmap = async ({
        id,
        unlike = false,
        title = '',
        ...other
    }: {
        id: number
        unlike?: boolean
        title?: string
        user?: User
    }) => {
        const profileID = (other?.user || user)?.profile?.id
        if (!profileID || !id) return
        const body = {
            data: {
                roadmapLikes: unlike
                    ? { disconnect: [id] }
                    : {
                          connect: [id],
                      },
            },
        }
        const likeRes = await fetch(`${SQUEAK_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!likeRes.ok) {
            throw new Error(`Failed to like roadmap`)
        }

        posthog?.capture(unlike ? 'roadmap downvote' : 'roadmap upvote', {
            post: {
                id,
                title,
            },
        })

        await fetchUser()
    }

    const updateNotifications = async (notifications: any) => {
        setNotifications(notifications)
        await fetch(`${SQUEAK_HOST}/api/profiles/${user?.profile.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    notifications,
                },
            }),
        })
    }

    const voteReply = async (id: number, vote: 'up' | 'down', user: User) => {
        const profileID = user?.profile?.id
        if (!profileID) return
        const jwt = await getJwt()
        await fetch(`${SQUEAK_HOST}/api/replies/${id}/${vote}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        })
    }

    const addBookmark = async ({ url, title, description }: { url: string; title: string; description: string }) => {
        const profileID = user?.profile?.id
        if (!profileID) return
        const jwt = await getJwt()
        await fetch(`${SQUEAK_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    bookmarks: [
                        ...(user?.profile?.bookmarks?.filter((b) => b.url !== url) || []),
                        { url, title, description },
                    ],
                },
            }),
        })

        addToast({
            title: 'Bookmark added',
            description: (
                <>
                    This page has been added to your{' '}
                    <Link to="/bookmarks" state={{ newWindow: true }} className="text-red dark:text-yellow font-bold">
                        bookmarks
                    </Link>
                    .
                </>
            ),
            onUndo: async () => {
                removeBookmark({ url, title, description })
            },
        })
        await fetchUser()
    }

    const removeBookmark = async ({ url, title, description }: { url: string; title: string; description: string }) => {
        const profileID = user?.profile?.id
        if (!profileID) return
        const jwt = await getJwt()
        await fetch(`${SQUEAK_HOST}/api/profiles/${profileID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    bookmarks: user?.profile?.bookmarks?.filter((b) => b.url !== url),
                },
            }),
        })
        await fetchUser()
        addToast({
            title: 'Bookmark removed',
            description: 'This page has been removed from your bookmarks.',
            onUndo: async () => {
                addBookmark({ url, title, description })
            },
        })
    }

    const reportSpam = async (type: 'reply' | 'question', id: number) => {
        const profileID = user?.profile?.id
        if (!profileID) return
        const jwt = await getJwt()
        await fetch(`${SQUEAK_HOST}/api/report-spam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    type,
                    id,
                },
            }),
        })
    }

    const contextValue = {
        user,
        setUser,
        isModerator: user?.role?.type === 'moderator',
        isLoading,
        getJwt,
        login,
        loginWithProvider,
        createWithProvider,
        linkExisting,
        linkCurrent,
        unlinkProvider,
        logout,
        signUp,
        fetchUser,
        isSubscribed,
        setSubscription,
        likePost,
        likeRoadmap,
        notifications,
        setNotifications: updateNotifications,
        isValidating,
        voteReply,
        addBookmark,
        removeBookmark,
        reportSpam,
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const user = useContext(UserContext)
    return user
}
