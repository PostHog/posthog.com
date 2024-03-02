// Strapi helper types
export type StrapiResult<T> = StrapiData<T> & StrapiMeta

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
    repliesUnread: { id: number }[]
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
    profile?: StrapiData<Pick<ProfileData, 'firstName' | 'lastName' | 'avatar' | 'gravatarURL' | 'teams' | 'pronouns'>>
}

export type TopicData = {
    label: string
    slug: string
}
