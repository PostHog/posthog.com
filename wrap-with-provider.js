import React from 'react'
import { Provider } from 'react-redux'
import { getContext } from 'kea'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={getContext().store}>{element}</Provider>
