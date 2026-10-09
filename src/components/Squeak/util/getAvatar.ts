import { ProfileData, StrapiRecord } from 'lib/strapi'

// Default avatars for profiles with no uploaded photo or Gravatar (from the Brand Book "hoggies" page)
const HOG_AVATARS = [
    'sleepy_3f343087ea',
    'sailor_b967b1dc36',
    'scientist_0fe8799662',
    'reading_ad582571cc',
    'chef_76064288a4',
    'beaker_6b281f8776',
    'gardener_0064efeeaf',
    'surfer_db4e770029',
    'dj_317e8b4aad',
    'robot_df7cb8d0f1',
    'hipster_9564060503',
    'superhero_8b4a14bf68',
    'party_f5a2e556a4',
    'coffee_cup_7ad24b8cda',
    'heart_be31e430ba',
    'honey_2cbd2b4fa9',
    'rocket_79e9512e13',
    'namaste_cb626b3dba',
    'research_105d58ab58',
    'wizard_96cc7a41e0',
].map((hog) => `https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/community_avatar_hog_${hog}.png`)

export default function getAvatarURL(profile: StrapiRecord<Pick<ProfileData, 'avatar' | 'gravatarURL'>> | undefined) {
    return (
        profile?.avatar?.url ||
        profile?.avatar?.data?.attributes?.url ||
        profile?.attributes?.avatar?.data?.attributes?.url ||
        profile?.gravatarURL ||
        profile?.attributes?.gravatarURL ||
        // Pick by profile ID so each person always gets the same hog
        (profile?.id ? HOG_AVATARS[profile.id % HOG_AVATARS.length] : undefined)
    )
}
