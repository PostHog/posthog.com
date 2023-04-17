import React from 'react'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'

type ProfileProps = {
    profile?: StrapiRecord<ProfileData>
}

export const Profile = ({ profile }: ProfileProps) => {
    return profile?.attributes ? (
        <a className="squeak-profile-link" href={`/community/profiles/${profile.id}`}>
            <Avatar image={getAvatarURL(profile?.attributes)} />
            <strong className="squeak-author-name">{profile.attributes.firstName || 'Anonymous'}</strong>
        </a>
    ) : null
}
