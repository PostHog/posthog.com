interface SpotlightSource {
    name: string
    record: string
    profileFacts: string[]
}

export const SPOTLIGHT_SOURCES: SpotlightSource[] = [
    {
        name: 'Stripe',
        record: 'payments and refunds',
        profileFacts: ['Paid $49.00 for Pro', 'Upgraded to Pro monthly', 'Invoice #1042 paid'],
    },
    {
        name: 'Postgres',
        record: 'your app tables',
        profileFacts: ['users.plan = pro', 'workspaces.seats = 4', 'projects.count = 3'],
    },
    {
        name: 'Google Ads',
        record: 'campaigns and spend',
        profileFacts: ['Clicked "Product analytics for devs"', 'Searched "session replay tool"'],
    },
    {
        name: 'Meta Ads',
        record: 'ad views and spend',
        profileFacts: ['Saw "Ship faster with flags"', 'Clicked the Hogzilla ad'],
    },
    {
        name: 'GitHub',
        record: 'issues and PRs',
        profileFacts: ['Opened issue #482', 'Commented on PR #1931'],
    },
]
