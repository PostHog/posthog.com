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
