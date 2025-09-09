import React, { createContext, useContext, useState } from 'react'
import Toasts from 'components/Toast'

export interface Toast {
    title?: string
    description: string | React.ReactNode
    error?: boolean
    createdAt?: number
    onUndo?: () => void
    onAction?: () => void
    actionLabel?: string
    verticalAlign?: string
    actionAsIcon?: React.ReactNode
    duration?: number
    image?: React.ReactNode
}

interface ToastContext {
    addToast: (toast: Toast) => void
    toasts: Toast[]
    removeToast: (createdAt: number) => void
}

export const Context = createContext<ToastContext | undefined>(undefined)
export const Provider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = (toast: Toast) => {
        const createdAt = Date.now()
        setToasts((prevToasts) => [...prevToasts, { ...toast, createdAt }])
    }

    const removeToast = (createdAt: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.createdAt !== createdAt))
    }

    return (
        <Context.Provider value={{ addToast, toasts, removeToast }}>
            {children}
            <Toasts />
        </Context.Provider>
    )
}
export const useToast = (): {
    toasts: Toast[]
    addToast: (toast: Toast) => void
    removeToast: (createdAt: number) => void
} => {
    const toast = useContext(Context)
    if (!toast) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return toast
}
