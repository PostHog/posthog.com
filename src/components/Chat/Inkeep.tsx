import React, { useEffect, useRef } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'

export default function InkeepEmbeddedChat(): JSX.Element {
    const lottieRef = useRef(null)
    const { loading, renderChat, EmbeddedChat, aiChatSettings, baseSettings } = useChat()

    useEffect(() => {
        renderChat()
    }, [])

    return (
        <>
            {EmbeddedChat ? (
                <div id="embedded-chat-target" className="h-[500px]">
                    <EmbeddedChat aiChatSettings={aiChatSettings} baseSettings={baseSettings} />
                </div>
            ) : (
                <div className="flex-grow size-full flex items-center justify-center">
                    <div className="size-18">
                        <DotLottiePlayer loop lottieRef={lottieRef} src="/lotties/loading.lottie" autoplay />
                    </div>
                </div>
            )}
        </>
    )
}
