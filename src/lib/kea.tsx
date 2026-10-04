// One kea context for the whole page, shared by every island (they import the same module).
import React from 'react'
import { Provider } from 'react-redux'
import { getContext, resetContext } from 'kea'
import { loadersPlugin } from 'kea-loaders'

let initialized = false

export function KeaProvider({ children }: { children: React.ReactNode }): JSX.Element {
    if (!initialized) {
        resetContext({ plugins: [loadersPlugin] })
        initialized = true
    }
    return <Provider store={getContext().store}>{children}</Provider>
}
