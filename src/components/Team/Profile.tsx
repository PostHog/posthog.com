import React, { useEffect, useState } from 'react'
import { Avatar } from 'components/MainNav'
import Stickers from 'components/ProfileStickers'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import Markdown from 'markdown-to-jsx'
import { CallToAction } from 'components/CallToAction'
import { ColorPicker } from '../../pages/community/profile/edit'
import { useUser } from 'hooks/useUser'

export interface ProfileData {
    firstName: string
    lastName: string
    country: string
    companyRole: string
    pineappleOnPizza: boolean
    biography: string
    isTeamLead: boolean
    id: string
    location: string
    color?: string
}

interface ProfileProps {
    profile: ProfileData
}

export default function Profile({ profile }: ProfileProps): JSX.Element {
    const { user, getJwt } = useUser()
    const [color, setColor] = useState<string | undefined>()
    const { firstName, lastName, country, companyRole, pineappleOnPizza, biography, isTeamLead, id, location } = profile
    const name = [firstName, lastName].filter(Boolean).join(' ')

    const handleColorChange = async (newColor: string) => {
        setColor(newColor)
        const jwt = await getJwt()
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { color: newColor } }),
        })
    }

    useEffect(() => {
        if (user?.role?.type === 'moderator' && user?.webmaster) {
            fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => setColor(data.data.attributes.color))
        } else {
            setColor(profile.color)
        }
    }, [user])

    return (
        <div>
            <div className="flex space-x-2 mb-6">
                <Avatar
                    className={`w-24 h-24 ${
                        color ? `bg-${color}` : 'bg-accent dark:bg-dark'
                    } rounded-full border border-border dark:border-dark`}
                    src={getAvatarURL(profile as any)}
                />
                <div>
                    <h2 className="m-0">{name}</h2>
                    <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{companyRole}</p>
                    <div className="flex space-x-1 items-center mt-1">
                        <Stickers
                            country={country}
                            location={location}
                            pineappleOnPizza={pineappleOnPizza}
                            isTeamLead={isTeamLead}
                        />
                    </div>
                </div>
            </div>
            {user?.role?.type === 'moderator' && user?.webmaster && (
                <div className="mb-4">
                    <ColorPicker
                        active={(currColor) => currColor === color}
                        onClick={(newColor) => handleColorChange(newColor)}
                    />
                </div>
            )}

            {biography ? (
                <Markdown className="bio-sidebar">{biography}</Markdown>
            ) : (
                <p className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-4 text-sm">
                    {firstName} has been too busy writing code to fill out a bio!
                </p>
            )}
            <div className="mt-4">
                <CallToAction
                    to={`/community/profiles/${id}`}
                    type="secondary"
                    size="sm"
                    width="full [&_span]:w-[calc(100%_+_3px)]"
                >
                    Visit full profile
                </CallToAction>
            </div>
        </div>
    )
}
