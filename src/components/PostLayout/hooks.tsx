import { useContext } from 'react'
import { Context } from './context'

export const usePost = () => {
    const post = useContext(Context)
    if (post === undefined) {
        throw Error('No post has been specified using Provider')
    }
    return post
}
