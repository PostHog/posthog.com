export type Question = {
    id: string
    permalink: string
    published: boolean
    subject: string
    topics: {
        topic: {
            id: string
            label: string
        }
    }[]
    profile: {
        id: string
        avatar: string
        first_name: string
        last_name: string
    }
    replies: {
        id: string
        body: string
        published: boolean
        profile: {
            id: string
            avatar: string
        }
        created_at: string
    }[]
}
