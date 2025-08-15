import React, { useRef } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'

export default function InkeepEmbeddedChat(): JSX.Element {
    const lottieRef = useRef(null)
    const { EmbeddedChat, aiChatSettings, baseSettings } = useChat()

    return (
        <>
            {EmbeddedChat ? (
                <div id="embedded-chat-target" className="h-full">
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
