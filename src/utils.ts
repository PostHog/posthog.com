export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function determineIfInIframe(): boolean {
    return typeof window !== 'undefined' && window.self !== window.top
}
