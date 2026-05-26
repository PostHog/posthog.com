/**
 * Graph construction and scoring for the Product Galaxy.
 *
 * Pure functions over the data in `src/hooks/productData/relationships.ts`.
 * Everything here is specific to this app — the recommendation algorithm,
 * the adjacency map, the BFS-driven layout substrate — so it lives next to
 * its only consumer (`useGalaxyState.ts`) instead of polluting the shared
 * data module.
 */
import {
    EDGE_DIRECTED,
    EDGE_WEIGHTS,
    MAIN_PRODUCT_HANDLES,
    normalizeHandle,
    productEdges,
} from 'hooks/productData/relationships'
import type { EdgeType, ProductEdge, ProductHandle } from 'hooks/productData/relationships'

export interface GalaxyNode {
    handle: ProductHandle
    /** Degree in the undirected sense (number of distinct connected products). */
    degree: number
}

export interface GalaxyEdge extends ProductEdge {
    /** Numeric weight derived from EDGE_WEIGHTS, used by force layout and scoring. */
    weight: number
}

export interface ProductGraph {
    nodes: GalaxyNode[]
    /** Deduped edges. For an unordered pair (A, B) the highest-weight type is kept; directional types retain their direction. */
    edges: GalaxyEdge[]
    /** handle -> connected edges (both directions). */
    adjacency: Map<ProductHandle, GalaxyEdge[]>
}

/**
 * Build the graph for a given product universe. Filters out edges that reference
 * products outside `validHandles`.
 */
export function buildGraph(validHandles: ReadonlyArray<ProductHandle> = MAIN_PRODUCT_HANDLES): ProductGraph {
    const validSet = new Set(validHandles)
    const seen = new Map<string, GalaxyEdge>()

    for (const raw of productEdges) {
        // `worksWith` is deprecated; it's kept on `productEdges` only so the legacy
        // `ProductSidebar` "Works with..." panel can still derive content from it.
        // It deliberately does not contribute to the Product Galaxy graph.
        if (raw.type === 'worksWith') continue

        const from = normalizeHandle(raw.from)
        const to = normalizeHandle(raw.to)
        if (!from || !to) {
            if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn(`[relationships] dropping edge with unresolved ref:`, raw)
            }
            continue
        }
        if (!validSet.has(from) || !validSet.has(to)) continue
        if (from === to) continue

        const directed = EDGE_DIRECTED[raw.type]
        const key = directed ? `${raw.type}:${from}->${to}` : `${raw.type}:${[from, to].sort().join('-')}`

        const existing = seen.get(key)
        const candidate: GalaxyEdge = {
            ...raw,
            from,
            to,
            weight: EDGE_WEIGHTS[raw.type],
        }
        if (!existing || EDGE_WEIGHTS[candidate.type] > existing.weight) {
            seen.set(key, candidate)
        }
    }

    const edges = Array.from(seen.values())

    const adjacency = new Map<ProductHandle, GalaxyEdge[]>()
    for (const handle of validHandles) adjacency.set(handle, [])
    for (const edge of edges) {
        adjacency.get(edge.from)?.push(edge)
        adjacency.get(edge.to)?.push(edge)
    }

    const nodes: GalaxyNode[] = validHandles.map((handle) => {
        const partners = new Set<ProductHandle>()
        for (const edge of adjacency.get(handle) ?? []) {
            partners.add(edge.from === handle ? edge.to : edge.from)
        }
        return { handle, degree: partners.size }
    })

    return { nodes, edges, adjacency }
}

/**
 * Score complementary products for a given selection. Higher score = stronger fit.
 * Empty selection returns the highest-degree products as "start here" defaults.
 */
export interface SuggestionContributor {
    /** A fleet product that justifies this recommendation. */
    from: ProductHandle
    type: EdgeType
    /** The pairsWith marketing copy explaining the connection, when available. */
    description?: string
}

export interface Suggestion {
    handle: ProductHandle
    score: number
    /** Which selected products contributed to this score, and why. */
    contributors: SuggestionContributor[]
}

export function recommend(
    selected: ReadonlySet<ProductHandle> | ReadonlyArray<ProductHandle>,
    graph: ProductGraph,
    k = 4
): Suggestion[] {
    const selectedSet = selected instanceof Set ? selected : new Set(selected)

    if (selectedSet.size === 0) {
        return [...graph.nodes]
            .sort((a, b) => b.degree - a.degree)
            .slice(0, k)
            .map((n) => ({ handle: n.handle, score: n.degree, contributors: [] }))
    }

    const scored: Suggestion[] = []
    for (const node of graph.nodes) {
        if (selectedSet.has(node.handle)) continue
        let score = 0
        const contributors: SuggestionContributor[] = []
        for (const edge of graph.adjacency.get(node.handle) ?? []) {
            const other = edge.from === node.handle ? edge.to : edge.from
            if (selectedSet.has(other)) {
                score += edge.weight
                contributors.push({ from: other, type: edge.type, description: edge.description })
            }
        }
        if (score > 0) {
            scored.push({ handle: node.handle, score, contributors })
        }
    }

    scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        const aDegree = graph.nodes.find((n) => n.handle === a.handle)?.degree ?? 0
        const bDegree = graph.nodes.find((n) => n.handle === b.handle)?.degree ?? 0
        return bDegree - aDegree
    })

    return scored.slice(0, k)
}
