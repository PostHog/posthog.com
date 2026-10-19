import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'
import { useApp } from '../../context/App'

interface InkeepEmbeddedChatProps {
    codePrompt?: string
}

export default function InkeepEmbeddedChat({ codePrompt }: InkeepEmbeddedChatProps): JSX.Element {
    const chatFunctionsRef = useRef(null)
    const lottieRef = useRef(null)
    const [initialQuestionAsked, setInitialQuestionAsked] = useState(false)
    const [chatRefReady, setChatRefReady] = useState(false)
    const { EmbeddedChat, aiChatSettings, baseSettings, initialQuestion } = useChat()
    const { windows, closeWindow } = useApp()

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

    const enhancedAiChatSettings = {
        ...aiChatSettings,
        chatFunctionsRef: setChatFunctionsRef,
        syntaxHighlighter: {
            lightTheme: 'oneLight',
            darkTheme: 'vsDark',
        },
        enableMarkdownRendering: true,
        ...(codePrompt && {
            prompts: [...(aiChatSettings?.prompts || []), codePrompt],
        }),
    }

    return (
        <>
            {EmbeddedChat ? (
                <div id="embedded-chat-target" className="h-full">
                    <EmbeddedChat aiChatSettings={enhancedAiChatSettings} baseSettings={baseSettings} />
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
