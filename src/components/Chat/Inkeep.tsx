import React, { useEffect, useRef, useState } from 'react'
import useInkeepSettings from 'hooks/useInkeepSettings'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { AIChatFunctions } from '@inkeep/uikit'

export default function InkeepEmbeddedChat(): JSX.Element {
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const embeddedChatRef = useRef<AIChatFunctions | null>(null)
    const lottieRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)

    useEffect(() => {
        import('@inkeep/uikit-js').then((inkeepJS) => {
            const inkeep = inkeepJS.Inkeep(baseSettings)

            embeddedChatRef.current = inkeep.embed({
                componentType: 'EmbeddedChat',
                targetElement: '#embedded-chat-target',
                properties: {
                    baseSettings: {
                        ...baseSettings,
                        logEventCallback: (event) => {
                            if (!hasFirstResponse && event?.eventName === 'chat_message_bot_response_received') {
                                setHasFirstResponse(true)
                            }
                        },
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
                    el.innerHTML = `Not what you were looking for? Try <a target="_blank" style="text-decoration: underline;" href="/questions">posting a community question</a>.`
                    chatBubbleActions.insertAdjacentElement('beforebegin', el)
                }
            }
        }
    }, [hasFirstResponse])

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
