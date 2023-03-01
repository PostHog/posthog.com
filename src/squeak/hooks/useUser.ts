import { useContext } from 'react'
import { Context } from '../context/user'

export const useUser = () => {
    const user = useContext(Context)
    return user
}
