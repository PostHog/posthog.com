import { createStore as reduxCreateStore } from "redux"
import rootReducer from "../reducers";

const redux_devtool_extention = () => {
  if (typeof window !== 'undefined')
    return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

const createStore = () => reduxCreateStore(
  rootReducer,
  redux_devtool_extention()
)
export default createStore