const callbacks = new Map<Element, () => void>()
let observer: IntersectionObserver | undefined

export function observeReveal(element: Element, reveal: () => void): () => void {
    if (typeof IntersectionObserver === 'undefined') return () => undefined
    if (!observer)
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    const callback = callbacks.get(entry.target)
                    observer?.unobserve(entry.target)
                    callbacks.delete(entry.target)
                    callback?.()
                })
            },
            { threshold: 0 }
        )
    callbacks.set(element, reveal)
    observer.observe(element)
    return () => {
        observer?.unobserve(element)
        callbacks.delete(element)
        if (!callbacks.size) {
            observer?.disconnect()
            observer = undefined
        }
    }
}
