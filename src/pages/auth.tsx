import usePostHog from 'hooks/usePostHog'
import { User } from 'hooks/useUser'
import qs from 'qs'
import React, { useEffect, useState } from 'react'

const IndexPage = () => {
    const posthog = usePostHog()
    const [authFailed, setAuthFailed] = useState(false)
    const [message, setMessage] = useState("You'll be redirected shortly")

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

        const meRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/users/me?${meQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!meRes.ok) {
            throw new Error('Failed to fetch profile data')
        }

        const meData: User = await meRes.json()

        localStorage.setItem('user', JSON.stringify(meData))

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

    const handleLogin = async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const userDataRaw = urlParams.get('userData')

        if (!userDataRaw) {
            throw new Error('userData missing')
        }

        const userData = JSON.parse(userDataRaw)

        const user = await fetchUser(userData.jwt)

        if (!user) {
            throw new Error('Failed to fetch user data')
        }

        localStorage.setItem('jwt', userData.jwt)

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
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('error') === 'emailIsTaken') {
            setAuthFailed(false)
            setMessage('An account with that email already exists. Make sure to login with the existing Cloud account.')
        }

        handleLogin()
            .then(() => {
                const urlParams = new URLSearchParams(window.location.search)
                const redirect = urlParams.get('redirect')

                if (redirect) {
                    window.location.href = redirect
                }
            })
            .catch(() => {
                setAuthFailed(true)

                const urlParams = new URLSearchParams(window.location.search)
                const redirect = urlParams.get('redirect')

                if (redirect) {
                    setTimeout(() => {
                        window.location.href = redirect
                    }, 2000)
                }
            })
    }, [])

    return (
        <div className="w-screen h-screen flex justify-center items-center flex flex-col">
            {authFailed && <p className="mb-1">Authentication failed</p>}
            <p className="text-center max-w-[80%]">{message}</p>
        </div>
    )
}

export default IndexPage
