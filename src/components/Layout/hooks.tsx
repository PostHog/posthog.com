import { useContext } from 'react'
import { Context } from './context'

export const useLayoutData = () => {
    const layoutData = useContext(Context)
    return layoutData || {}
}
