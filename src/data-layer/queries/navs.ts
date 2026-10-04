// Navigation data: the data pipeline and source lists injected into the docs menu.
import { getContent } from '../content'
import { nodes } from '../index'

export const queries = {
    // Pipelines with no hand-written doc page (those get a generated page under /docs/cdp).
    'data-pipelines-nav': () => {
        const documented = new Set(
            getContent()
                .map((node) => node.frontmatter.templateId)
                .flat()
                .filter(Boolean)
        )
        return nodes('PostHogPipeline')
            .filter((pipeline) => !documented.has(pipeline.pipelineId))
            .map(({ slug, name, type, status }) => ({ slug, name, type, status }))
    },
    'sources-nav': () =>
        nodes('PostHogSource')
            .filter((source) => source.unreleased !== true)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ slug, name, beta }) => ({ slug, name, beta })),
}
