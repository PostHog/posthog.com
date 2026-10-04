// The window frame. The site shows one page window at a time (the page island renders it); dialogs
// such as sign-in, display options, and contact forms open as fixed-size windows above it (the desktop
// island renders those).
//
// The page window's size comes from CSS: <html data-window="windowed|expanded|closed"> (see
// global.css and context/App.tsx). Server HTML and the hydrated page are the same in every mode, so
// a page never jumps size after it loads.
import React, { useCallback, useEffect, useState } from 'react'
import { IconCollapse45Chevrons, IconSquare, IconX } from '@posthog/icons'
import { Menu, MenuItem, setWindowMode, useAppActions, useAppSettings, useWindowMode } from '../../context/App'
import { Provider as WindowProvider, AppWindow as AppWindowType, useWindow } from '../../context/Window'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'
import { MenuItemType } from 'components/RadixUI/MenuBar'
import { IMenu } from 'components/PostLayout/types'
import Inbox from 'components/Inbox'
import Legal from 'components/Legal'
import KeyboardShortcut from 'components/KeyboardShortcut'
import Modal from 'components/RadixUI/Modal'
import FloatingModal from 'components/FloatingModal'
import { WINDOW_BG } from '../../constants/frostedSurfaces'
import { containsURL, getActiveMenuSection } from '../../navs/activeMenu'

const LEGAL_PAGES = ['/terms', '/privacy', '/dpa', '/baa', '/subprocessors']
const NO_MENU: MenuItem[] = []
const goBack = () => history.back()
const goForward = () => history.forward()

const PageModal = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(true)
    const { appWindow } = useWindow()
    const { closeWindow } = useAppActions()

    useEffect(() => {
        if (!open && appWindow) {
            closeWindow(appWindow)
        }
    }, [open])

    return (
        <Modal open={open} onOpenChange={setOpen}>
            {children}
        </Modal>
    )
}

// Some paths render a shared component around (or instead of) the page component.
const Router = (props: any) => {
    const { appWindow } = useWindow()
    const { children, path } = props
    const modal = appWindow?.modal?.type ?? appWindow?.appSettings?.modal?.type

    if (/^\/questions/.test(path)) {
        return <Inbox {...props} />
    }
    if (LEGAL_PAGES.includes(path)) {
        return <Legal defaultTab={path}>{children}</Legal>
    }
    if (modal === 'standard') {
        return <PageModal>{children}</PageModal>
    }
    if (modal === 'floating') {
        return <FloatingModal>{children}</FloatingModal>
    }
    return <>{children}</>
}

function useWindowMenus(item: AppWindowType) {
    const { menu: appMenu } = useAppSettings()
    const parent =
        (appMenu as Menu).find(({ children, url }) => {
            const currentURL = item?.path
            return currentURL === url?.split('?')[0] || containsURL(children, currentURL)
        }) ||
        appMenu.find(({ url }) => url === `/${item?.path?.split('/')[1]}`) ||
        appMenu.find(({ name }) => name === 'Docs')

    const internalMenu = parent?.children || NO_MENU

    const getActiveInternalMenu = useCallback(() => {
        return getActiveMenuSection<MenuItem>(internalMenu, item?.path)
    }, [internalMenu, item])

    const [activeInternalMenu, setActiveInternalMenu] = useState<MenuItem | undefined>(getActiveInternalMenu())
    const [menu, setMenu] = useState<IMenu[]>(internalMenu as IMenu[])

    useEffect(() => {
        setActiveInternalMenu(getActiveInternalMenu())
    }, [item?.path])

    useEffect(() => {
        setMenu(internalMenu as IMenu[])
    }, [activeInternalMenu])

    return { parent: parent as MenuItem, internalMenu, activeInternalMenu, setActiveInternalMenu, menu, setMenu }
}

function WindowControls({ item, onClose }: { item: AppWindowType; onClose: () => void }) {
    const mode = useWindowMode()
    const isPage = !item.fixedSize
    const expanded = mode === 'expanded'
    const hasToolbar = item.appSettings?.toolbar

    return (
        <div
            data-scheme="tertiary"
            className={`inline-flex gap-1 items-center py-0.5 pl-1.5 pr-0.5 opacity-40 hover:opacity-75 transition-opacity duration-100 ${
                hasToolbar ? 'flex-1 justify-end' : 'absolute z-20 right-1 top-1'
            }`}
        >
            {isPage && (
                <div className="window-expand-control flex justify-end">
                    <Tooltip
                        trigger={
                            <OSButton
                                windowButton
                                size="md"
                                onClick={() => setWindowMode(expanded ? 'windowed' : 'expanded')}
                                icon={expanded ? <IconCollapse45Chevrons /> : <IconSquare className="scale-110" />}
                            />
                        }
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span>{expanded ? 'Restore window' : 'Expand window'}</span>
                            <div>
                                <KeyboardShortcut text="Shift" size="xs" />
                                &nbsp;
                                <KeyboardShortcut text="↑" size="xs" />
                            </div>
                        </div>
                    </Tooltip>
                </div>
            )}
            <div className="flex justify-end">
                <Tooltip trigger={<OSButton windowButton size="md" onClick={onClose} icon={<IconX />} />}>
                    <div className="flex flex-col items-center gap-2">
                        <span>Close window</span>
                        <div>
                            <KeyboardShortcut text="Shift" size="xs" />
                            &nbsp;
                            <KeyboardShortcut text="W" size="xs" />
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default function AppWindow({ item, chrome = true }: { item: AppWindowType; chrome?: boolean }): JSX.Element {
    const { closeWindow } = useAppActions()
    const fixed = !!item.appSettings?.size?.fixed
    const hasToolbar = item.appSettings?.toolbar
    const hideTitle = item.appSettings?.hideTitle
    const { parent, internalMenu, activeInternalMenu, setActiveInternalMenu, menu, setMenu } = useWindowMenus(item)
    const [pageOptions, setPageOptions] = useState<MenuItemType[]>()
    const [view, setView] = useState<'marketing' | 'developer'>('marketing')
    const [hasDeveloperMode, setHasDeveloperMode] = useState(false)
    // Browser history is unknown on the server, so read it after hydration.
    const [canGoBack, setCanGoBack] = useState(false)
    useEffect(() => setCanGoBack(history.length > 1), [item.path])

    const handleClose = () => closeWindow(item)

    useEffect(() => {
        if (!item.appSettings?.closeOnEscape) return
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape' || event.defaultPrevented) return
            event.preventDefault()
            handleClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [item])

    return (
        <WindowProvider
            appWindow={item}
            menu={menu}
            setMenu={setMenu}
            goBack={goBack}
            goForward={goForward}
            canGoBack={canGoBack}
            canGoForward={false}
            setPageOptions={setPageOptions}
            pageOptions={pageOptions}
            activeInternalMenu={activeInternalMenu}
            setActiveInternalMenu={setActiveInternalMenu}
            internalMenu={internalMenu}
            parent={parent}
            view={view}
            setView={setView}
            hasDeveloperMode={hasDeveloperMode}
            setHasDeveloperMode={setHasDeveloperMode}
        >
            {fixed && <div onClick={handleClose} className="fixed inset-0 z-50 bg-black/50 print:hidden" />}
            <div
                data-app="AppWindow"
                data-page={!fixed || undefined}
                data-path={item.path || undefined}
                data-fixed-size={fixed || undefined}
                data-scheme="tertiary"
                className={`@container relative overflow-hidden !select-auto flex flex-col border-primary rounded-lg ${WINDOW_BG} ${
                    fixed
                        ? // The max height keeps auto-height dialogs inside the desktop area on short screens.
                          '!absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] border shadow-md'
                        : 'pointer-events-auto'
                }`}
                style={
                    fixed
                        ? {
                              maxWidth: item.sizeConstraints.min.width,
                              maxHeight: item.appSettings?.size?.autoHeight
                                  ? undefined
                                  : item.sizeConstraints.min.height,
                          }
                        : undefined
                }
            >
                <div className={`print:hidden ${hasToolbar ? 'bg-primary flex items-center py-0.5 px-1' : ''}`}>
                    {hasToolbar && !hideTitle && (
                        <p className="text-primary text-left text-sm font-semibold ml-1.5 my-0 line-clamp-1">
                            {item.meta?.title?.replace(/ - PostHog$/, '')}
                        </p>
                    )}
                    {hasToolbar && <div className="flex-1" />}
                    <WindowControls item={item} onClose={handleClose} />
                </div>
                <div
                    data-app="AppWindowContent"
                    className={`size-full flex-grow ${
                        chrome
                            ? `${
                                  // A dialog's auto height makes percentage heights inside it resolve to `auto`,
                                  // so its own ScrollAreas never overflow. Scroll the content here instead.
                                  fixed ? 'overflow-x-hidden overflow-y-auto' : 'overflow-clip min-h-0'
                              } rounded-lg ${hasToolbar ? 'rounded-t-none' : ''}`
                            : ''
                    }`}
                >
                    <Router {...item.props}>{item.element}</Router>
                </div>
            </div>
        </WindowProvider>
    )
}
