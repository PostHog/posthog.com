import React, { createContext, useState } from 'react'
import Toasts from 'components/Toast'

export const Context = createContext(undefined)
export const Provider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = (toast) => {
        const createdAt = Date.now()
        setToasts((prevToasts) => [...prevToasts, { ...toast, createdAt }])
        setTimeout(() => {
            removeToast(createdAt)
        }, 5000)
    }

    const removeToast = (createdAt) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.createdAt !== createdAt))
    }

    return (
        <Context.Provider value={{ addToast, toasts, removeToast }}>
            {children}
            <Toasts />
        </Context.Provider>
    )
}
