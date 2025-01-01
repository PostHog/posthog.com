import React, { useEffect, useRef } from 'react'
import useInkeepSettings from 'hooks/useInkeepSettings'

export default function InkeepEmbeddedChat(): JSX.Element {
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const embeddedChatRef = useRef(null)

    useEffect(() => {
        import('@inkeep/uikit-js').then((inkeepJS) => {
            const inkeep = inkeepJS.Inkeep(baseSettings)

            embeddedChatRef.current = inkeep.embed({
                componentType: 'EmbeddedChat',
                targetElement: '#embedded-chat-target',
                properties: {
                    baseSettings,
                    aiChatSettings,
                },
            })
        })
    }, [])

    return <div id="embedded-chat-target" className="flex-grow h-full" />
}
