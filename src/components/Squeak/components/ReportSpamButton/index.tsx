import React, { useState } from 'react'
import { IconWarning } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../../../context/App'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'

export default function ReportSpamButton({
    type,
    id,
    label,
}: {
    type: 'reply' | 'question'
    id: number
    label?: string
}): JSX.Element {
    const { user, reportSpam } = useUser()
    const { openSignIn } = useApp()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [reported, setReported] = useState(false)

    const handleClick = () => {
        if (!user) {
            openSignIn(() => {
                setShowConfirmation(true)
            })
            return
        }
        setShowConfirmation(true)
    }

    const handleConfirm = async () => {
        await reportSpam(type, id)
        setShowConfirmation(false)
        setReported(true)
    }

    const handleCancel = () => {
        setShowConfirmation(false)
    }

    if (reported) {
        return <span className="text-sm text-secondary flex items-center">Reported. Thanks!</span>
    }

    if (showConfirmation) {
        return (
            <div className="flex items-center">
                <span className="text-sm text-secondary">Are you sure?</span>
                <button
                    onClick={handleConfirm}
                    className="text-red dark:text-yellow font-semibold text-sm py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50 ml-1"
                >
                    Yes
                </button>
                <button
                    onClick={handleCancel}
                    className="text-secondary font-semibold text-sm py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                >
                    Cancel
                </button>
            </div>
        )
    }

    const button = (
        <OSButton
            onClick={handleClick}
            hover={label ? 'background' : 'border'}
            size={label ? 'sm' : 'md'}
            icon={<IconWarning />}
        >
            {label}
        </OSButton>
    )

    if (label) return button

    return (
        <Tooltip trigger={button} delay={0}>
            Report spam
        </Tooltip>
    )
}
