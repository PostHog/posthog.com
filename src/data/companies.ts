export type CompanyMetadata = {
    name: string
    ashbyUrl: string
    engineersDecideWhatToBuild: 'True' | 'False' | 'To a certain extent' | 'Unclear'
}

export const COMPANIES: CompanyMetadata[] = [
    {
        name: 'Supabase',
        ashbyUrl: 'supabase',
        engineersDecideWhatToBuild: 'Unclear',
    },
    {
        name: 'PostHog',
        ashbyUrl: 'posthog',
        engineersDecideWhatToBuild: 'Yes',
    },
    {
        name: 'MonarchMoney',
        ashbyUrl: 'monarchmoney',
        engineersDecideWhatToBuild: 'Unclear',
    },
    {
        name: 'Vercel',
        ashbyUrl: 'vercel',
        engineersDecideWhatToBuild: 'Unclear',
    },
]
