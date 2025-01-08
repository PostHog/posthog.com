import React, { useEffect, useRef, useState } from 'react'
import useInkeepSettings from 'hooks/useInkeepSettings'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { AIChatFunctions } from '@inkeep/uikit'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import { useChat } from 'hooks/useChat'

export default function InkeepEmbeddedChat(): JSX.Element {
    const { websiteTheme } = useValues(layoutLogic)
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const { chatOpen, setHasUnread } = useChat()
    const embeddedChatRef = useRef<AIChatFunctions | null>(null)
    const lottieRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)

    const logEventCallback = (event: any) => {
        if (event?.eventName === 'chat_message_bot_response_received') {
            if (!hasFirstResponse) {
                setHasFirstResponse(true)
            }
            if (!chatOpen) {
                setHasUnread(true)
            }
        }
    }

    useEffect(() => {
        import('@inkeep/uikit-js').then((inkeepJS) => {
            const inkeep = inkeepJS.Inkeep(baseSettings)

            embeddedChatRef.current = inkeep.embed({
                componentType: 'EmbeddedChat',
                targetElement: '#embedded-chat-target',
                properties: {
                    baseSettings: {
                        ...baseSettings,
                        logEventCallback,
                    },
                    aiChatSettings,
                },
            })
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (hasFirstResponse && embeddedChatRef.current) {
            const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
            if (shadowRoot) {
                const chatBubbleActions = shadowRoot.querySelector('.ikp-chat-bubble__message-actions')
                if (chatBubbleActions) {
                    const el = document.createElement('p')
                    el.classList.add('community-suggestion')
                    el.innerHTML = `<strong style="display: block; font-size: .933rem;">Not the answer you were looking for?</strong> Try <a target="_blank" style="text-decoration: underline;" href="/questions"><strong>posting a community question</strong></a> and humans may respond!`
                    chatBubbleActions.insertAdjacentElement('beforebegin', el)
                }
            }
        }
    }, [hasFirstResponse])

    useEffect(() => {
        if (embeddedChatRef.current) {
            embeddedChatRef.current.render({
                baseSettings: {
                    colorMode: {
                        forcedColorMode: websiteTheme === 'dark' ? 'dark' : 'light',
                    },
                },
            })
        }
    }, [websiteTheme])

    useEffect(() => {
        if (embeddedChatRef.current) {
            embeddedChatRef.current.render({
                baseSettings: {
                    logEventCallback,
                },
            })
        }
    }, [chatOpen, hasFirstResponse])

    useEffect(() => {
        if (chatOpen) {
            setHasUnread(false)
        }
    }, [chatOpen])

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
