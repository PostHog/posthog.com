import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Toast } from 'components/UI/Toast'

export default function ToastBasic(): JSX.Element {
    const toastManager = Toast.useToastManager()
    const [savedCount, setSavedCount] = useState(0)

    const saveInsight = () => {
        const next = savedCount + 1
        setSavedCount(next)
        toastManager.add({
            title: `Insight ${next} saved`,
            description: 'You can find it in your saved insights.',
        })
    }

    return <Button onClick={saveInsight}>Show a toast</Button>
}
