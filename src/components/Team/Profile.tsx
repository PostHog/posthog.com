import React from 'react'
import { Avatar } from 'components/MainNav'
import Stickers from 'components/ProfileStickers'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import Markdown from 'markdown-to-jsx'
import { CallToAction } from 'components/CallToAction'

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
    const { firstName, lastName, country, companyRole, pineappleOnPizza, biography, isTeamLead, id, location, color } =
        profile
    const name = [firstName, lastName].filter(Boolean).join(' ')
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
