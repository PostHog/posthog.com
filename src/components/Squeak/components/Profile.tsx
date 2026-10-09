import React from 'react'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import Link from 'components/Link'

type ProfileProps = {
    className?: string
    profile?: StrapiRecord<ProfileData>
    compact?: boolean
}

export const Profile = ({ className, profile, compact = false }: ProfileProps) => {
    return profile?.attributes ? (
        <Link
            state={{ newWindow: true }}
            className={`flex items-center relative !no-underline hover:!underline ${className}`}
            to={`/community/profiles/${profile.id}`}
        >
            <div
                className={`${
                    compact ? 'size-8 mr-2' : 'w-[44px] h-[44px] ml-[-2px] mr-[10px]'
                } rounded-full overflow-hidden`}
            >
                <Avatar
                    className={compact ? 'size-8' : 'w-[40px]'}
                    image={getAvatarURL(profile)}
                    color={profile.attributes.color}
                />
            </div>
            <strong>{profile.attributes.firstName || 'Anonymous'}</strong>
        </Link>
    ) : null
}
