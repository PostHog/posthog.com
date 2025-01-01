import React, { useEffect, useRef, useState } from 'react'
import useInkeepSettings from 'hooks/useInkeepSettings'
import { DotLottiePlayer } from '@dotlottie/react-player'

export default function InkeepEmbeddedChat(): JSX.Element {
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const embeddedChatRef = useRef(null)
    const lottieRef = useRef(null)
    const [loading, setLoading] = useState(true)

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
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading && (
                <div className="flex-grow size-full flex items-center justify-center">
                    <div className="size-18">
                        <DotLottiePlayer loop lottieRef={lottieRef} src="/lotties/loading.lottie" autoplay />
                    </div>
                </div>
            )}
            <div id="embedded-chat-target" className={loading ? 'hidden' : 'flex-grow h-full'} />
        </>
    )
}
