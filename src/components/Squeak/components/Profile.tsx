import React from 'react'
import { StrapiRecord } from '../util/types'
import Avatar from './Avatar'

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

export const Profile = ({ profile }: ProfileProps) => {
    return profile ? (
        <a className="squeak-profile-link" href={`/community/profiles/${profile.id}`}>
            {/* TODO: Include avatar */}
            {/*<Avatar image={profile} /> */}
            <strong className="squeak-author-name">{profile.attributes.firstName || 'Anonymous'}</strong>
        </a>
    ) : null
}
