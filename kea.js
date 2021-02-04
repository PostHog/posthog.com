import React from 'react'
import { Provider } from 'react-redux'
import { getContext, resetContext } from 'kea'
import { loadersPlugin } from 'kea-loaders'
import { routerPlugin } from 'kea-router'

export function initKea(isServer = false, location = '') {
    resetContext({
        plugins: [loadersPlugin, routerPlugin(isServer ? { location } : {})],
    })
}

export const wrapElement = ({ element }) => <Provider store={getContext().store}>{element}</Provider>
