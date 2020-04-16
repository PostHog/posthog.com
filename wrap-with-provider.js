import React from "react"
import { Provider } from "react-redux"
import createStore from './src/store'

const store = createStore()

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={store}>{element}</Provider>