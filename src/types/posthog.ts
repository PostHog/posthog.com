export type PostHog = {
    [key: string]: any
    people: {
        set: (...args: any[]) => void
        [key: string]: any
    }
    capture: (...args: any[]) => void
    captureException: (...args: any[]) => void
    createPersonProfile: (...args: any[]) => void
    getFeatureFlag: (...args: any[]) => any
    getFeatureFlagPayload: (...args: any[]) => any
    get_distinct_id: (...args: any[]) => string
    get_property: (...args: any[]) => any
    identify: (...args: any[]) => void
    isFeatureEnabled: (...args: any[]) => boolean | undefined
    onFeatureFlags: (...args: any[]) => void
    register: (...args: any[]) => void
    register_once: (...args: any[]) => void
    setPersonProperties: (...args: any[]) => void
    set_config: (...args: any[]) => void
}
