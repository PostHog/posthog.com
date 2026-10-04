// SDK reference pages (/docs/references/*), from the SdkReferences nodes: one page per SDK version
// (the `latest` row at /docs/references/<sdk>, other rows at /docs/references/<sdk>-<version>),
// and one page per documented type under each.
import { nodes } from '../../data-layer'
import type { SdkReferencesNode } from '../../data-layer/types'
import { isLatestVersion, typeHasPage } from '../../components/SdkReferences/utils'
import type { SdkReferenceProps } from '../../templates/sdk/SdkReference'
import type { SdkTypeProps } from '../../templates/sdk/SdkType'

const BASE = '/docs/references'

/** The URL segment of a row: the `latest` row is served unversioned, every other row keeps its id. */
const slugPrefixFor = (node: SdkReferencesNode) => (isLatestVersion(node.version) ? node.referenceId : node.id)

/** Names of the types with a page, which the reference crosslinks to. Each row links its own types. */
const linkedTypes = (node: SdkReferencesNode): string[] =>
    (node.types ?? [])
        .filter(typeHasPage)
        .map(({ name }) => name)
        .filter((name) => name && name !== 'null')

/** Every published version of each SDK, `latest` first, then newest to oldest. */
function versionsBySdk(references: SdkReferencesNode[]): Map<string, string[]> {
    const versions = new Map<string, string[]>()
    for (const node of references)
        versions.set(node.referenceId, [...(versions.get(node.referenceId) ?? []), node.version])
    for (const list of versions.values()) {
        list.sort((a, b) => {
            if (a === 'latest') return -1
            if (b === 'latest') return 1
            return b.localeCompare(a, undefined, { numeric: true })
        })
    }
    return versions
}

export function sdkReferencePages(): { path: string; props: SdkReferenceProps }[] {
    const references = nodes<SdkReferencesNode>('SdkReferences')
    const versions = versionsBySdk(references)
    return references.map((node) => {
        // The page renders (and exports as Markdown) the reference without its type list.
        const { types: _types, ...fullReference } = node
        const slugPrefix = slugPrefixFor(node)
        return {
            path: `${BASE}/${slugPrefix}`,
            props: {
                fullReference: fullReference as unknown as SdkReferenceProps['fullReference'],
                slugPrefix,
                types: linkedTypes(node),
                versions: versions.get(node.referenceId) ?? [],
            },
        }
    })
}

export function sdkTypePages(): { path: string; props: SdkTypeProps }[] {
    const pages = nodes<SdkReferencesNode>('SdkReferences').flatMap((node) => {
        const slugPrefix = slugPrefixFor(node)
        const types = linkedTypes(node)
        return (node.types ?? []).filter(typeHasPage).map((type) => ({
            path: `${BASE}/${slugPrefix}/types/${type.id}`,
            props: {
                typeData: type as unknown as SdkTypeProps['typeData'],
                version: node.version,
                referenceId: node.referenceId,
                slugPrefix,
                types,
            },
        }))
    })
    // A type can be listed twice in one reference. The last one wins.
    return [...new Map(pages.map((page) => [page.path, page])).values()]
}

/** URL path of every SDK reference and type page. */
export const sdkReferencePaths = (): Set<string> =>
    new Set([...sdkReferencePages(), ...sdkTypePages()].map(({ path }) => path))
