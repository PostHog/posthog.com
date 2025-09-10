import React, { useRef } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useApp } from '../../context/App'

export default function InkeepEmbeddedChat(): JSX.Element {
    const lottieRef = useRef(null)
    const { EmbeddedChat, aiChatSettings, baseSettings } = useChat()
    const { isMobile } = useApp()

    const Container = isMobile ? ScrollArea : React.Fragment

    return (
        <>
            {EmbeddedChat ? (
                <div id="embedded-chat-target" className="h-full">
                    <Container>
                        <EmbeddedChat aiChatSettings={aiChatSettings} baseSettings={baseSettings} />
                    </Container>
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
