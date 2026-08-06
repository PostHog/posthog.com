// Host for client-side Squeak/Strapi calls (auth + the authenticated session).
// Override via GATSBY_SQUEAK_AUTH_HOST — e.g. a local Strapi instance — for testing;
// defaults to the normal API host so prod and other devs are unaffected. Note:
// build-time sourcing (gatsby-source-squeak) uses GATSBY_SQUEAK_API_HOST directly and
// is intentionally NOT affected by this, so it stays on the full-data cloud backend.
export const SQUEAK_HOST = process.env.GATSBY_SQUEAK_AUTH_HOST || process.env.GATSBY_SQUEAK_API_HOST

// Strapi helper types
export type StrapiResult<T> = StrapiData<T> &
    StrapiMeta & {
        pinnedQuestions?: StrapiRecord<QuestionData>[]
    }

export type StrapiMeta = {
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

// Maybe rename this StrapiRelationData?
export type StrapiData<T> = {
    data: T extends Array<any> ? StrapiRecord<T[number]>[] : StrapiRecord<T>
}

export type StrapiRecord<T> = {
    id: number
    attributes: T
}

export type QuestionData = {
    subject: string
    permalink: string
    resolved: boolean
    body: string
    page: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<ProfileData>
    replies?: StrapiData<ReplyData[]>
    topics?: StrapiData<TopicData[]>
    numReplies: number | null
    archived: boolean
    activeAt: string
    pinnedTopics: StrapiData<TopicData[]>
    slugs: { is: number; slug: string }[]
    escalated: boolean
    zendeskTicketID: number
    autoLinkedToZendesk: boolean
}

export type AvatarData = {
    url: string
}

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
    avatar?: StrapiData<AvatarData>
    gravatarURL: string | null
    questionSubscriptions: StrapiData<QuestionData[]>
    user?: StrapiData<UserData>
    topicSubscriptions: StrapiData<TopicData[]>
    pronouns?: string | null
    country: string | null
    amaEnabled: boolean | null
    teams?: {
        id: number
    }[]
    height: number | null
    bookmarks: {
        url: string
        title: string
        description: string
        notes: string
    }[]
    tShirt?: {
        id?: number
        fit: 'unisex' | 'female' | null
        size: 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | null
        additionalInfo: string | null
    } | null
    reputation?: number
}

export type UserData = {
    email: string
    distinctId: string | null
}

export type ProfileQuestionsData = {
    questions: StrapiData<QuestionData[]>
}

export type ReplyData = {
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<
        Pick<ProfileData, 'firstName' | 'lastName' | 'avatar' | 'gravatarURL' | 'teams' | 'pronouns' | 'reputation'>
    >
    upvoteProfiles: StrapiData<ProfileData[]>
    downvoteProfiles: StrapiData<ProfileData[]>
}

export type TopicData = {
    label: string
    slug: string
}
