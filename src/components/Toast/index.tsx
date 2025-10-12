import { useToast } from '../../context/Toast'
import React from 'react'
import { Toast as RadixToast } from 'radix-ui'
import ToastItem from 'components/RadixUI/Toast'

export default function Toasts(): JSX.Element {
    const { toasts, removeToast } = useToast()

    return (
        <RadixToast.Provider swipeDirection="right">
            {toasts.map((toast: any) => (
                <ToastItem key={toast.createdAt} {...toast} onClose={() => removeToast(toast.createdAt)} />
            ))}
            <RadixToast.Viewport
                className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:w-[390px] max-w-[calc(100vw_-_2rem)] m-0 list-none outline-none"
                data-radix-toast-viewport
            />
        </RadixToast.Provider>
    )
}
