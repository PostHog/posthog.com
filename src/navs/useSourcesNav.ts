import sources from '@data/sources-nav.json'
import { SELF_HOSTED_SOURCES } from '../constants/sources'

type SourceNavItem = { slug: string; name: string; beta?: boolean }

export function getSourcesNav(basePath = '/docs/data-warehouse/sources'): { url?: string; name: string }[] {
    const managed = (sources as SourceNavItem[]).map((node) => ({
        url: `${basePath}/${node.slug}`,
        name: node.name,
        ...(node.beta && {
            badge: {
                title: 'Beta',
                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
        }),
    }))

    const selfManaged = SELF_HOSTED_SOURCES.map((s) => ({
        name: s.name,
        url: `${basePath}/${s.slug}`,
    }))

    return [...managed, { name: 'Self-managed' }, ...selfManaged]
}

export default getSourcesNav
