import * as React from 'react'
import { useEffect, useState } from 'react'
import useInkeepSettings from 'hooks/useInkeepSettings'
import { InkeepEmbeddedChatProps } from '@inkeep/uikit'

export default function InkeepEmbeddedChat() {
    const [EmbeddedChat, setEmbeddedChat] = useState<React.FC<InkeepEmbeddedChatProps> | null>(null)

    const { baseSettings, aiChatSettings } = useInkeepSettings()

    useEffect(() => {
        const loadEmbeddedChat = async () => {
            try {
                const { InkeepEmbeddedChat } = await import('@inkeep/uikit')
                setEmbeddedChat(() => InkeepEmbeddedChat)
            } catch (error) {
                console.error('Failed to load EmbeddedChat:', error)
            }
        }

        loadEmbeddedChat()
    }, [])

    const embeddedChatProps = {
        baseSettings,
        aiChatSettings,
    }

    return EmbeddedChat && <EmbeddedChat {...embeddedChatProps} />
}
