import { useToast } from '../../context/Toast'
import React from 'react'
import Toast from 'components/RadixUI/Toast'
import { Toast as RadixToast } from 'radix-ui'

export default function Toasts(): JSX.Element {
    const { toasts } = useToast()

    return (
        <RadixToast.Provider swipeDirection="right">
            {toasts.map((toast: any, index: number) => (
                <Toast key={toast.createdAt} {...toast} />
            ))}
        </RadixToast.Provider>
    )
}
