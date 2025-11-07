import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useApp } from '../../context/App'

export default function InkeepEmbeddedChat(): JSX.Element {
    const chatFunctionsRef = useRef(null)
    const lottieRef = useRef(null)
    const [initialQuestionAsked, setInitialQuestionAsked] = useState(false)
    const [chatRefReady, setChatRefReady] = useState(false)
    const { EmbeddedChat, aiChatSettings, baseSettings, initialQuestion } = useChat()
    const { isMobile, windows, closeWindow } = useApp()

    const Container = isMobile ? ScrollArea : React.Fragment

    const setChatFunctionsRef = useCallback((instance: any) => {
        chatFunctionsRef.current = instance
        setChatRefReady(true)
    }, [])

    useEffect(() => {
        if (initialQuestion && !initialQuestionAsked && chatRefReady) {
            chatFunctionsRef.current?.submitMessage?.(initialQuestion)
            setInitialQuestionAsked(true)
            const searchWindow = windows.find((w) => w.key === 'search')
            if (searchWindow) {
                closeWindow(searchWindow)
            }
        }
    }, [chatRefReady])

    return (
        <>
            {EmbeddedChat ? (
                <div id="embedded-chat-target" className="h-full">
                    <Container>
                        <EmbeddedChat
                            aiChatSettings={{ ...aiChatSettings, chatFunctionsRef: setChatFunctionsRef }}
                            baseSettings={baseSettings}
                        />
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
