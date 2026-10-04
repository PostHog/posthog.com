import pipelines from '@data/data-pipelines-nav.json'

type Pipeline = { slug: string; name: string; type: string; status?: string }

export function getDataPipelinesNav({ type }: { type?: string }): { url: string; name: string }[] {
    return (pipelines as Pipeline[])
        .filter((node) => (type ? node.type === type : true) && node.status !== 'coming_soon')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((node) => ({
            url: `/docs/cdp/${type}s/${node.slug}`,
            name: node.name,
        }))
}

export default getDataPipelinesNav
