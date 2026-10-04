import React, { useEffect, useMemo, useRef, useState } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect } from 'components/OSForm'
import { internalToolsNav } from '../../navs/internalTools'
import { useUser } from 'hooks/useUser'
import useProducts from 'hooks/useProducts'
import ImageAnnotations, { type Annotation, type AnnotationType } from 'components/ImageAnnotations'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useToast } from '../../context/Toast'
import { IconTrash, IconCopy, IconChevronDown } from '@posthog/icons'

type Point = Annotation

const round = (n: number) => Math.round(n * 10) / 10

export default function ImageAnnotator(): JSX.Element {
    const { user, isModerator } = useUser()
    const { products } = useProducts()

    const [productHandle, setProductHandle] = useState<string>('')
    const [screenshotKey, setScreenshotKey] = useState<string>('')
    const [manualUrl, setManualUrl] = useState<string>('')
    const [manualUrlDark, setManualUrlDark] = useState<string>('')
    const [type, setType] = useState<AnnotationType>('numbered')
    const [points, setPoints] = useState<Point[]>([])

    const canvasRef = useRef<HTMLDivElement>(null)
    const dragState = useRef<{ index: number; moved: boolean } | null>(null)
    const [mode, setMode] = useState<'edit' | 'preview'>('edit')
    const [codeTarget, setCodeTarget] = useState<'mdx' | 'hook'>('mdx')
    // Screenshots are exported @2x, so default the display to 50% of natural width.
    const [naturalWidth, setNaturalWidth] = useState<number | null>(null)
    const { addToast } = useToast()

    // Products that have a screenshots object we can pick from.
    const productsWithScreenshots = useMemo(
        () =>
            products.filter(
                (p: any) => p?.screenshots && typeof p.screenshots === 'object' && Object.keys(p.screenshots).length > 0
            ),
        [products]
    )

    const selectedProduct = useMemo(
        () => productsWithScreenshots.find((p: any) => p.handle === productHandle),
        [productsWithScreenshots, productHandle]
    )

    const screenshotKeys = useMemo(
        () => (selectedProduct ? Object.keys((selectedProduct as any).screenshots) : []),
        [selectedProduct]
    )

    const selectedScreenshot = useMemo(() => {
        if (!selectedProduct || !screenshotKey) return null
        return (selectedProduct as any).screenshots[screenshotKey] || null
    }, [selectedProduct, screenshotKey])

    // Resolve the active image. A pasted URL always wins so you can override.
    const src = manualUrl || selectedScreenshot?.src || ''
    const srcDark = manualUrl ? manualUrlDark : selectedScreenshot?.srcDark || ''
    const alt = selectedScreenshot?.alt || 'Annotated image'

    // Measure the natural width whenever the image changes, so both the canvas and
    // the preview can render at 50% (screenshots are exported @2x).
    useEffect(() => {
        setNaturalWidth(null)
        if (!src) return
        const img = document.createElement('img')
        img.onload = () => setNaturalWidth(img.naturalWidth)
        img.src = src
    }, [src])

    // Display at 50% of natural width (since exports are @2x), capped to the container.
    const displayMaxWidth = naturalWidth ? naturalWidth / 2 : undefined

    const addPointAt = (clientX: number, clientY: number) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = round(((clientX - rect.left) / rect.width) * 100)
        const y = round(((clientY - rect.top) / rect.height) * 100)
        setPoints((prev) => [...prev, { x, y, title: '', description: '' }])
    }

    const handleCanvasClick = (e: React.MouseEvent) => {
        // Ignore the click that ends a drag.
        if (dragState.current?.moved) return
        addPointAt(e.clientX, e.clientY)
    }

    const handleMarkerPointerDown = (e: React.PointerEvent, index: number) => {
        e.stopPropagation()
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
        dragState.current = { index, moved: false }
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragState.current) return
        dragState.current.moved = true
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = Math.max(0, Math.min(100, round(((e.clientX - rect.left) / rect.width) * 100)))
        const y = Math.max(0, Math.min(100, round(((e.clientY - rect.top) / rect.height) * 100)))
        const { index } = dragState.current
        setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, x, y } : p)))
    }

    const handlePointerUp = () => {
        // Defer clearing so the canvas onClick can read `moved` first.
        const state = dragState.current
        if (state) {
            setTimeout(() => {
                dragState.current = null
            }, 0)
        }
    }

    const updatePoint = (index: number, field: 'title' | 'description', value: string) => {
        setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))
    }

    const removePoint = (index: number) => {
        setPoints((prev) => prev.filter((_, i) => i !== index))
    }

    const movePoint = (index: number, direction: -1 | 1) => {
        setPoints((prev) => {
            const target = index + direction
            if (target < 0 || target >= prev.length) return prev
            const next = [...prev]
            ;[next[index], next[target]] = [next[target], next[index]]
            return next
        })
    }

    // When a product screenshot is picked, prefer the hook-driven pattern so the
    // image (light + dark) stays in sync. A pasted URL falls back to inline JSX.
    const usesProductRef = !manualUrl && !!productHandle && !!screenshotKey

    const setName = usesProductRef ? (screenshotKey.includes('annot') ? `${screenshotKey}-set` : screenshotKey) : ''

    const generatedCode = useMemo(() => {
        const item = (indent: string) =>
            points
                .map((p) => {
                    const desc = p.description ? `, description: ${JSON.stringify(p.description)}` : ''
                    return `${indent}{ x: ${p.x}, y: ${p.y}, title: ${JSON.stringify(p.title || '')}${desc} },`
                })
                .join('\n')

        // --- Product hook target -------------------------------------------------
        if (codeTarget === 'hook') {
            if (!usesProductRef) {
                return `// Select a product + screenshot above to generate hook code.
// (The image must already exist in a product hook's \`screenshots\` object.)`
            }
            return `// 1. Add to screenshots.${screenshotKey} in the ${productHandle} product hook:
annotations: {
    '${setName}': {
        type: '${type}',
        items: [
${item('            ')}
        ],
    },
},

// 2. Render anywhere — the image (light + dark) stays in sync with the hook.
//    In MDX, import it at the top of the file first (like Tab):
import ImageAnnotations from 'components/ImageAnnotations'

<ImageAnnotations.FromProduct product="${productHandle}" screenshot="${screenshotKey}" set="${setName}" />`
        }

        // --- MDX target ----------------------------------------------------------
        // Image props: reference the hook when possible so the image stays in sync.
        const imageProps = usesProductRef
            ? `product="${productHandle}" screenshot="${screenshotKey}"`
            : `src="${src}"${srcDark ? ` srcDark="${srcDark}"` : ''} alt=${JSON.stringify(alt)}`

        const combined = `<ImageAnnotations annotations={annotations} type="${type}">
    <ImageAnnotations.Image ${imageProps} imgClassName="rounded-lg shadow-2xl" />${
            type === 'numbered' ? '\n    <ImageAnnotations.Key />' : ''
        }
</ImageAnnotations>`

        const split =
            type === 'numbered'
                ? `

{/* Split: render the image and key in different spots — they share data via the wrapper */}
<ImageAnnotations annotations={annotations} type="${type}">
    <ImageAnnotations.Image ${imageProps} imgClassName="rounded-lg shadow-2xl" />

    Any markdown or other components can go in between…

    <ImageAnnotations.Key />
</ImageAnnotations>`
                : ''

        return `import ImageAnnotations from 'components/ImageAnnotations'

export const annotations = [
${item('    ')}
]

{/* Image + key together */}
${combined}${split}`
    }, [points, src, srcDark, alt, type, codeTarget, usesProductRef, productHandle, screenshotKey, setName])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedCode)
            addToast({ title: 'Copied!', description: 'Annotation code copied to your clipboard.' })
        } catch (err) {
            addToast({ title: 'Copy failed', description: 'Could not access the clipboard.', error: true })
        }
    }

    if (!user || !isModerator) {
        return (
            <>
                <SEO title="Image annotation - PostHog" description="Internal tool to annotate screenshots" />
                <ReaderView
                    title="Image annotation"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="bg-accent p-4 rounded border border-primary mt-4">
                            <p className="mt-0 font-semibold">Access denied</p>
                            <p className="mb-0 text-muted">
                                This page is only available to logged-in moderators. Log in with your community account
                                to continue.
                            </p>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    return (
        <>
            <SEO title="Image annotation - PostHog" description="Internal tool to annotate screenshots" />
            <ReaderView
                title="Image annotation"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <section>
                        <div className="bg-accent p-4 rounded border border-primary mt-4">
                            <p className="mt-0 mb-2">
                                Place callouts on a screenshot, then copy paste-ready code for the{' '}
                                <code>&lt;ImageAnnotations /&gt;</code> component. Coordinates are stored as
                                percentages, so markers scale with the image.
                            </p>
                            <p className="mb-0 text-sm text-muted">
                                Click the image to add a marker · drag a marker to reposition it.
                            </p>
                        </div>
                    </section>

                    <div className="mt-8 @5xl:grid @5xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] @5xl:gap-8 @5xl:items-start">
                        {/* Left: configuration */}
                        <div className="space-y-8">
                            {/* Choose an image */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold mb-0 border-b border-primary pb-2">
                                    1. Choose an image
                                </h2>
                                <p className="text-sm text-primary mb-0">
                                    Product images are sourced from each product's hook file (
                                    <code>src/hooks/productData/&lt;product&gt;.tsx</code>) — their{' '}
                                    <code>screenshots</code> object. To annotate a new image, add it there first, then
                                    it shows up in the dropdown. Or paste any Cloudinary URL below for a one-off.
                                </p>
                                <div className="grid @lg:grid-cols-2 gap-4">
                                    <OSSelect
                                        label="Product"
                                        direction="column"
                                        width="full"
                                        value={productHandle}
                                        onChange={(value: string) => {
                                            setProductHandle(value)
                                            setScreenshotKey('')
                                        }}
                                        options={[
                                            { label: '— Select a product —', value: '' },
                                            ...productsWithScreenshots.map((p: any) => ({
                                                label: p.name || p.handle,
                                                value: p.handle,
                                            })),
                                        ]}
                                    />
                                    <OSSelect
                                        label="Screenshot"
                                        direction="column"
                                        width="full"
                                        value={screenshotKey}
                                        onChange={(value: string) => setScreenshotKey(value)}
                                        options={[
                                            { label: '— Select a screenshot —', value: '' },
                                            ...screenshotKeys.map((k: string) => ({ label: k, value: k })),
                                        ]}
                                    />
                                </div>
                                <OSInput
                                    label="…or paste a Cloudinary image URL (overrides the picker)"
                                    direction="column"
                                    width="full"
                                    value={manualUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManualUrl(e.target.value)}
                                    placeholder="https://res.cloudinary.com/dmukukwp6/image/upload/…"
                                />
                                {manualUrl && (
                                    <OSInput
                                        label="Dark mode URL (optional)"
                                        direction="column"
                                        width="full"
                                        value={manualUrlDark}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setManualUrlDark(e.target.value)
                                        }
                                        placeholder="https://res.cloudinary.com/dmukukwp6/image/upload/…"
                                    />
                                )}
                            </section>

                            {/* Annotation style */}
                            <section className="space-y-3">
                                <h2 className="text-xl font-semibold mb-0 border-b border-primary pb-2">
                                    2. Annotation style
                                </h2>
                                <ToggleGroup
                                    title="Annotation style"
                                    hideTitle
                                    className="!inline-flex"
                                    value={type}
                                    onValueChange={(value: string) => value && setType(value as AnnotationType)}
                                    options={[
                                        { label: 'Numbered + key', value: 'numbered' },
                                        { label: 'Pulsing dots', value: 'dots' },
                                    ]}
                                />
                            </section>

                            {/* Label markers */}
                            {src && (
                                <section className="space-y-3">
                                    <h2 className="text-xl font-semibold mb-0 border-b border-primary pb-2">
                                        3. Label markers
                                    </h2>
                                    {points.length === 0 && (
                                        <p className="text-sm text-primary bg-accent border border-dashed border-primary rounded p-3 mb-0">
                                            Click a spot on the image to add a marker. Each one shows up here to label.
                                        </p>
                                    )}
                                    <div className="space-y-4">
                                        {points.map((p, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 bg-accent border border-primary rounded p-3"
                                            >
                                                <span className="flex-shrink-0 flex items-center justify-center size-6 mt-1 rounded-full bg-red text-white text-[13px] font-semibold">
                                                    {i + 1}
                                                </span>
                                                <div className="flex-1 grid @md:grid-cols-2 gap-3">
                                                    <OSInput
                                                        label="Title"
                                                        direction="column"
                                                        width="full"
                                                        value={p.title}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            updatePoint(i, 'title', e.target.value)
                                                        }
                                                        placeholder="Debug views"
                                                    />
                                                    <OSInput
                                                        label="Description (optional)"
                                                        direction="column"
                                                        width="full"
                                                        value={p.description || ''}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            updatePoint(i, 'description', e.target.value)
                                                        }
                                                        placeholder="What this points to"
                                                    />
                                                </div>
                                                <div className="flex-shrink-0 flex items-center gap-1 mt-1">
                                                    <button
                                                        onClick={() => movePoint(i, -1)}
                                                        disabled={i === 0}
                                                        aria-label="Move up"
                                                        className="text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary"
                                                    >
                                                        <IconChevronDown className="size-5 rotate-180" />
                                                    </button>
                                                    <button
                                                        onClick={() => movePoint(i, 1)}
                                                        disabled={i === points.length - 1}
                                                        aria-label="Move down"
                                                        className="text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary"
                                                    >
                                                        <IconChevronDown className="size-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => removePoint(i)}
                                                        aria-label="Remove marker"
                                                        className="text-secondary hover:text-red"
                                                    >
                                                        <IconTrash className="size-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Code */}
                            {src && points.length > 0 && (
                                <section className="space-y-3">
                                    <h2 className="text-xl font-semibold mb-0 border-b border-primary pb-2">
                                        4. Copy code
                                    </h2>
                                    <ToggleGroup
                                        title="Code target"
                                        hideTitle
                                        size="sm"
                                        className="!inline-flex"
                                        value={codeTarget}
                                        onValueChange={(value: string) =>
                                            value && setCodeTarget(value as 'mdx' | 'hook')
                                        }
                                        options={[
                                            { label: 'MDX', value: 'mdx' },
                                            { label: 'Product hook', value: 'hook' },
                                        ]}
                                    />
                                    <div className="relative">
                                        <OSButton
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleCopy}
                                            className="absolute top-2 right-2 z-10"
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <IconCopy className="size-4" />
                                                Copy
                                            </span>
                                        </OSButton>
                                        <pre className="bg-accent border border-primary rounded p-4 overflow-x-auto text-sm text-primary">
                                            <code className="text-primary">{generatedCode}</code>
                                        </pre>
                                    </div>
                                    <div className="bg-accent border border-primary rounded p-3 text-sm text-primary">
                                        {codeTarget === 'mdx' ? (
                                            <p className="mb-0">
                                                Paste into an <code>.mdx</code> article. The <code>import</code> and{' '}
                                                <code>export const</code> must stay at the top level (a bare{' '}
                                                <code>const</code> won't work in MDX, and the namespaced{' '}
                                                <code>ImageAnnotations.*</code> API needs the import — like{' '}
                                                <code>Tab</code>).{' '}
                                                {usesProductRef
                                                    ? 'The image references the product hook, so it stays in sync.'
                                                    : 'Using a pasted URL, so the image is hard-coded here.'}{' '}
                                                The second block shows how to render the image and key in different
                                                spots.
                                            </p>
                                        ) : (
                                            <p className="mb-0">
                                                Store the annotations next to the image in its product hook (under{' '}
                                                <code>
                                                    screenshots.{usesProductRef ? screenshotKey : '…'}.annotations
                                                </code>
                                                ), then render with <code>&lt;ImageAnnotations.FromProduct /&gt;</code>{' '}
                                                anywhere. Multiple named sets per image are supported.
                                            </p>
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right: canvas + preview (sticky on large containers) */}
                        <div className="mt-8 @5xl:mt-0 @5xl:sticky @5xl:top-4 space-y-3">
                            <h2 className="text-xl font-semibold mb-0 border-b border-primary pb-2">
                                {mode === 'edit' ? 'Place markers' : 'Live preview'}
                            </h2>
                            {src && (
                                <ToggleGroup
                                    title="Mode"
                                    hideTitle
                                    size="sm"
                                    className="!inline-flex"
                                    value={mode}
                                    onValueChange={(value: string) => value && setMode(value as 'edit' | 'preview')}
                                    options={[
                                        { label: 'Edit', value: 'edit' },
                                        { label: 'Preview', value: 'preview' },
                                    ]}
                                />
                            )}
                            {src ? (
                                mode === 'preview' ? (
                                    <ImageAnnotations annotations={points} type={type}>
                                        <div className="space-y-4">
                                            <ImageAnnotations.Image
                                                src={src}
                                                srcDark={srcDark || undefined}
                                                alt={alt}
                                                style={{ maxWidth: displayMaxWidth }}
                                                imgClassName="rounded-lg shadow-2xl max-w-full h-auto max-h-[90vh]"
                                            />
                                            {type === 'numbered' && <ImageAnnotations.Key />}
                                        </div>
                                    </ImageAnnotations>
                                ) : (
                                    <div
                                        ref={canvasRef}
                                        onClick={handleCanvasClick}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={handlePointerUp}
                                        className="relative inline-block leading-[0] cursor-crosshair select-none border border-primary rounded overflow-hidden max-w-full"
                                    >
                                        <img
                                            src={src}
                                            alt={alt}
                                            onLoad={(e) => setNaturalWidth(e.currentTarget.naturalWidth)}
                                            style={{ maxWidth: displayMaxWidth, maxHeight: '90vh' }}
                                            className="max-w-full h-auto pointer-events-none"
                                        />
                                        {points.map((p, i) => (
                                            <div
                                                key={i}
                                                onPointerDown={(e) => handleMarkerPointerDown(e, i)}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${p.x}%`,
                                                    top: `${p.y}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                                className="z-10 cursor-grab active:cursor-grabbing"
                                            >
                                                {type === 'numbered' ? (
                                                    <span className="flex items-center justify-center size-6 rounded-full bg-red text-white text-[13px] font-semibold shadow-md ring-2 ring-white">
                                                        {i + 1}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center">
                                                        <span className="absolute inline-flex size-5 rounded-full bg-red opacity-60 animate-ping" />
                                                        <span className="relative inline-flex size-4 rounded-full bg-red ring-2 ring-white shadow-md" />
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="bg-accent p-8 rounded border border-dashed border-primary text-center text-muted">
                                    Choose a product screenshot or paste an image URL to begin.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
