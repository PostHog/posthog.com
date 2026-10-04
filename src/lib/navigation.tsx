// Client-side navigation for the Astro site: `Link`, `navigate`, and `useLocation`.
//
// A change to another page goes through Astro's ClientRouter, which swaps the page and keeps the
// persisted chrome mounted. A change to only the query string or hash of the current page uses the
// History API directly, so the page island re-renders instead of remounting (tabs, filters, and
// search params keep their state).
//
// A route with a fixed size in `appSettings` (display options, the contact form) opens as a dialog
// over the current page instead of replacing it. The URL keeps the page and names the dialog
// (`/pricing?dialog=talk-to-a-human`), so Back closes it and a shared link opens it again. The
// desktop island renders the dialog (islands/Desktop.tsx). Visited directly, the route is a page.
import React, { createContext, forwardRef, useContext, useSyncExternalStore } from 'react'
import { appSettings } from '../context/appSettings'
import { viewModuleFor } from './routes/views'

export interface RouterLocation {
    pathname: string
    search: string
    hash: string
    href: string
    origin: string
    host: string
    state: any
    key?: string
}

export interface NavigateOptions {
    state?: Record<string, any>
    replace?: boolean
}

const isBrowser = typeof window !== 'undefined'

/** The location of the page being rendered on the server. Provided by the page island root. */
export const ServerLocationContext = createContext<RouterLocation | null>(null)

export function createLocation(url: URL, state: any = null): RouterLocation {
    return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        href: url.href,
        origin: url.origin,
        host: url.host,
        state,
    }
}

let snapshot: RouterLocation | null = null
const listeners = new Set<() => void>()

function readLocation(): RouterLocation {
    if (!snapshot || snapshot.href !== window.location.href || snapshot.state !== history.state) {
        snapshot = createLocation(new URL(window.location.href), history.state)
    }
    return snapshot
}

function notify() {
    listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

// The pathname of the page that is mounted. A history entry with the same pathname belongs to this
// page, so it is handled here instead of by Astro's router.
let mountedPathname = isBrowser ? window.location.pathname : ''

if (isBrowser) {
    // Capture runs before Astro's own popstate listener, so Astro does not refetch and swap the
    // page when the visitor goes back through query-string changes on the same page.
    window.addEventListener(
        'popstate',
        (event) => {
            if (window.location.pathname === mountedPathname) {
                event.stopImmediatePropagation()
                notify()
            }
        },
        { capture: true }
    )
    document.addEventListener('astro:after-swap', () => {
        mountedPathname = window.location.pathname
        notify()
    })
}

export function useLocation(): RouterLocation {
    const serverLocation = useContext(ServerLocationContext)
    return useSyncExternalStore(subscribe, readLocation, () => {
        if (!serverLocation) throw new Error('useLocation needs a ServerLocationContext during server rendering')
        return serverLocation
    })
}

function pushSamePage(url: URL, { state, replace }: NavigateOptions) {
    const index = history.state?.index ?? 0
    const nextState = {
        ...(replace ? history.state : null),
        ...state,
        index: replace ? index : index + 1,
        scrollX: 0,
        scrollY: 0,
    }
    history[replace ? 'replaceState' : 'pushState'](nextState, '', url.href)
    notify()
}

/** The query parameter that names the dialog open over the page. */
export const DIALOG_PARAM = 'dialog'

function isDialogRoute(url: URL): boolean {
    return (
        url.origin === window.location.origin &&
        url.pathname !== mountedPathname &&
        !!appSettings[url.pathname]?.size?.fixed &&
        !!viewModuleFor(url.pathname)
    )
}

/** The dialog route named in a location's query string, with its own query string. */
export function dialogURL(location: Pick<RouterLocation, 'search' | 'origin'>): URL | null {
    const value = new URLSearchParams(location.search).get(DIALOG_PARAM)
    return value ? new URL(`/${value.replace(/^\/+/, '')}`, location.origin) : null
}

function openDialog(url: URL, { state, replace }: NavigateOptions) {
    const next = new URL(window.location.href)
    const hadDialog = next.searchParams.has(DIALOG_PARAM)
    next.searchParams.set(DIALOG_PARAM, url.pathname.slice(1) + url.search)
    // Opening a dialog over another one replaces it, so closing goes straight back to the page.
    pushSamePage(next, { state: { ...state, dialog: true }, replace: replace || hadDialog })
}

/** Closes the dialog named in the URL: goes back to the entry that opened it, or drops the parameter. */
export function closeDialog(): void {
    const url = new URL(window.location.href)
    if (!url.searchParams.has(DIALOG_PARAM)) return
    if (history.state?.dialog) {
        history.back()
        return
    }
    url.searchParams.delete(DIALOG_PARAM)
    pushSamePage(url, { replace: true })
}

export async function navigate(to: string | number, options: NavigateOptions = {}): Promise<void> {
    if (!isBrowser) return
    if (typeof to === 'number') {
        history.go(to)
        return
    }
    const url = new URL(to, window.location.href)
    if (url.origin !== window.location.origin) {
        window.location.href = url.href
        return
    }
    if (isDialogRoute(url)) {
        openDialog(url, options)
        return
    }
    if (url.pathname === mountedPathname) {
        pushSamePage(url, options)
        if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView()
        return
    }
    const { navigate: astroNavigate } = await import('astro:transitions/client')
    await astroNavigate(url.pathname + url.search + url.hash, {
        history: options.replace ? 'replace' : 'auto',
        state: options.state,
    })
}

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export interface LinkProps extends AnchorProps {
    to: string
    state?: Record<string, any>
    replace?: boolean
    activeClassName?: string
    partiallyActive?: boolean
}

function isModifiedClick(event: React.MouseEvent) {
    return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
}

/** An internal link. Renders a plain anchor, so it works without JavaScript and for crawlers. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { to, state, replace, activeClassName, partiallyActive, className, onClick, target, ...rest },
    ref
) {
    const location = useLocation()
    const isActive = partiallyActive ? location.pathname.startsWith(to) : location.pathname === to
    const classes = [className, isActive && activeClassName].filter(Boolean).join(' ') || undefined

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event)
        if (event.defaultPrevented || isModifiedClick(event) || (target && target !== '_self')) return
        const url = new URL(to, window.location.href)
        // Astro's router handles plain page changes itself. Take over only when the link carries
        // history state or replaces, stays on the current page, or opens a dialog.
        if (
            state ||
            replace ||
            (url.origin === window.location.origin && url.pathname === mountedPathname) ||
            isDialogRoute(url)
        ) {
            event.preventDefault()
            navigate(to, { state, replace })
        }
    }

    return <a ref={ref} href={to} className={classes} target={target} onClick={handleClick} {...rest} />
})

export default Link

/** Reach Router's `useNavigate`. */
export function useNavigate(): typeof navigate {
    return navigate
}

/** The props every page view and template receives. */
export interface PageProps<DataType = any, PageContextType = any> {
    data: DataType
    pageContext: PageContextType
    location: RouterLocation
    params: Record<string, string>
    path: string
}
