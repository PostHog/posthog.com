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
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<ProfileData>
    replies?: StrapiData<ReplyData[]>
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
}

export type ReplyData = {
    // TODO: Populate profile data
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}
