import { ProfileData, StrapiRecord } from 'lib/strapi'

export default function getAvatarURL(profile: StrapiRecord<ProfileData> | undefined) {
    return profile?.avatar?.data?.attributes?.url || profile?.gravatarURL
}
