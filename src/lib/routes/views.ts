// Routes for the page components in src/views, which use file-based routing:
// `about.tsx` → /about, `teams/index.tsx` → /teams, `teams/[slug].tsx` → /teams/[slug] (a single
// page that reads its slug in the browser; vercel.json rewrites /teams/* to it).
const files = Object.keys(import.meta.glob('/src/views/**/*.{tsx,jsx,ts,js}'))

export interface ViewRoute {
    /** URL path without a trailing slash. Dynamic segments keep their brackets. */
    path: string
    /** Module path for the page island. */
    module: string
    /** True for `[param]` routes, which the browser resolves. */
    dynamic: boolean
}

function toPath(file: string): string {
    const path = file
        .replace(/^\/src\/views/, '')
        .replace(/\.(tsx|jsx|ts|js)$/, '')
        .replace(/\/index$/, '')
    return path || '/'
}

// When two files claim the same URL, the directory index wins.
const routes = new Map<string, ViewRoute>()
for (const module of files.sort()) {
    const path = toPath(module)
    if (routes.has(path) && !module.endsWith('/index.tsx') && !module.endsWith('/index.jsx')) continue
    routes.set(path, { path, module, dynamic: path.includes('[') })
}

export const viewRoutes: ViewRoute[] = [...routes.values()]

const viewPaths = new Set(viewRoutes.map((route) => route.path))

/** True when a page component in src/views owns this URL, so a content route must not build it. */
export const isViewPath = (path: string): boolean => viewPaths.has(path)

/** The module of the page component in src/views that owns this URL. */
export const viewModuleFor = (path: string): string | undefined => routes.get(path)?.module

/** The URL of a collection entry under a section prefix: the `index` entry is the section root. */
export const entryPath = (prefix: string, id: string): string => (id === 'index' ? prefix : `${prefix}/${id}`)
