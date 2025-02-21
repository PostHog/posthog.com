import React, { useEffect, useRef } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { useChat } from 'hooks/useChat'

export default function InkeepEmbeddedChat(): JSX.Element {
    const lottieRef = useRef(null)
    const { loading, renderChat } = useChat()

    useEffect(() => {
        renderChat('#embedded-chat-target')
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
