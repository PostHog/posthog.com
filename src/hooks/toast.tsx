import { useContext } from 'react'
import { Context } from '../context/toast'

export interface IToast {
    error?: boolean
    message: string
    createdAt?: number
}

export const useToast = (): {
    toasts: IToast[]
    addToast: (toast: IToast) => void
    removeToast: (createdAt: number) => void
} => {
    const toast = useContext(Context)
    return toast || {}
}
