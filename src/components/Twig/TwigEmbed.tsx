import React, { useEffect, useRef } from 'react'

export default function TwigEmbed({
    path = '/',
    title = 'Explore the Twig website',
    height = 560,
    continueTo,
}: {
    path?: string
    title?: string
    height?: number
    continueTo?: string
}): JSX.Element {
    const base =
        process.env.GATSBY_TWIG_URL ||
        (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://twig.com')
    const src = new URL(path, base).href
    const iframeRef = useRef<HTMLIFrameElement>(null)
    useEffect(() => {
        if (!continueTo) return
        const receive = (event: MessageEvent) => {
            if (event.origin !== new URL(src).origin || event.source !== iframeRef.current?.contentWindow) return
            if (event.data?.type !== 'twig:continue' || event.data?.exercise !== path.split('/').pop()) return
            const heading = document.getElementById(continueTo)
            if (!heading) return
            heading.tabIndex = -1
            heading.classList.add('!outline-none')
            heading.focus({ preventScroll: true })
            heading.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start',
            })
        }
        window.addEventListener('message', receive)
        return () => window.removeEventListener('message', receive)
    }, [src, path, continueTo])

    return (
        <div>
            <iframe
                ref={iframeRef}
                src={src}
                title={title}
                width="100%"
                height={height}
                className="block w-full rounded border border-primary"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
            <p className="!mt-2 !mb-0 text-sm text-secondary">
                Scroll inside to explore, or{' '}
                <a href={src} target="_blank" rel="noopener noreferrer" className="underline">
                    open Twig in a new tab
                </a>
                .
            </p>
        </div>
    )
}
