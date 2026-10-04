// Providers every island needs. Their state lives in module-level stores, so each island gets its own
// provider instances but they all read and write the same state.
import React, { useMemo } from 'react'
import { createLocation, ServerLocationContext } from 'lib/navigation'
import { KeaProvider } from 'lib/kea'
import { UserProvider } from 'hooks/useUser'

export default function IslandRoot({ url, children }: { url: string; children: React.ReactNode }): JSX.Element {
    const location = useMemo(() => createLocation(new URL(url)), [url])
    return (
        <ServerLocationContext.Provider value={location}>
            <KeaProvider>
                <UserProvider>{children}</UserProvider>
            </KeaProvider>
        </ServerLocationContext.Provider>
    )
}
