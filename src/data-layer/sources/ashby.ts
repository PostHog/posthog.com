// Ashby job postings.
//
// Ids stay Ashby's own UUIDs: the job page sends the posting id to Ashby when someone applies.
// AshbyJobPosting.parent is `{ id, customFields }` of its AshbyJob (null when the job is not open), so
// queries keep reading `parent.customFields`. Custom field values are resolved to their labels as the
// `@customFieldValue` resolver did: a list becomes a JSON string of labels, anything else a string.
import { parse } from 'node-html-parser'
import slugify from 'slugify'
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson, mapLimit } from '../http'
import type {
    AshbyCustomField,
    AshbyJobCustomField,
    AshbyJobNode,
    AshbyJobPosting,
    AshbyJobPostingInfo,
    AshbyJobPostingNode,
    AshbyTableOfContentsEntry,
} from '../types'

/* Ashby API */

export interface AshbyResponse<T> {
    success: boolean
    results: T
    errors?: unknown
}

/** A job from job.list. Custom field values are raw: a selectable value, a list of them, or a scalar. */
export interface AshbyJob {
    id: string
    title: string
    status: string
    customFields?: { id: string; title: string; value: unknown; [key: string]: unknown }[]
    [key: string]: unknown
}

export interface AshbyLocation {
    id: string
    name: string
    [key: string]: unknown
}

async function ashby<T>(method: string, body?: unknown): Promise<T> {
    const { success, results, errors } = await fetchJson<AshbyResponse<T>>(`https://api.ashbyhq.com/${method}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${env('ASHBY_API_KEY')}:`).toString('base64')}`,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (success === false) throw new Error(`Ashby ${method} failed: ${JSON.stringify(errors)}`)
    return results
}

function resolveCustomFields(job: AshbyJob, customFields: Map<string, AshbyCustomField>): AshbyJobCustomField[] {
    return (job.customFields ?? []).map((field) => {
        const label = (value: unknown) =>
            customFields.get(field.id)?.selectableValues?.find((option) => option.value === value)?.label ?? value
        const value = Array.isArray(field.value)
            ? JSON.stringify(field.value.map(label))
            : field.value === null || field.value === undefined
              ? null
              : String(label(field.value))
        return { ...field, value }
    })
}

/** Wraps each h2 section of the description in an open <details>, drops "Benefits", and builds a TOC. */
function jobPostingHtml(descriptionHtml: string) {
    let html = descriptionHtml
    const tableOfContents: AshbyTableOfContentsEntry[] = []
    if (html.includes('<h2>')) {
        const root = parse(
            `<section><details open><summary><h2>${html
                .split('<h2>')
                .slice(1)
                .join('</details><details open><summary><h2>')
                .split('</h2>')
                .join('</h2></summary>')}</summary></details></section>`
        )
        for (const details of root.querySelectorAll('details')) {
            const heading = details.querySelector('h2')
            if (!heading) continue
            const text = heading.text
            if (text.toLowerCase() === 'benefits') {
                details.remove()
            } else {
                const id = slugify(text, { lower: true })
                tableOfContents.push({ value: text, url: id, depth: 0 })
                heading.setAttribute('id', id)
            }
        }
        html = root.toString()
    }
    return { html, tableOfContents }
}

function postingFields(posting: AshbyJobPosting & { info: AshbyJobPostingInfo }, locations: string[]) {
    const title = posting.title.replace(' (Remote)', '')
    return {
        title,
        slug: `/careers/${slugify(title, { lower: true })}`,
        locations,
        ...(posting.info.descriptionHtml ? jobPostingHtml(posting.info.descriptionHtml) : {}),
    }
}

export const ashbySource: Source = {
    name: 'ashby',
    types: ['AshbyCustomField', 'AshbyJob', 'AshbyJobPosting'],
    requires: ['ASHBY_API_KEY'],
    async fetch() {
        const [customFieldList, jobList, postingList] = await Promise.all([
            ashby<AshbyCustomField[]>('customField.list'),
            ashby<AshbyJob[]>('job.list', { status: ['Open'] }),
            ashby<AshbyJobPosting[]>('jobPosting.list', { listedOnly: true }),
        ])
        const customFields = new Map(customFieldList.map((field) => [field.id, field]))
        const jobs: AshbyJobNode[] = jobList.map((job) => ({
            ...job,
            customFields: resolveCustomFields(job, customFields),
        }))
        const jobsById = new Map(jobs.map((job) => [job.id, job]))

        const locationNames = new Map<string, Promise<string | null>>()
        const locationName = (id: string) => {
            if (!locationNames.has(id)) {
                locationNames.set(
                    id,
                    ashby<AshbyLocation>('location.info', { locationId: id })
                        .then((location) => location?.name ?? null)
                        .catch((error: Error) => {
                            console.warn(`[data-layer] Ashby location ${id} failed: ${error.message}`)
                            return null
                        })
                )
            }
            return locationNames.get(id)!
        }

        const postings: AshbyJobPostingNode[] = await mapLimit(postingList, 8, async (posting) => {
            const info = await ashby<AshbyJobPostingInfo>('jobPosting.info', { jobPostingId: posting.id })
            const { primaryLocationId, secondaryLocationIds = [] } = posting.locationIds ?? {}
            const ids = [primaryLocationId, ...secondaryLocationIds].filter((id): id is string => !!id)
            const locations = (await Promise.all(ids.map(locationName)))
                .filter((name): name is string => !!name)
                .map((name) => name.replace(/\(|\)|remote/gi, '').trim())
                .filter(Boolean)
            const job = jobsById.get(posting.jobId)
            const withInfo = { ...posting, info }
            return {
                ...withInfo,
                parent: job ? { id: job.id, customFields: job.customFields } : null,
                fields: postingFields(withInfo, locations),
            }
        })
        return { AshbyCustomField: customFieldList, AshbyJob: jobs, AshbyJobPosting: postings }
    },
    fake() {
        const description = (role: string) =>
            `<p>We're looking for a ${role} to join one of our small teams.</p><h2>What you'll be doing</h2><ul><li>Shipping features to thousands of customers</li><li>Talking to users</li></ul><h2>Requirements</h2><ul><li>You have shipped real products</li></ul><h2>Benefits</h2><ul><li>Generous equity</li></ul>`
        const roles = [
            {
                title: 'Product Engineer',
                department: 'Engineering',
                grouping: 'Engineering',
                teams: ['Product Analytics', 'Workflows'],
            },
            {
                title: 'Site Reliability Engineer',
                department: 'Engineering',
                grouping: 'Engineering',
                teams: ['Web Analytics'],
            },
            {
                title: 'Technical Account Executive',
                department: 'Sales',
                grouping: 'Sales',
                teams: ['New Business Sales'],
            },
        ]
        const jobs: AshbyJobNode[] = roles.map((role, i) => ({
            id: `fake-ashby-job-${i + 1}`,
            title: role.title,
            status: 'Open',
            employmentType: 'FullTime',
            customFields: [
                { id: 'fake-field-teams', title: 'Teams', value: JSON.stringify(role.teams), isPrivate: false },
                { id: 'fake-field-grouping', title: 'Role grouping', value: role.grouping, isPrivate: false },
                { id: 'fake-field-timezones', title: 'Timezone(s)', value: 'GMT -8 to GMT +2', isPrivate: false },
                { id: 'fake-field-salary', title: 'Salary', value: role.title, isPrivate: false },
                { id: 'fake-field-mission', title: 'Mission & objectives', value: 'true', isPrivate: false },
            ],
        }))
        const formField = (title: string, type: string, path: string) => ({
            isRequired: true,
            descriptionPlain: null,
            field: { type, title, isNullable: false, path, selectableValues: null },
        })
        const postings: AshbyJobPostingNode[] = roles.map((role, i) => {
            const id = `fake-ashby-posting-${i + 1}`
            const posting = {
                id,
                title: role.title,
                jobId: jobs[i].id,
                departmentName: role.department,
                teamName: role.teams[0],
                locationName: 'Remote',
                locationIds: { primaryLocationId: 'fake-location-1', secondaryLocationIds: [] },
                workplaceType: 'Remote',
                employmentType: 'FullTime',
                isListed: true,
                publishedDate: `2026-0${i + 1}-15`,
                externalLink: `https://jobs.ashbyhq.com/posthog/${id}`,
                applyLink: `https://jobs.ashbyhq.com/posthog/${id}/application`,
                info: {
                    id,
                    title: role.title,
                    descriptionHtml: description(role.title),
                    applicationFormDefinition: {
                        sections: [
                            {
                                fields: [
                                    formField('Name', 'String', '_systemfield_name'),
                                    formField('Email', 'Email', '_systemfield_email'),
                                ],
                            },
                        ],
                    },
                },
            }
            return {
                ...posting,
                parent: { id: jobs[i].id, customFields: jobs[i].customFields },
                fields: postingFields(posting, ['Americas', 'Europe']),
            }
        })
        return { AshbyCustomField: [], AshbyJob: jobs, AshbyJobPosting: postings }
    },
}
