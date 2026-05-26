import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import type { ForceGraphMethods } from 'react-force-graph-3d'
import type { ProductHandle } from 'hooks/productData/relationships'
import type { ProductGraph } from './graph'
import { buildNodeObject } from './nodeMesh'
import { getHudAccent, getProductColor, resolveTwHex, resolveTwRgba } from './colors'

export interface GalaxyCanvasProps {
    graph: ProductGraph
    products: Array<{ handle: string; name: string; color?: string }>
    selected: ReadonlySet<ProductHandle>
    hovered: ProductHandle | null
    onNodeHover: (handle: ProductHandle | null) => void
    /** Toggles fleet membership. Replaces the old lock/focus semantics. */
    onNodeClick: (handle: ProductHandle) => void
    width: number
    height: number
}

interface GraphNodeShape {
    id: ProductHandle
    name: string
    colorToken?: string
}

interface GraphLinkShape {
    source: ProductHandle
    target: ProductHandle
    type: string
}

// BFS-depth-driven X position for each node when a fleet is active. Fleet
// nodes (depth 0) cluster on the far left, their direct neighbors hug them,
// 2-hop nodes drift right, and anything 3+ hops or unreachable gets exiled.
// Spread is large so the tiers visually separate even with link springs and
// charge repulsion fighting them.
const DEPTH_TARGET_X: Record<number, number> = {
    0: -150,
    1: -50,
    2: 60,
    3: 180,
}
// Strength = how aggressively the grouping force pulls each node to its X
// target. Tuned so tiers visibly separate without forcing a zoom-out that
// would shrink the labels below legibility.
const GROUPING_STRENGTH = 0.28
// Repulsion strength between every pair of nodes. d3 default is -30; mild
// bump keeps tiers separated without inflating the bounding box.
const CHARGE_STRENGTH = -90
// Anything deeper than 2 (or unreachable from the fleet) is treated as 3.
const FAR_DEPTH = 3

// Camera transition timing and resting positions. Distances are tight enough
// that the labels stay readable; the fleet view leans in rather than pulling
// way out.
const CAMERA_TRANSITION_MS = 1500
const CAMERA_DEFAULT = {
    pos: { x: 0, y: 0, z: 280 },
    lookAt: { x: 0, y: 0, z: 0 },
} as const
// Fleet-active view: shifted right and tilted up slightly so the fleet
// cluster sits on the left third of the screen.
const CAMERA_FLEET = {
    pos: { x: 40, y: 50, z: 360 },
    lookAt: { x: 20, y: 0, z: 0 },
} as const

// Edge color resolvers. Amber (`orange` token) for relevant links, warm gray
// (`light-7`) for inactive / neutral state — resolved at call time against
// the live DOM so the canvas tracks `tailwind.config.js` automatically.
const edgeActive = () => resolveTwRgba('text-orange', 0.9)
const edgeDim = () => resolveTwRgba('text-light-7', 0.12)
const edgeNeutral = () => resolveTwRgba('text-light-7', 0.45)

// Particle color — full amber. Faded-out edges drop their particle count to
// 0 (see `linkDirectionalParticles`), so we don't need a dim variant.
const particleFull = () => resolveTwHex('text-orange')

// Base particle speed (units / tick along the link). three-forcegraph default
// is 0.01; the sign is flipped per-link to flow particles "outward" from the
// fleet (see `linkDirectionalParticleSpeed`).
const PARTICLE_SPEED = 0.008

export default function GalaxyCanvas({
    graph,
    products,
    selected,
    hovered,
    onNodeHover,
    onNodeClick,
    width,
    height,
}: GalaxyCanvasProps): JSX.Element {
    const fgRef = useRef<ForceGraphMethods | undefined>(undefined)

    const productByHandle = useMemo(() => {
        const map = new Map<string, { name: string; color?: string }>()
        for (const p of products) map.set(p.handle, { name: p.name, color: p.color })
        return map
    }, [products])

    // graphData identity MUST be stable across hover/select changes — otherwise
    // react-force-graph re-runs warmup + simulation every time the user moves the
    // mouse. Selection and hover are surfaced through refs + d3 forces instead.
    const data = useMemo(() => {
        const nodes: GraphNodeShape[] = graph.nodes.map((n) => {
            const meta = productByHandle.get(n.handle)
            return {
                id: n.handle,
                name: meta?.name ?? n.handle,
                colorToken: meta?.color,
            }
        })
        const links: GraphLinkShape[] = graph.edges
            .filter((e) => e.type === 'pairsWith')
            .map((edge) => ({
                source: edge.from,
                target: edge.to,
                type: edge.type,
            }))
        return { nodes, links }
    }, [graph, productByHandle])

    const selectedRef = useRef(selected)
    const hoveredRef = useRef(hovered)
    useEffect(() => {
        selectedRef.current = selected
    }, [selected])
    useEffect(() => {
        hoveredRef.current = hovered
    }, [hovered])

    // BFS depth of every node from the current fleet. Recomputed whenever the
    // fleet or graph changes — cheap (16 nodes, ~30 edges) — and read by the
    // grouping force on every tick to decide where to pull each node.
    const depthsRef = useRef<Map<ProductHandle, number>>(new Map())
    useEffect(() => {
        const depths = new Map<ProductHandle, number>()
        if (selected.size === 0) {
            depthsRef.current = depths
            return
        }
        const queue: ProductHandle[] = Array.from(selected)
        for (const handle of queue) depths.set(handle, 0)
        while (queue.length > 0) {
            const current = queue.shift() as ProductHandle
            const currentDepth = depths.get(current) ?? 0
            for (const edge of graph.adjacency.get(current) ?? []) {
                const other = edge.from === current ? edge.to : edge.from
                if (depths.has(other)) continue
                depths.set(other, currentDepth + 1)
                queue.push(other)
            }
        }
        depthsRef.current = depths
    }, [selected, graph])

    // three-forcegraph defers its first `_updateScene` call by a frame, so
    // `state.layout` is briefly undefined right after mount. Calling
    // `d3ReheatSimulation()` during that window flips `engineRunning` to true
    // before `state.layout` exists and the next tick crashes inside
    // `three-forcegraph.layoutTick`. We bail until the grouping force is
    // attached, which signals that the library has finished wiring itself up.
    const [graphReady, setGraphReady] = useState(false)

    // Whenever fleet or hover changes: rebuild node meshes (cheap for 16 nodes)
    // so the selection ring and label colors update without restarting the sim.
    useEffect(() => {
        const fg = fgRef.current
        if (!fg || !graphReady) return
        fg.refresh?.()
    }, [selected, hovered, graphReady])

    useEffect(() => {
        const fg = fgRef.current
        if (!fg || !graphReady) return
        fg.d3ReheatSimulation?.()
    }, [selected, graphReady])

    // Slowly fly the camera so the fleet sits on the left third of the screen
    // when the fleet is active, and back to a centered view when it's empty.
    // Fires after init too, so URL-prefilled fleets land in the angled view.
    useEffect(() => {
        const fg = fgRef.current
        if (!fg || !graphReady) return
        const target = selected.size === 0 ? CAMERA_DEFAULT : CAMERA_FLEET
        fg.cameraPosition?.(target.pos, target.lookAt, CAMERA_TRANSITION_MS)
    }, [selected, graphReady])

    // Install a custom d3 force that pulls each node to an X target based on
    // its BFS distance from the fleet (see `depthsRef`):
    //   - depth 0 (fleet)     → far left, tight cluster
    //   - depth 1 (neighbor)  → hugs the fleet cluster
    //   - depth 2             → drifts to the right
    //   - depth ≥3 / unreachable → exiled far right
    // With an empty fleet the force is a no-op so the layout uses pure d3
    // defaults. Deferred to the next animation frame so three-forcegraph has
    // fully initialised its layout before we attach extra forces.
    useEffect(() => {
        const fg = fgRef.current
        if (!fg) return

        type ForceableNode = { id: ProductHandle; x?: number; vx?: number }
        let internalNodes: ForceableNode[] = []

        const groupingForce = ((alpha: number) => {
            const fleet = selectedRef.current
            if (fleet.size === 0) return
            const depths = depthsRef.current
            for (const node of internalNodes) {
                const raw = depths.get(node.id)
                const depth = raw === undefined ? FAR_DEPTH : Math.min(raw, FAR_DEPTH)
                const target = DEPTH_TARGET_X[depth]
                const dx = target - (node.x ?? 0)
                node.vx = (node.vx ?? 0) + dx * alpha * GROUPING_STRENGTH
            }
        }) as ((alpha: number) => void) & { initialize?: (nodes: ForceableNode[]) => void }

        groupingForce.initialize = (nodes: ForceableNode[]) => {
            internalNodes = nodes
        }

        const raf = requestAnimationFrame(() => {
            // Re-read the ref — the canvas may have unmounted in the same frame.
            const current = fgRef.current
            if (!current) return
            current.d3Force?.('grouping', groupingForce as any)

            // Boost the built-in many-body charge so unconnected nodes and the
            // higher-depth tiers actually drift apart instead of clumping.
            const charge = current.d3Force?.('charge')
            charge?.strength?.(CHARGE_STRENGTH)
            setGraphReady(true)
        })
        return () => {
            cancelAnimationFrame(raf)
            setGraphReady(false)
        }
    }, [])

    // One-shot debug log so we can confirm the canvas mounted and what data it
    // received. If the user sees no logs, the lazy chunk never loaded; if it logs
    // but never says "engine stopped", something is jamming the force simulation.
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.info('[ProductGalaxy] canvas mounted', {
            nodes: data.nodes.length,
            links: data.links.length,
            size: { width, height },
        })
    }, [])

    const nodeThreeObject = useCallback(
        (node) =>
            buildNodeObject({
                handle: node.id,
                name: node.name,
                colorToken: node.colorToken,
                selected: selectedRef.current.has(node.id),
                hovered: hoveredRef.current === node.id,
            }),
        []
    )

    const linkColor = useCallback((link) => {
        const fleet = selectedRef.current
        if (fleet.size === 0) return edgeNeutral()
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source
        const targetId = typeof link.target === 'object' ? link.target.id : link.target
        const relevant = fleet.has(sourceId) || fleet.has(targetId)
        return relevant ? edgeActive() : edgeDim()
    }, [])

    // Particles render on every edge when no fleet is active; once a fleet
    // exists, only edges touching it get particles — faded-out edges go quiet.
    const linkDirectionalParticles = useCallback((link) => {
        const fleet = selectedRef.current
        if (fleet.size === 0) return 2
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source
        const targetId = typeof link.target === 'object' ? link.target.id : link.target
        return fleet.has(sourceId) || fleet.has(targetId) ? 2 : 0
    }, [])

    const linkDirectionalParticleColor = useCallback(() => particleFull(), [])

    // Direction of flow per link. With an empty fleet, particles run
    // source → target — the order each pair was declared in `productEdges`.
    // With a non-empty fleet, particles always flow *outwards* from the fleet:
    // whichever endpoint has the lower BFS depth becomes the effective source.
    // We don't mutate `data` for this (would reset the simulation); instead we
    // flip the sign of `linkDirectionalParticleSpeed` so the same link runs
    // backwards visually.
    const linkDirectionalParticleSpeed = useCallback((link) => {
        const fleet = selectedRef.current
        if (fleet.size === 0) return PARTICLE_SPEED
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source
        const targetId = typeof link.target === 'object' ? link.target.id : link.target
        const depths = depthsRef.current
        const sd = depths.get(sourceId) ?? Number.POSITIVE_INFINITY
        const td = depths.get(targetId) ?? Number.POSITIVE_INFINITY
        // Lower-depth endpoint is "closer to fleet" — particles should flow
        // away from it. If source is already the lower-depth side, keep the
        // default direction; otherwise flip.
        return sd <= td ? PARTICLE_SPEED : -PARTICLE_SPEED
    }, [])

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={data}
            width={width}
            height={height}
            backgroundColor="rgba(0,0,0,0)"
            showNavInfo={false}
            nodeRelSize={4}
            nodeOpacity={1}
            nodeThreeObject={nodeThreeObject}
            nodeLabel={(node) => {
                const accent = getHudAccent()
                return `<div style="font-family:'Source Code Pro',monospace;font-size:11px;color:${accent};background:#000;padding:4px 6px;border:1px solid ${accent}">› ${node.name.toUpperCase()}</div>`
            }}
            linkColor={linkColor}
            linkWidth={1.4}
            linkOpacity={1}
            linkDirectionalParticles={linkDirectionalParticles}
            linkDirectionalParticleWidth={1.2}
            linkDirectionalParticleColor={linkDirectionalParticleColor}
            linkDirectionalParticleSpeed={linkDirectionalParticleSpeed}
            onNodeHover={(node: any) => onNodeHover(node ? node.id : null)}
            onNodeClick={(node: any) => {
                // eslint-disable-next-line no-console
                console.debug('[ProductGalaxy] node click', node?.id)
                onNodeClick(node.id)
            }}
            onEngineStop={() => {
                // eslint-disable-next-line no-console
                console.info('[ProductGalaxy] force simulation settled')
            }}
            enableNodeDrag={false}
            cooldownTicks={120}
            warmupTicks={30}
        />
    )
}

export { getProductColor }
