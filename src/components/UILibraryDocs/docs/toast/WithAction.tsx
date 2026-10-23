import React from 'react'
import { Button } from 'components/UI/Button'
import { Toast } from 'components/UI/Toast'

function DeleteInsightButton(): JSX.Element {
    const toastManager = Toast.useToastManager()

    const deleteInsight = () => {
        const toastId = toastManager.add({
            title: 'Insight deleted',
            description: 'It stays in the trash for 30 days.',
            actionProps: {
                children: 'Undo',
                onClick: () => {
                    toastManager.close(toastId)
                    toastManager.add({ title: 'Insight restored' })
                },
            },
        })
    }

    return <Button onClick={deleteInsight}>Delete insight</Button>
}

export default function ToastWithAction(): JSX.Element {
    return (
        <Toast.Provider>
            <DeleteInsightButton />
            <Toast.Viewport />
        </Toast.Provider>
    )
}
