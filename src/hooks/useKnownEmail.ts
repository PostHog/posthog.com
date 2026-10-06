import { useEffect, useState } from 'react'
import usePostHog from './usePostHog'
import { useUser } from './useUser'

/**
 * The email address we already hold for the current visitor: their posthog.com community
 * account first, then the address their PostHog person profile kept from an earlier form
 * on this site. Empty when we hold no address.
 *
 * Use it to prefill an email field. The address becomes available after mount, so apply it
 * from an effect and let the visitor replace it.
 */
export default function useKnownEmail(): string {
    const { user } = useUser()
    const posthog = usePostHog()
    const [knownEmail, setKnownEmail] = useState('')

    useEffect(() => {
        if (knownEmail) {
            return
        }
        // `$stored_person_properties` holds the properties this browser already sent:
        // `email` from a waitlist submit, `squeakEmail` from a community sign-in.
        const personProperties = posthog?.get_property?.('$stored_person_properties')
        const email = user?.email || personProperties?.email || personProperties?.squeakEmail
        if (email) {
            setKnownEmail(email)
        }
    }, [user, posthog, knownEmail])

    return knownEmail
}
