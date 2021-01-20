import React from 'react'
import { Provider } from 'react-redux'
import { getContext, resetContext } from 'kea'
import { loadersPlugin } from 'kea-loaders'
import { routerPlugin } from 'kea-router'

resetContext({
    plugins: [loadersPlugin, routerPlugin],
})

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={getContext().store}>{element}</Provider>
