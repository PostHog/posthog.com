import React from 'react'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import Link from 'components/Link'

type ProfileProps = {
    className?: string
    profile?: StrapiRecord<ProfileData>
}

export const Profile = ({ className, profile }: ProfileProps) => {
    return profile?.attributes ? (
        <Link
            className={`flex items-center !text-black dark:!text-white relative ${className}`}
            to={`/community/profiles/${profile.id}`}
        >
            <div className="w-[40px] h-[40px] rounded-full mr-[10px] overflow-hidden">
                <Avatar className="w-[40px] object-fill" image={getAvatarURL(profile?.attributes)} />
            </div>
            <strong>{profile.attributes.firstName || 'Anonymous'}</strong>
        </Link>
    ) : null
}
