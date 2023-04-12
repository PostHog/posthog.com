import { ProfileData, StrapiRecord } from 'lib/strapi'

export default function getAvatarURL(profile: StrapiRecord<Pick<ProfileData, 'avatar' | 'gravatarURL'>> | undefined) {
    return (
        profile?.avatar?.url ||
        profile?.avatar?.data?.attributes?.url ||
        profile?.attributes?.avatar?.data?.attributes?.url ||
        profile?.gravatarURL ||
        profile?.attributes?.gravatarURL
    )
}
