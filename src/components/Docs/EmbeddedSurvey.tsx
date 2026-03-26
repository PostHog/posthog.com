import React, { useEffect, useRef } from 'react'

interface EmbeddedSurveyProps {
    surveyId: string
    host?: string
}

export default function EmbeddedSurvey({ surveyId, host = 'https://us.posthog.com' }: EmbeddedSurveyProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        if (!containerRef.current || iframeRef.current) return

        const iframe = document.createElement('iframe')
        iframe.id = `posthog-survey-${surveyId}`
        iframe.width = '100%'
        iframe.frameBorder = '0'
        iframe.style.cssText = 'border: none; border-radius: 12px; max-width: 720px;'

        let url = `${host}/external_surveys/${surveyId}?embed=true`
        const distinctId = (window as any).posthog?.get_distinct_id?.()
        if (distinctId) {
            url += `&distinct_id=${encodeURIComponent(distinctId)}`
        }
        iframe.src = url

        containerRef.current.appendChild(iframe)
        iframeRef.current = iframe

        const handleMessage = (e: MessageEvent) => {
            if (e.origin !== host) return
            if (e.data.type === 'posthog:survey:height' && e.data.surveyId === surveyId) {
                const height = parseInt(e.data.height, 10)
                if (height > 0 && height < 10000) {
                    iframe.style.height = `${height}px`
                }
            }
        }
        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [surveyId, host])

    return <div ref={containerRef} />
}
