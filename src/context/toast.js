import { Check2, Close } from 'components/Icons/Icons'
import { useToast } from '../hooks/toast'
import React, { createContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const Toast = (props) => {
    const { removeToast, toasts } = useToast()
    const { error, message, createdAt, index } = props
    return (
        <motion.li
            initial={{ translateY: '100%', opacity: 0 }}
            animate={{ translateY: `-${10 * (toasts.length - index)}px`, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-white py-2 px-4 rounded-md shadow-lg border border-gray-accent-light border-dashed mt-2 font-semibold text-sm flex items-center fixed max-w-[350px] w-full bottom-4 right-4 space-x-4`}
        >
            <span className="flex-shrink-0">
                {error ? <Close opacity={1} className="w-3 h-3 text-red" /> : <Check2 className="w-4 h-4 text-green" />}
            </span>
            <span className="flex-grow">{message}</span>
            <button className="ml-auto flex-shrink-0" onClick={() => removeToast(createdAt)}>
                <Close className="w-3 h-3" opacity={0.2} />
            </button>
        </motion.li>
    )
}

export const Toasts = () => {
    const { toasts } = useToast()

    return createPortal(
        <ul className="list-none p-0 m-0">
            <AnimatePresence>
                {toasts.map((toast, index) => (
                    <Toast index={index} key={toast.createdAt} {...toast} />
                ))}
            </AnimatePresence>
        </ul>,
        document.body
    )
}

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
