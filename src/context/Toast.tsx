// Toast notifications, shared by every island through a module-level store (see src/lib/store.ts).
// The chrome island renders the toast list once (components/Toast).
import React from 'react'
import { createStore } from 'lib/store'

export interface Toast {
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

const toastStore = createStore<{ toasts: Toast[] }>({ toasts: [] })

/** Shows a toast. Returns its id, which `removeToast` takes. */
export const toast = (item: Toast): number => {
    const createdAt = item.createdAt ?? Date.now()
    toastStore.set((state) => ({ toasts: [...state.toasts, { ...item, createdAt }] }))
    return createdAt
}

const removeToast = (createdAt: number) => {
    toastStore.set((state) => ({ toasts: state.toasts.filter((item) => item.createdAt !== createdAt) }))
}

export const useToast = (): {
    toasts: Toast[]
    addToast: (toast: Toast) => number
    removeToast: (createdAt: number) => void
} => {
    const toasts = toastStore.use((state) => state.toasts)
    return { toasts, addToast: toast, removeToast }
}
