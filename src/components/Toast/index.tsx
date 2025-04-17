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
            <RadixToast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
        </RadixToast.Provider>
    )
}
