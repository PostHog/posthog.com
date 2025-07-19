// Helper function to determine language from SDK reference data
export const getLanguageFromSdkId = (sdkId: string): string => {
    // Map SDK IDs to their corresponding language codes
    const sdkLanguageMap: Record<string, string> = {
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
    }

    return sdkLanguageMap[sdkId] || 'ts' // default to 'ts' if not found
}
