import React from 'react'
import type { StrapiRecord } from './utils'

import { Avatar } from './Avatar'

export type ProfileData = {
    firstName: string | null
    lastName: string | null
    biography: string | null
    company: string | null
    companyRole: string | null
    github: string | null
    linkedin: string | null
    location: string | null
    twitter: string | null
    website: string | null
    createdAt: string
    updatedAt: string | null
    publishedAt: string | null
}

type ProfileProps = {
    profile?: StrapiRecord<ProfileData>
}

export const Profile: React.FC<ProfileProps> = ({ profile }) => {
    if (!profile) {
        // TODO: Show loading state
        return null
    }

    const { firstName, lastName } = profile.attributes

    const name = firstName || lastName ? `${firstName} ${lastName}` : 'Anonymous'

    return (
        <a href={`/community/profiles/${profile.id}`}>
            <div className="flex items-center space-x-3">
                <Avatar />
                <span className="text-md font-semibold whitespace-nowrap">{name}</span>
            </div>
        </a>
    )
}
