// Job pages (/careers/<slug>): one per Ashby job posting.
import slugify from 'slugify'
import { nodes } from '../../data-layer'
import { contentBySlug } from '../../data-layer/content'
import { env } from '../../data-layer/env'
import type { AshbyJobCustomField, AshbyJobPostingNode, SqueakTeamNode } from '../../data-layer/types'

export interface GitHubIssue {
    url: string
    number: number
    title: string
    labels?: { name: string; url: string }[]
}

type CustomFields = { customFields: Pick<AshbyJobCustomField, 'title' | 'value'>[] } | null

export interface JobProps {
    posting: {
        id: string
        departmentName: string
        info: Pick<AshbyJobPostingNode['info'], 'descriptionHtml' | 'applicationFormDefinition'>
        parent: CustomFields
        fields: Required<AshbyJobPostingNode['fields']>
    }
    /** Every posting, for the sidebar. */
    allJobPostings: { departmentName: string; fields: { title: string; slug: string }; parent: CustomFields }[]
    /** The first team's mission and objectives (contents/teams/<team>/{mission,objectives}.mdx). */
    mission: { body: string } | null
    objectives: { body: string } | null
    teams: ReturnType<typeof team>[]
    /** The issues listed in the job's "Issues" custom field. Fetched only when GITHUB_API_KEY is set. */
    gitHubIssues: GitHubIssue[]
}

const customFields = (posting: AshbyJobPostingNode): CustomFields =>
    posting.parent ? { customFields: posting.parent.customFields.map(({ title, value }) => ({ title, value })) } : null

const field = (posting: AshbyJobPostingNode, title: string) =>
    posting.parent?.customFields.find((custom) => custom.title === title)?.value ?? undefined

const url = (media: { data?: { attributes?: { url?: string } } | null } | null | undefined) =>
    media?.data?.attributes?.url ? { data: { attributes: { url: media.data.attributes.url } } } : null

/** A team as the sidebar shows it: its crest and its members. */
function team(node: SqueakTeamNode) {
    const { id, name, slug, description, crest, crestOptions, leadProfiles, profiles } = node
    return {
        id,
        name,
        slug,
        description,
        crest: url(crest),
        crestOptions,
        leadProfiles: { data: leadProfiles.data.map(({ id }) => ({ id })) },
        profiles: {
            data: profiles.data.map(({ id, attributes }) => ({
                id,
                attributes: {
                    country: attributes.country,
                    firstName: attributes.firstName,
                    lastName: attributes.lastName,
                    pineappleOnPizza: attributes.pineappleOnPizza,
                    location: attributes.location,
                    color: attributes.color,
                    companyRole: attributes.companyRole,
                    leadTeams: {
                        data: (attributes.leadTeams?.data ?? []).map(({ attributes }) => ({
                            attributes: { name: attributes?.name },
                        })),
                    },
                    avatar: url(attributes.avatar),
                },
            })),
        },
    }
}

async function gitHubIssues(posting: AshbyJobPostingNode): Promise<GitHubIssue[]> {
    const token = env('GITHUB_API_KEY')
    const issues = field(posting, 'Issues')?.split(',').filter(Boolean)
    const repo = field(posting, 'Repo')
    if (!token || !issues?.length) return []
    return Promise.all(
        issues.map(async (issue) => {
            const response = await fetch(`https://api.github.com/repos/${repo}/issues/${issue.trim()}`, {
                headers: { Authorization: `token ${token}` },
            })
            const { html_url, number, title, labels } = await response.json()
            return { url: html_url, number, title, labels }
        })
    )
}

const body = (slug: string) => {
    const node = contentBySlug(slug)
    return node ? { body: node.body } : null
}

export async function jobPages() {
    const postings = nodes<AshbyJobPostingNode>('AshbyJobPosting')
    const squeakTeams = nodes<SqueakTeamNode>('SqueakTeam')
    const allJobPostings = postings.map((posting) => ({
        departmentName: posting.departmentName,
        fields: { title: posting.fields.title, slug: posting.fields.slug },
        parent: customFields(posting),
    }))
    return Promise.all(
        postings.map(async (posting) => {
            const teamNames: string[] = JSON.parse(field(posting, 'Teams') || '[]')
            const teamSlug = slugify(teamNames[0] || '', { lower: true })
            const props: JobProps = {
                posting: {
                    id: posting.id,
                    departmentName: posting.departmentName,
                    info: {
                        descriptionHtml: posting.info.descriptionHtml,
                        applicationFormDefinition: posting.info.applicationFormDefinition,
                    },
                    parent: customFields(posting),
                    fields: { html: '', tableOfContents: [], ...posting.fields },
                },
                allJobPostings,
                mission: body(`/teams/${teamSlug}/mission`),
                objectives: body(`/teams/${teamSlug}/objectives`),
                teams: squeakTeams.filter((node) => teamNames.includes(node.name)).map(team),
                gitHubIssues: await gitHubIssues(posting),
            }
            return { params: { slug: posting.fields.slug.replace(/^\/careers\//, '') }, props }
        })
    )
}
