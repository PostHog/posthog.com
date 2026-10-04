import questionPagesJson from '@data/content-question-pages.json'
import type { QuestionPages } from '~/data-layer/queries/content'

export interface ContentNode {
    fields: {
        slug: string
    }
    rawBody: string
    frontmatter?: {
        title: string
        description?: string
    }
}

export interface ContentData {
    allMdx: {
        nodes: ContentNode[]
    }
}

/**
 * Content for product pages' QuestionsSlide component: the tutorials, product engineer and founder
 * posts, and docs pages that product questions link to.
 */
export function useContentData(): ContentData {
    return { allMdx: { nodes: questionPagesJson as QuestionPages } }
}
