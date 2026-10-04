// The desktop (wallpaper and icons) and the dialog windows above the page. Persisted across page
// changes, like the chrome.
import { useEffect } from 'react'
import IslandRoot from './IslandRoot'
import Desktop from 'components/Desktop'
import AppWindow from 'components/AppWindow'
import { useAppActions, useDialogs } from '../context/App'
import { createLocation, dialogURL, RouterLocation, useLocation } from 'lib/navigation'
import { viewModuleFor } from 'lib/routes/views'
import { loadPageModule, useModule } from './modules'

// A route's page component, rendered in a dialog. Dialog routes need no build-time data.
function RouteDialogView({ module, location }: { module: string; location: RouterLocation; routeDialog: true }) {
    const Component = useModule(module, 'page')
    return <Component data={{}} pageContext={{}} params={{}} path={location.pathname} location={location} />
}

// Opens the route named by the `?dialog=` parameter as a dialog over the page, and closes it when the
// parameter goes away (Back, a close button, or another page). See lib/navigation.
function RouteDialog() {
    const location = useLocation()
    const dialogs = useDialogs()
    const { addWindow, closeWindow } = useAppActions()

    useEffect(() => {
        const target = dialogURL(location)
        const module = target && viewModuleFor(target.pathname)
        const open = dialogs.find((dialog) => dialog.props?.routeDialog)
        if (open && open.path !== target?.pathname) closeWindow(open)
        if (!target || !module || (open?.path === target.pathname && open.location?.search === target.search)) return

        let cancelled = false
        // Load the page component first, so the dialog opens with its content.
        loadPageModule(module).then(() => {
            if (cancelled) return
            const dialogLocation = createLocation(target, history.state)
            addWindow(<RouteDialogView module={module} location={dialogLocation} routeDialog />, {
                key: target.pathname,
            })
        })
        return () => {
            cancelled = true
        }
    }, [location.href])

    return null
}

function Dialogs() {
    const dialogs = useDialogs()
    return (
        <>
            {dialogs.map((dialog) => (
                <AppWindow item={dialog} key={dialog.key} />
            ))}
        </>
    )
}

export default function DesktopIsland({ url }: { url: string }): JSX.Element {
    return (
        <IslandRoot url={url}>
            <Desktop />
            <Dialogs />
            <RouteDialog />
        </IslandRoot>
    )
}
