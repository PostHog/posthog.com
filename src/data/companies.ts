export type EngineerDecision = 'Yes' | 'No' | 'To some extent' | 'Unclear'
export type BooleanFilter = 'Yes' | 'No' | 'Unclear'

export type CompanyMetadata = {
    name: string
    ashbyUrl: string
    engineersDecideWhatToBuild: EngineerDecision
    remoteOnly: BooleanFilter
    exoticOffsites: BooleanFilter
    meetingFreeDays: BooleanFilter
    noProductRequirementDocs: BooleanFilter
    highEngineerRatio: BooleanFilter
    posthogCustomer: BooleanFilter
    hasDeadlines: BooleanFilter
}

export const COMPANIES: CompanyMetadata[] = [
    {
        name: 'Supabase',
        ashbyUrl: 'supabase',
        engineersDecideWhatToBuild: 'Yes',
        remoteOnly: 'Yes',
        exoticOffsites: 'Yes',
        meetingFreeDays: 'Unclear',
        noProductRequirementDocs: 'Unclear',
        highEngineerRatio: 'Unclear',
        posthogCustomer: 'Yes',
        hasDeadlines: 'Unclear',
    },
    {
        name: 'PostHog',
        ashbyUrl: 'posthog',
        engineersDecideWhatToBuild: 'True',
        remoteOnly: 'True',
        exoticOffsites: 'True',
        meetingFreeDays: 'True',
        noProductRequirementDocs: 'True',
        highEngineerRatio: 'True',
        posthogCustomer: 'True',
        hasDeadlines: 'False',
    },
    {
        name: 'MonarchMoney',
        ashbyUrl: 'monarchmoney',
        engineersDecideWhatToBuild: 'Unclear',
        meetingFreeDays: 'Unclear',
        noProductRequirementDocs: 'Unclear',
        highEngineerRatio: 'Unclear',
        posthogCustomer: 'Unclear',
        hasDeadlines: 'Unclear',
    },
    {
        name: 'Vercel',
        ashbyUrl: 'vercel',
        engineersDecideWhatToBuild: 'Unclear',
        remoteOnly: 'Unclear',
        exoticOffsites: 'Unclear',
        meetingFreeDays: 'Unclear',
        noProductRequirementDocs: 'Unclear',
        highEngineerRatio: 'Unclear',
        posthogCustomer: 'Unclear',
        hasDeadlines: 'Unclear',
    },
]
