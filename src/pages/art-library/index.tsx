import React, { useEffect, useRef } from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { useApp } from '../../context/App'
import { useUser } from '../../hooks/useUser'

const ART_PIPELINE_URL = process.env.GATSBY_ART_PIPELINE_URL || 'http://localhost:3000'

export default function ArtLibrary(): JSX.Element {
    const { websiteMode } = useApp()
    const { getJwt } = useUser()
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const iframeReadyRef = useRef(false)

    const sendToken = async () => {
        const token = await getJwt()
        if (!token) return
        iframeRef.current?.contentWindow?.postMessage({ type: 'auth', token }, new URL(ART_PIPELINE_URL).origin)
    }

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.origin !== new URL(ART_PIPELINE_URL).origin) return
            if (event.data?.type !== 'auth-ready') return
            iframeReadyRef.current = true
            sendToken()
        }

        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
    }, [])

    return (
        <>
            <SEO title="Art library - PostHog" description="Internal art library." image={`/images/og/default.png`} />
            <Explorer template="generic" slug="art-library" title="Art library" fullScreen showAddressBar={false}>
                <iframe
                    ref={iframeRef}
                    src={ART_PIPELINE_URL}
                    className={`w-full h-full border-0 ${websiteMode ? 'min-h-[calc(100vh-103px)]' : ''}`}
                    allow="clipboard-write"
                />
            </Explorer>
        </>
    )
}
