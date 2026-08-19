export const SDK_LANGUAGE_BY_ID = {
    'posthog-js': 'ts',
    'posthog-python': 'python',
    'posthog-php': 'php',
    'posthog-ruby': 'ruby',
    'posthog-go': 'go',
    'posthog-java': 'java',
    'posthog-node': 'node',
    'posthog-ios': 'swift',
    'posthog-android': 'java',
    'posthog-react-native': 'react-native',
    'posthog-flutter': 'flutter',
} as const

export type SupportedSdkId = keyof typeof SDK_LANGUAGE_BY_ID

export const SUPPORTED_SDK_IDS = Object.keys(SDK_LANGUAGE_BY_ID) as SupportedSdkId[]

export const getLanguageFromSdkId = (sdkId: string): string =>
    (SDK_LANGUAGE_BY_ID as Record<string, string>)[sdkId] ?? 'ts'

/** The pinned `latest` row carries this in `info.version` instead of a semver. */
export const VERSION_PLACEHOLDER = '<version>'

/** True for the pinned `latest` row, which is served at the unversioned URL. */
export const isLatestVersion = (version?: string): boolean => Boolean(version?.includes('latest'))

export const hasConcreteVersion = (version?: string): boolean => Boolean(version) && version !== VERSION_PLACEHOLDER

/**
 * A type only gets a page when it has properties or an example — link allowlists must match.
 * The literal `"null"` id is excluded too, or TypeLink emits a /types/null link to a page that
 * is never created.
 */
export const typeHasPage = (type?: { id?: string; properties?: unknown; example?: unknown }): boolean =>
    Boolean(type?.id && type.id !== 'null' && (type.properties || type.example))
