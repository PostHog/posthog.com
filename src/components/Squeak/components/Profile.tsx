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
            <div className="w-[44px] h-[44px] ml-[-2px] rounded-full mr-[10px] overflow-hidden">
                <Avatar
                    className={`w-[40px]`}
                    image={getAvatarURL(profile?.attributes)}
                    color={profile.attributes.color}
                />
            </div>
            <strong>{profile.attributes.firstName || 'Anonymous'}</strong>
        </Link>
    ) : null
}
