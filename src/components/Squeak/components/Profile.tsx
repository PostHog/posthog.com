import React from 'react'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import Avatar from './Avatar'

type ProfileProps = {
    profile?: StrapiRecord<ProfileData>
}

export const Profile = ({ profile }: ProfileProps) => {
    return profile?.attributes ? (
        <a className="squeak-profile-link" href={`/community/profiles/${profile.id}`}>
            <Avatar image={profile.attributes.avatar?.data?.attributes?.url} />
            <strong className="squeak-author-name">{profile.attributes.firstName || 'Anonymous'}</strong>
        </a>
    ) : null
}
