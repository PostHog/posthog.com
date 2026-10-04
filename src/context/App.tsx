// App-wide state: the page window, dialog windows, display settings, and global panels.
//
// The site shows one page window at a time. The chrome (taskbar, desktop) and the page are separate
// Astro islands, so this state lives in a module-level store (src/lib/store.ts) that every island
// shares, instead of in a React context provider. The hooks keep the names and fields of the earlier
// multi-window version, so components did not need to change.
import React, { useEffect } from 'react'
import { AppWindow } from './Window'
import { isSafeInternalPath } from 'lib/utils'
import { createStore } from 'lib/store'
import SignIn from 'components/Squeak/components/Classic/SignIn'
import Register from 'components/Squeak/components/Classic/Register'
import ForgotPassword from 'components/Squeak/components/Classic/ForgotPassword'
import { User } from 'hooks/useUser'
import Start from 'components/Start'
import ContactSales from 'components/ContactSales'
import { getDataPipelinesNav } from '../navs/useDataPipelinesNav'
import { getSourcesNav } from '../navs/useSourcesNav'
import initialMenu from '../navs'
import { toast } from './Toast'
import { IconDay, IconLaptop, IconNight } from '@posthog/icons'
import { themeOptions } from '../hooks/useTheme'
import { closeDialog, dialogURL, navigate } from 'lib/navigation'
import { updateCursor } from './cursor'
import { appSettings } from './appSettings'

export interface MenuItem {
    name: string
    url?: string
    icon?: React.ReactNode
    color?: string
    platformLogo?: string
    showChildrenIcons?: boolean
    sortChildrenAlpha?: boolean
    // When set, this item (and its children) is only shown to users for whom the
    // named PostHog feature flag is enabled. Gating is client-side only — see
    // src/hooks/useActiveFeatureFlags.ts and note the static-site caveat.
    featureFlag?: string
    children?: MenuItem[]
}

export type Menu = MenuItem[]

interface ChatContext {
    type: 'page'
    value: { path: string; label: string }
}

export interface ChatParams {
    path: string
    sessionKey?: number
    context?: ChatContext[]
    quickQuestions?: string[]
    chatId?: string
    date?: string
    initialQuestion?: string
    codeSnippet?: { code: string; language: string; sourceUrl: string }
}

/** A React element opened as a dialog window. */
type WindowElement = React.ReactElement<{ location?: { pathname: string } } & Record<string, unknown>>

interface AddWindowOptions {
    /** Identifies the window, and its entry in `appSettings`. Defaults to the element's key. */
    key?: string
    /** The route the dialog shows, if any. Defaults to the key. */
    path?: string
}

export { appSettings, type AppSetting } from './appSettings'

export interface SiteSettings {
    colorMode: 'light' | 'dark' | 'system'
    theme: 'light' | 'dark'
    skinMode: 'modern' | 'classic'
    cursor: 'default' | 'xl' | 'james'
    wallpaper: 'keyboard-garden' | 'hogzilla' | 'startup-monopoly' | 'office-party'
    screensaverDisabled?: boolean
    reduceTransparency?: boolean
    clickBehavior?: 'single' | 'double'
    performanceBoost?: boolean
    scrollbars?: 'system' | 'show' | 'auto'
}

/** How the page window is shown. Kept on <html data-window> so CSS sizes it before first paint. */
export type WindowMode = 'windowed' | 'expanded' | 'closed'

const defaultSiteSettings: SiteSettings = {
    colorMode: 'light',
    theme: 'light',
    skinMode: 'modern',
    cursor: 'default',
    wallpaper: 'keyboard-garden',
    clickBehavior: 'double',
    performanceBoost: false,
    screensaverDisabled: true,
    reduceTransparency: false,
    scrollbars: 'system',
}

const getInitialSiteSettings = (): SiteSettings => {
    const siteSettings: SiteSettings = {
        ...defaultSiteSettings,
        colorMode: (window as any).__theme || 'light',
        theme: (window as any).__theme || 'light',
        ...JSON.parse(localStorage.getItem('siteSettings') || '{}'),
    }

    const retiredWallpapers = ['action-figure', '2001-bliss', 'parade', 'coding-at-night']
    if (retiredWallpapers.includes(siteSettings.wallpaper)) {
        siteSettings.wallpaper = 'keyboard-garden'
    }

    // The classic skin has been retired; force anyone with it saved back to modern
    siteSettings.skinMode = 'modern'

    return siteSettings
}

const isLabel = (item: any) => !item?.url && item?.name

const dynamicMenus: Record<string, MenuItem[]> = {
    'data-pipeline-destinations': getDataPipelinesNav({ type: 'destination' }),
    'data-pipeline-transformations': getDataPipelinesNav({ type: 'transformation' }),
    'data-pipeline-source-webhooks': getDataPipelinesNav({ type: 'source_webhook' }),
    'data-pipeline-sources': getSourcesNav('/docs/cdp/sources'),
    'data-warehouse-sources': getSourcesNav('/docs/data-warehouse/sources'),
}

function injectDynamicChildren(menu: Menu): Menu {
    return menu?.map((item: any) => {
        const processedItem = { ...item }

        if (item.dynamicChildren && dynamicMenus[item.dynamicChildren]) {
            const newChildren = [...(item.children || []), ...dynamicMenus[item.dynamicChildren]].reduce(
                (acc: any[][], child) => {
                    if (isLabel(child)) {
                        acc.push([child])
                    } else {
                        const lastGroup = acc[acc.length - 1]
                        if (!lastGroup || isLabel(lastGroup[lastGroup.length - 1])) {
                            acc.push([child])
                        } else {
                            lastGroup.push(child)
                        }
                    }
                    return acc
                },
                []
            )

            newChildren.forEach((group) => {
                group.sort((a, b) => {
                    if (!a.url || !b.url) return 0
                    return a.name.localeCompare(b.name)
                })
            })

            processedItem.children = newChildren.flat()
        }

        if (processedItem.children && processedItem.children.length > 0) {
            processedItem.children = injectDynamicChildren(processedItem.children)
        }

        return processedItem
    })
}

const menu = injectDynamicChildren(initialMenu as Menu)

interface AppState {
    pageWindow?: AppWindow
    dialogs: AppWindow[]
    windowMode: WindowMode
    siteSettings: SiteSettings
    compact: boolean
    isMobile: boolean
    posthogInstance?: string
    taskbarHeight: number
    isNotificationsPanelOpen: boolean
    closingAllWindowsAnimation: boolean
    screensaverPreviewActive: boolean
    confetti: boolean
    searchOpen: boolean
    searchInitialFilter: string
    chatOpen: boolean
    chatParams: ChatParams | null
}

const appStore = createStore<AppState>({
    dialogs: [],
    windowMode: 'windowed',
    siteSettings: defaultSiteSettings,
    compact: false,
    isMobile: false,
    taskbarHeight: 59,
    isNotificationsPanelOpen: false,
    closingAllWindowsAnimation: false,
    screensaverPreviewActive: false,
    confetti: false,
    searchOpen: false,
    searchInitialFilter: '',
    chatOpen: false,
    chatParams: null,
})

const isSSR = typeof window === 'undefined'
const constraintsRef = React.createRef<HTMLDivElement>()
const taskbarRef = React.createRef<HTMLDivElement>()
const windowsInViewRef: React.MutableRefObject<AppWindow[]> = { current: [] }

function selectWindows(state: AppState): AppWindow[] {
    return state.pageWindow && state.windowMode !== 'closed' ? [state.pageWindow, ...state.dialogs] : state.dialogs
}

function getDesktopSize() {
    return {
        width: isSSR ? 0 : window.innerWidth,
        height: isSSR ? 0 : window.innerHeight - appStore.get().taskbarHeight,
    }
}

/** Builds the window record for a dialog opened with `addWindow`, or for the page. */
export function createWindow(
    key: string,
    path: string,
    element: React.ReactNode,
    extra: Partial<AppWindow> = {}
): AppWindow {
    const settings = appSettings[key] ?? appSettings[path]
    const desktop = getDesktopSize()
    const size = settings?.size?.min ?? desktop
    return {
        element,
        key,
        path,
        zIndex: 1,
        minimized: false,
        props: {},
        size,
        previousSize: size,
        position: { x: 0, y: 0 },
        previousPosition: { x: 0, y: 0 },
        sizeConstraints: { min: size, max: settings?.size?.min ?? desktop },
        fixedSize: settings?.size?.fixed ?? false,
        minimal: false,
        appSettings: settings,
        expanded: false,
        snapped: false,
        windowed: !settings?.size?.fixed,
        ...extra,
    }
}

/** Applies the window mode to <html>, where the CSS that sizes the page window reads it. */
function applyWindowMode(mode: WindowMode) {
    if (!isSSR) document.documentElement.dataset.window = mode
}

function setWindowMode(mode: WindowMode) {
    appStore.set({ windowMode: mode })
    applyWindowMode(mode)
}

/** Called by the page island when it mounts, so the chrome knows which page is open. */
export function registerPageWindow(pageWindow: AppWindow): void {
    appStore.set((state) => ({
        pageWindow,
        windowMode: state.windowMode === 'closed' ? 'windowed' : state.windowMode,
    }))
    applyWindowMode(appStore.get().windowMode)
}

const closeWindow = (item: AppWindow) => {
    const { pageWindow } = appStore.get()
    if (pageWindow && item.key === pageWindow.key && item.path === pageWindow.path) {
        setWindowMode('closed')
        return
    }
    // A route dialog closes through the URL; the desktop island then removes it.
    if (!isSSR && item.props?.routeDialog && dialogURL(window.location)?.pathname === item.path) {
        closeDialog()
        return
    }
    appStore.set((state) => ({ dialogs: state.dialogs.filter((dialog) => dialog.key !== item.key) }))
}

const bringToFront = (item: AppWindow) => {
    appStore.set((state) => ({
        dialogs: [...state.dialogs.filter((dialog) => dialog !== item), item],
    }))
}

const setWindowTitle = (appWindow: AppWindow, title: string) => {
    appStore.set((state) => {
        if (state.pageWindow && appWindow?.key === state.pageWindow.key) {
            return { pageWindow: { ...state.pageWindow, meta: { title } } }
        }
        return {
            dialogs: state.dialogs.map((dialog) =>
                dialog.key === appWindow?.key ? { ...dialog, meta: { title } } : dialog
            ),
        }
    })
}

const addWindow = (element: WindowElement, options: AddWindowOptions = {}) => {
    // Older callers identify the window with a `location` prop on the element.
    const legacyPath = element.props.location?.pathname
    const key = options.key ?? (element.key === null ? undefined : String(element.key)) ?? legacyPath ?? 'dialog'
    const path = options.path ?? legacyPath ?? key
    const dialog = createWindow(key, path, element, { props: element.props, location: element.props.location as any })
    appStore.set((state) => ({ dialogs: [...state.dialogs.filter((existing) => existing.key !== key), dialog] }))
}

type WindowUpdates = Partial<Pick<AppWindow, 'expanded' | 'windowed' | 'snapped' | 'element' | 'appSettings'>> & {
    position?: { x?: number; y?: number }
    size?: { width?: number; height?: number }
    previousPosition?: { x?: number; y?: number }
    previousSize?: { width?: number; height?: number }
}

const updateWindow = (appWindow: AppWindow, updates: WindowUpdates): AppWindow => {
    const { pageWindow } = appStore.get()
    if (pageWindow && appWindow?.key === pageWindow.key) {
        if (updates.expanded !== undefined) setWindowMode(updates.expanded ? 'expanded' : 'windowed')
        return pageWindow
    }
    const updated = {
        ...appWindow,
        ...(updates.element ? { element: updates.element } : {}),
        ...(updates.appSettings ? { appSettings: { ...appWindow.appSettings, ...updates.appSettings } } : {}),
    } as AppWindow
    appStore.set((state) => ({ dialogs: state.dialogs.map((dialog) => (dialog === appWindow ? updated : dialog)) }))
    return updated
}

const expandWindow = () => setWindowMode('expanded')

const openSearch = (initialFilter?: string) => {
    appStore.set({ searchInitialFilter: initialFilter || '', searchOpen: true })
}

const openSignIn = (onSuccess?: (user: User) => void) => {
    addWindow(<SignIn onSuccess={onSuccess} />, { key: 'community-auth-signin' })
}

const openRegister = () => {
    addWindow(<Register />, { key: 'community-auth-register' })
}

const openForgotPassword = () => {
    addWindow(<ForgotPassword />, { key: 'community-auth-forgot-password' })
}

const openStart = ({ subdomain, initialTab }: { subdomain?: string; initialTab?: string }) => {
    addWindow(<Start subdomain={subdomain} initialTab={initialTab} />, { key: 'start' })
}

// The chat UI is rendered once as a global overlay (see `ChatOverlay`) rather
// than as a managed window. Opening a chat just stores its params and flips the
// `chatOpen` flag; a fresh set of params remounts the overlay's `ChatProvider`.
const openNewChat = (params: ChatParams) => {
    appStore.set((state) => ({
        chatParams: { ...params, sessionKey: (state.chatParams?.sessionKey ?? 0) + 1 },
        chatOpen: true,
    }))
}

const updateSiteSettings = (settings: SiteSettings) => {
    try {
        appStore.set({ siteSettings: settings })
        localStorage.setItem('siteSettings', JSON.stringify(settings))
    } catch (error) {
        console.error('Failed to update site settings:', error)
    }
}

const closeAllWindows = () => {
    appStore.set({ dialogs: [], closingAllWindowsAnimation: false })
    setWindowMode('closed')
}

const updateTaskbarHeight = () => {
    if (isSSR) return
    const rect = document.querySelector('#taskbar')?.getBoundingClientRect()
    if (rect && rect.height > 0) {
        appStore.set({ taskbarHeight: rect.top + rect.height })
    }
}

const copyDesktopParams = () => {
    navigator.clipboard?.writeText(window.location.href)
}

const actions = {
    closeWindow,
    bringToFront,
    setWindowTitle,
    minimizeWindow: closeWindow,
    addWindow,
    updateWindowRef: () => undefined,
    updateWindow,
    getPositionDefaults: () => ({ x: 0, y: 0 }),
    getDesktopCenterPosition: (size: { width: number; height: number }) => {
        const desktop = getDesktopSize()
        return { x: desktop.width / 2 - size.width / 2, y: desktop.height / 2 - size.height / 2 }
    },
    openSearch,
    handleSnapToSide: () => undefined,
    constraintsRef,
    taskbarRef,
    expandWindow,
    getExpandedDimensions: () => ({ position: { x: 0, y: 0 }, size: getDesktopSize() }),
    openSignIn,
    openRegister,
    openForgotPassword,
    updateSiteSettings,
    openNewChat,
    setIsNotificationsPanelOpen: (isOpen: boolean) => appStore.set({ isNotificationsPanelOpen: isOpen }),
    openStart,
    animateClosingAllWindows: () => appStore.set({ closingAllWindowsAnimation: true }),
    closeAllWindows,
    setClosingAllWindowsAnimation: (isOpen: boolean) => appStore.set({ closingAllWindowsAnimation: isOpen }),
    setScreensaverPreviewActive: (isActive: boolean) => appStore.set({ screensaverPreviewActive: isActive }),
    setConfetti: (isActive: boolean) => appStore.set({ confetti: isActive }),
    copyDesktopParams,
    setSearchOpen: (isOpen: boolean) => appStore.set({ searchOpen: isOpen }),
    setChatOpen: (isOpen: boolean) => appStore.set({ chatOpen: isOpen }),
    updateTaskbarHeight,
    windowsInViewRef,
}

export type AppActionsContextType = typeof actions

export const useAppActions = (): AppActionsContextType => actions

export const useAppSettings = () => {
    const settings = appStore.use((state) => ({
        siteSettings: state.siteSettings,
        compact: state.compact,
        isMobile: state.isMobile,
        posthogInstance: state.posthogInstance,
    }))
    return { ...settings, menu }
}

export const useAppUIState = () =>
    appStore.use((state) => ({
        isNotificationsPanelOpen: state.isNotificationsPanelOpen,
        closingAllWindowsAnimation: state.closingAllWindowsAnimation,
        screensaverPreviewActive: state.screensaverPreviewActive,
        confetti: state.confetti,
        searchOpen: state.searchOpen,
        chatOpen: state.chatOpen,
        chatParams: state.chatParams,
    }))

export const useAppWindows = () => ({ windows: appStore.use(selectWindows) })

/** Everything at once, as the earlier multi-window `useApp` returned it. */
export const useApp = () => {
    const state = appStore.use((s) => s)
    const windows = selectWindows(state)
    return {
        ...actions,
        ...state,
        menu,
        windows,
        focusedWindow: windows[windows.length - 1],
        windowsInView: windows,
        location: isSSR ? undefined : window.location,
        desktopParams: undefined as string | undefined,
        desktopCopied: false,
        shareableDesktopURL: isSSR ? '' : window.location.href,
    }
}

/** Reads the page window mode (windowed, expanded, closed). */
export const useWindowMode = (): WindowMode => appStore.use((state) => state.windowMode)

export { setWindowMode }

let effectsStarted = false

/**
 * Global listeners: keyboard shortcuts, display settings, embedding messages. Rendered once by the
 * persisted chrome island, so the listeners survive page changes.
 */
export function AppEffects(): null {
    const { siteSettings, compact } = appStore.use((state) => ({
        siteSettings: state.siteSettings,
        compact: state.compact,
    }))

    useEffect(() => {
        if (effectsStarted) return
        effectsStarted = true

        appStore.set({
            compact: window !== window.parent,
            isMobile: window.innerWidth < 768,
            siteSettings: getInitialSiteSettings(),
        })
        applyWindowMode(appStore.get().windowMode)

        const instanceCookie = document.cookie
            .split('; ')
            ?.filter((row) => row.startsWith('ph_current_instance='))
            ?.map((c) => c.split('=')?.[1])?.[0]
        if (instanceCookie) appStore.set({ posthogInstance: instanceCookie })

        // ?contact opens the contact form next to the page, as a link from sales emails expects.
        if (new URL(window.location.href).searchParams.get('contact')) {
            addWindow(<ContactSales />, { key: '/talk-to-a-human' })
        }

        const onResize = () => {
            appStore.set({ isMobile: window.innerWidth < 768 })
            updateTaskbarHeight()
        }
        updateTaskbarHeight()

        // A new page always opens its window, even if the visitor closed the last one.
        const onAfterSwap = () => {
            if (appStore.get().windowMode === 'closed') appStore.set({ windowMode: 'windowed' })
            applyWindowMode(appStore.get().windowMode)
            if (appStore.get().compact) {
                // nosemgrep: javascript.browser.security.wildcard-postmessage-configuration.wildcard-postmessage-configuration - intentional for docs embedding, parent origin unknown, non-sensitive navigation data
                window.parent.postMessage({ type: 'internal-navigation', url: window.location.pathname }, '*')
            }
        }

        const onMessage = (e: MessageEvent): void => {
            if (e.data.type === 'theme-toggle') {
                window.__setPreferredTheme(e.data.isDarkModeOn ? 'dark' : 'light')
                return
            }
            if (e.data.type === 'navigate' && isSafeInternalPath(e.data.url)) {
                navigate(e.data.url)
            }
        }

        window.__onThemeChange = (theme) => {
            updateSiteSettings({ ...appStore.get().siteSettings, theme: theme as unknown as SiteSettings['theme'] })
        }

        if (appStore.get().compact) {
            // nosemgrep: javascript.browser.security.wildcard-postmessage-configuration.wildcard-postmessage-configuration - intentional for docs embedding, parent origin unknown, non-sensitive ready signal
            window.parent.postMessage({ type: 'docs-ready' }, '*')
        }

        window.addEventListener('resize', onResize)
        window.addEventListener('message', onMessage)
        document.addEventListener('astro:after-swap', onAfterSwap)
        document.addEventListener('keydown', onKeyDown)
    }, [])

    useEffect(() => {
        if (siteSettings.skinMode) document.body.setAttribute('data-skin', siteSettings.skinMode)
        if (siteSettings.cursor) updateCursor(siteSettings.cursor)
        if (siteSettings.wallpaper) document.body.setAttribute('data-wallpaper', siteSettings.wallpaper)
        document.body.setAttribute('data-reduce-transparency', siteSettings.reduceTransparency ? 'true' : 'false')
    }, [siteSettings, compact])

    return null
}

function onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement

    if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.shadowRoot ||
        (target instanceof HTMLElement && target.closest('.mdxeditor'))
    ) {
        return
    }

    const { siteSettings, windowMode, dialogs } = appStore.get()
    const plain = !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey

    // Global shortcuts
    if (e.key === '/' && plain) {
        e.preventDefault()
        openSearch()
    }
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux) for search
    if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        openSearch()
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        openNewChat({ path: 'ask-max' })
    }
    if (e.key === ',' && plain) {
        e.preventDefault()
        navigate('/display-options')
    }

    // Theme toggle with m key: system -> light -> dark -> system
    if (e.key === 'm' && plain) {
        e.preventDefault()
        e.stopPropagation()

        const next =
            siteSettings.colorMode === 'system'
                ? {
                      mode: 'light' as const,
                      icon: <IconDay className="size-5 inline-block mr-1" />,
                      label: 'light mode',
                  }
                : siteSettings.colorMode === 'light'
                  ? {
                        mode: 'dark' as const,
                        icon: <IconNight className="size-5 inline-block mr-1" />,
                        label: 'dark mode',
                    }
                  : {
                        mode: 'system' as const,
                        icon: <IconLaptop className="size-5 inline-block mr-1" />,
                        label: 'system mode',
                    }

        if (window.__setPreferredTheme) {
            const newTheme = window.__setPreferredTheme(next.mode)
            updateSiteSettings({ ...siteSettings, theme: newTheme as SiteSettings['theme'], colorMode: next.mode })
            toast({
                description: (
                    <>
                        {next.icon}
                        Switched to {next.label}
                    </>
                ),
                duration: 2000,
            })
        }
    }

    // Wallpaper cycle with \ key (without Shift)
    if (e.key === '\\' && plain) {
        e.preventDefault()
        e.stopPropagation()
        const currentIndex = themeOptions.findIndex((theme) => theme.value === siteSettings.wallpaper)
        const nextWallpaper = themeOptions[(currentIndex + 1) % themeOptions.length]
        updateSiteSettings({ ...siteSettings, wallpaper: nextWallpaper.value as SiteSettings['wallpaper'] })
        toast({ description: `Switched to ${nextWallpaper.label} wallpaper`, duration: 2000 })
    }

    // Window shortcuts
    if (e.shiftKey && e.key === 'ArrowUp') {
        setWindowMode(windowMode === 'expanded' ? 'windowed' : 'expanded')
    }
    if (e.shiftKey && (e.key === 'ArrowDown' || e.key.toLowerCase() === 'w')) {
        e.preventDefault()
        const top = dialogs[dialogs.length - 1]
        if (top) closeWindow(top)
        else setWindowMode('closed')
    }
    if (e.shiftKey && e.key === 'X') {
        e.preventDefault()
        actions.animateClosingAllWindows()
    }
    if (e.shiftKey && e.key === 'Z') {
        e.preventDefault()
        actions.setScreensaverPreviewActive(true)
    }
    if (e.shiftKey && e.key === 'C') {
        e.preventDefault()
        copyDesktopParams()
        toast({ description: 'Page link copied to clipboard', duration: 2000 })
    }
}

/** The dialog windows open above the page. */
export const useDialogs = (): AppWindow[] => appStore.use((state) => state.dialogs)
