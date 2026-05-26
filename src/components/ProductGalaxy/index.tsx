import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useProducts from 'hooks/useProducts'
import { useGalaxyState } from './useGalaxyState'
import GalaxyCanvasLazy from './GalaxyCanvas.lazy'
import HUD from './HUD'
import FleetPanel from './FleetPanel'
import SelectionTray from './SelectionTray'
import Starfield from './Starfield'
import SSRFallback from './SSRFallback'

export default function ProductGalaxy(): JSX.Element {
    const { products } = useProducts()
    const { graph, selected, hovered, suggestions, toggleSelected, clearSelected, setHovered } = useGalaxyState()

    const canvasContainerRef = useRef<HTMLDivElement | null>(null)
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 480 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useLayoutEffect(() => {
        const el = canvasContainerRef.current
        if (!el || typeof ResizeObserver === 'undefined') return
        const update = () => {
            setCanvasSize({ width: el.clientWidth, height: el.clientHeight })
        }
        update()
        const observer = new ResizeObserver(update)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const productLite = useMemo(
        () =>
            products.map((p: any) => ({
                handle: p.handle,
                name: p.name,
                color: p.color,
                slug: p.slug,
                description: p.description,
                Icon: p.Icon,
            })),
        [products]
    )

    const hoveredProduct = hovered ? productLite.find((p) => p.handle === hovered) : null

    return (
        <div
            data-scheme="primary"
            className="@container relative w-full h-full bg-primary text-primary overflow-hidden"
        >
            <div className="absolute inset-0 grid gap-0 grid-cols-1 @md:grid-cols-[200px_1fr] @xl:grid-cols-[220px_1fr_300px] grid-rows-[auto_1fr_auto] @md:grid-rows-[1fr_auto] @xl:grid-rows-1">
                {/* Left tray: product picker */}
                <aside className="row-start-3 @md:row-start-1 col-span-1 border-r border-primary bg-primary overflow-y-auto max-h-[40%] @md:max-h-full">
                    <SelectionTray
                        products={productLite}
                        selected={selected}
                        onToggle={toggleSelected}
                        onClear={clearSelected}
                    />
                </aside>

                {/* Center: the 3D canvas. Stays dark regardless of theme — it's outer space. */}
                <main
                    ref={canvasContainerRef}
                    className="relative row-start-2 @md:row-start-1 col-span-1 bg-black overflow-hidden"
                    style={{
                        backgroundImage:
                            'radial-gradient(ellipse at center, rgba(15, 30, 60, 0.9) 0%, rgba(0, 0, 0, 1) 70%)',
                    }}
                >
                    <Starfield />

                    <HUD
                        nodeCount={graph.nodes.length}
                        edgeCount={graph.edges.filter((e) => e.type === 'pairsWith').length}
                        selectedCount={selected.size}
                        focusedName={hoveredProduct?.name ?? null}
                    />

                    {mounted && (
                        <GalaxyCanvasLazy
                            graph={graph}
                            products={productLite}
                            selected={selected}
                            hovered={hovered}
                            onNodeHover={setHovered}
                            onNodeClick={toggleSelected}
                            width={canvasSize.width}
                            height={canvasSize.height}
                        />
                    )}

                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(235, 157, 42, 0.04) 2px, rgba(235, 157, 42, 0.04) 3px)',
                        }}
                    />
                </main>

                {/* Right rail: unified fleet + recommendations */}
                <aside className="row-start-1 @xl:row-start-1 col-span-1 border-l border-primary bg-primary overflow-y-auto max-h-[40%] @xl:max-h-full @xl:col-start-3">
                    <FleetPanel
                        products={productLite}
                        fleet={selected}
                        suggestions={suggestions}
                        onToggle={toggleSelected}
                        onHover={setHovered}
                        onClear={clearSelected}
                    />
                </aside>
            </div>

            <SSRFallback products={productLite} graph={graph} hiddenAfterMount={mounted} />
        </div>
    )
}
