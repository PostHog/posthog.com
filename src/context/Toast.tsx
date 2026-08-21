import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import Toasts from 'components/Toast'

export interface Toast {
    // Stable identity. When set, addToast refuses a second toast with the same id while the first is still on screen.
    id?: string
    title?: string
    description: string | React.ReactNode
    error?: boolean
    createdAt?: number
    onUndo?: () => void
    onAction?: () => void
    actionLabel?: string
    actionClassName?: string
    verticalAlign?: string
    actionAsIcon?: React.ReactNode
    duration?: number
    image?: React.ReactNode
}

interface ToastContext {
    addToast: (toast: Toast) => number
    toasts: Toast[]
    removeToast: (createdAt: number) => void
}

export const Context = createContext<ToastContext | undefined>(undefined)
export const Provider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [toasts, setToasts] = useState<Toast[]>([])
    const nextKey = useRef(0)

    const addToast = useCallback((toast: Toast) => {
        const createdAt = toast.createdAt ?? nextKey.current++
        setToasts((prevToasts) => {
            if (toast.id && prevToasts.some((existing) => existing.id === toast.id)) {
                return prevToasts
            }
            return [...prevToasts, { ...toast, createdAt }]
        })
        return createdAt
    }, [])

    const removeToast = useCallback((createdAt: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.createdAt !== createdAt))
    }, [])

    return (
        <Context.Provider value={{ addToast, toasts, removeToast }}>
            {children}
            <Toasts />
        </Context.Provider>
    )
}
export const useToast = (): {
    toasts: Toast[]
    addToast: (toast: Toast) => number
    removeToast: (createdAt: number) => void
} => {
    const toast = useContext(Context)
    if (!toast) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return toast
}
