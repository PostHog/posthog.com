import type React from 'react'
import { navigate } from 'gatsby'

const activeViewports = new WeakSet<HTMLElement>()

/** Preserve inherited styles and container-query results when moving a visual to the overlay. */
function snapshotCover(cover: HTMLElement): HTMLElement {
    const copy = cover.cloneNode(true) as HTMLElement
    const originals = [cover, ...Array.from(cover.querySelectorAll<HTMLElement | SVGElement>('*'))]
    const copies = [copy, ...Array.from(copy.querySelectorAll<HTMLElement | SVGElement>('*'))]
    originals.forEach((original, index) => {
        const style = getComputedStyle(original)
        copies[index].style.cssText = Array.from(style)
            .map((property) => `${property}:${style.getPropertyValue(property)};`)
            .join('')
        copies[index].style.transition = 'none'
        copies[index].style.animation = 'none'
    })
    return copy
}

/**
 * Turn the copied cover into an open book: the inside of the front cover becomes the left page,
 * the page under it is the right page, and a spine sits on the hinge between them.
 */
function prepareSpread(book: HTMLElement, face: HTMLElement): HTMLElement {
    const rightPage = book.firstElementChild
    if (rightPage instanceof HTMLElement) {
        // Gutter shading on the spine side of each page.
        rightPage.style.boxShadow = 'inset 14px 0 16px -14px rgba(0, 0, 0, 0.25)'
        const leftPage = rightPage.cloneNode(true) as HTMLElement
        Object.assign(leftPage.style, {
            inset: '0',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            boxShadow: 'inset -14px 0 16px -14px rgba(0, 0, 0, 0.25)',
        })
        // Mirror the ruled lines so the left page's margin rule also faces the spine.
        if (leftPage.firstElementChild instanceof HTMLElement) leftPage.firstElementChild.style.transform = 'scaleX(-1)'
        face.append(leftPage)
    }
    // The front stays visible until the cover passes 90 degrees; then the inside page shows.
    if (face.firstElementChild instanceof HTMLElement) face.firstElementChild.style.backfaceVisibility = 'hidden'
    face.style.backfaceVisibility = 'visible'
    const spine = document.createElement('div')
    Object.assign(spine.style, {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '-1px',
        width: '2px',
        // A neutral gutter line: the pages are white stock in both themes.
        background: 'rgba(0, 0, 0, 0.12)',
        opacity: '0',
    })
    book.append(spine)
    return spine
}

/** Animate a book visual and navigate, without requiring any destination-page behavior. */
export async function openPocketGuide(event: React.MouseEvent, cover: HTMLElement | null, to: string): Promise<void> {
    if (!cover || event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element).closest('a')
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const viewport = cover.closest<HTMLElement>('[data-radix-scroll-area-viewport]')
    const content = viewport?.firstElementChild
    if (!viewport || !(content instanceof HTMLElement)) return
    const bookRect = cover.getBoundingClientRect()
    const frame = viewport.getBoundingClientRect()
    if (bookRect.width <= 0 || bookRect.height <= 0 || frame.width <= 0 || frame.height <= 0) return

    event.preventDefault()
    if (activeViewports.has(viewport)) return
    activeViewports.add(viewport)

    // A visual copy can leave a shelf's layout without moving its siblings or sidebar.
    // This layer also survives the source page unmounting during the final reveal.
    const stage = document.createElement('div')
    stage.className = 'pointer-events-none overflow-hidden'
    stage.setAttribute('aria-hidden', 'true')
    stage.setAttribute('inert', '')
    Object.assign(stage.style, {
        position: 'fixed',
        left: `${frame.left}px`,
        top: `${frame.top}px`,
        width: `${frame.width}px`,
        height: `${frame.height}px`,
        zIndex: '2147483647',
    })
    const book = snapshotCover(cover)
    Object.assign(book.style, {
        position: 'absolute',
        left: `${bookRect.left - frame.left}px`,
        top: `${bookRect.top - frame.top}px`,
        width: `${bookRect.width}px`,
        height: `${bookRect.height}px`,
        margin: '0',
    })
    const veil = document.createElement('div')
    veil.className = 'absolute inset-0 bg-primary'
    veil.style.opacity = '0'
    stage.append(book, veil)
    document.body.appendChild(stage)

    const animations: Animation[] = []
    const play = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, { ...options, fill: 'forwards' })
        animations.push(animation)
        return animation.finished
    }
    const previousPointerEvents = viewport.style.pointerEvents
    const previousVisibility = cover.style.visibility
    viewport.style.pointerEvents = 'none'
    try {
        // The open book is two pages wide, hinged at the cover's left edge. Center that spine.
        const x = frame.width / 2 - (bookRect.left - frame.left)
        const y = frame.height / 2 - (bookRect.top - frame.top + bookRect.height / 2)
        const scale = Math.min(frame.width / (bookRect.width * 2), frame.height / bookRect.height) * 0.85
        const face = book.querySelector<HTMLElement>('[data-pocket-guide-cover-face]')
        const spine = face ? prepareSpread(book, face) : null
        book.style.transformOrigin = 'left center'
        const originalHover = cover.querySelector<HTMLElement>('[data-pocket-guide-cover-face] > div')
        const hover = face?.firstElementChild
        const hoverReset =
            originalHover && hover instanceof HTMLElement
                ? play(hover, [{ transform: getComputedStyle(originalHover).transform }, { transform: 'none' }], {
                      duration: 300,
                      easing: 'ease-out',
                  })
                : Promise.resolve()
        cover.style.visibility = 'hidden'
        await Promise.all([
            hoverReset,
            play(
                content,
                [
                    { opacity: 1, filter: 'blur(0px)' },
                    { opacity: 0, filter: 'blur(4px)' },
                ],
                {
                    duration: 400,
                    easing: 'ease-in-out',
                }
            ),
            play(book, [{ translate: '0px 0px' }, { translate: `${x}px ${y}px` }], {
                duration: 950,
                easing: 'cubic-bezier(0.45, 0, 0.2, 1)',
            }),
            play(book, [{ scale: '1' }, { scale: `${scale}` }], {
                duration: 1100,
                delay: 120,
                easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            }),
            play(book, [{ opacity: 1 }, { opacity: 0 }], { duration: 220, delay: 1080, easing: 'ease-in-out' }),
            ...(face
                ? [
                      play(face, [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }], {
                          duration: 760,
                          delay: 180,
                          easing: 'cubic-bezier(0.45, 0, 0.2, 1)',
                      }),
                  ]
                : []),
            ...(spine ? [play(spine, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 420 })] : []),
        ])
        if (!cover.isConnected) return
        await play(veil, [{ opacity: 0 }, { opacity: 1 }], { duration: 180 })
        if (!cover.isConnected) return
        await navigate(to)
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
        await play(veil, [{ opacity: 1 }, { opacity: 0 }], {
            duration: 420,
            easing: 'cubic-bezier(0.45, 0, 0.2, 1)',
        })
    } catch {
        // Cancellation or failed navigation restores the source instead of leaving it faded.
    } finally {
        animations.forEach((animation) => animation.cancel())
        cover.style.visibility = previousVisibility
        viewport.style.pointerEvents = previousPointerEvents
        stage.remove()
        activeViewports.delete(viewport)
    }
}
