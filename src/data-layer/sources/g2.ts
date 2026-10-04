// G2Review: PostHog's reviews on G2, following the API's `links.next` pages.
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson } from '../http'
import type { G2ReviewNode, Without } from '../types'

/* G2 API (JSON:API) */

export type G2SurveyResponse = Without<G2ReviewNode, 'id'> & { id: string }

export interface G2SurveyResponsesPage {
    data?: G2SurveyResponse[]
    links?: { next?: string | null }
}

const review = (
    id: string,
    title: string,
    rating: number,
    submitted: string,
    love: string,
    hate: string
): G2ReviewNode => ({
    id: `g2-review-${id}`,
    type: 'survey_responses',
    attributes: {
        title,
        star_rating: rating,
        submitted_at: submitted,
        comment_answers: {
            love: { value: love },
            hate: { value: hate },
            benefits: {
                value: 'One tool for analytics, replays, flags, and experiments, so the team stops switching tabs.',
            },
        },
    },
})

export const g2ReviewSource: Source = {
    name: 'g2-reviews',
    types: ['G2Review'],
    requires: ['G2_API_KEY'],
    async fetch() {
        const reviews: G2SurveyResponse[] = []
        let url: string | null | undefined = 'https://data.g2.com/api/v1/survey-responses?page[size]=100'
        while (url) {
            const page: G2SurveyResponsesPage = await fetchJson<G2SurveyResponsesPage>(url, {
                headers: { Authorization: `Token ${env('G2_API_KEY')}` },
            })
            reviews.push(...(page.data ?? []))
            url = page.links?.next
        }
        const nodes: G2ReviewNode[] = reviews.map((item) => ({ ...item, id: `g2-review-${item.id}` }))
        return { G2Review: nodes }
    },
    fake: () => ({
        G2Review: [
            review(
                'fake-1',
                'Everything we need to understand our users',
                5,
                '2026-05-12T09:30:00Z',
                'Session replays linked to events make debugging much faster.',
                'There are so many features that it takes a while to learn them all.'
            ),
            review(
                'fake-2',
                'Great for product engineers',
                4.5,
                '2026-04-03T16:05:00Z',
                'Feature flags and experiments live next to the analytics.',
                'Some advanced insights need SQL.'
            ),
        ],
    }),
}
