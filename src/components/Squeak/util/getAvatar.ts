import { ProfileData, StrapiRecord } from 'lib/strapi'

export default function getAvatarURL(profile: StrapiRecord<ProfileData> | undefined) {
    return profile?.attributes?.avatar?.data?.attributes?.url || profile?.attributes?.gravatarURL
}
