import React from 'react'
import Explorer from 'components/Explorer'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useUser } from 'hooks/useUser'
import { useApp } from '../context/App'
import SEO from 'components/seo'

export default function ArtLibrary(): JSX.Element {
    const { isModerator, user, isValidating } = useUser()
    const { openSignIn } = useApp()

    return (
        <>
            <SEO
                title="Art library"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="art-library" title="Art library" fullScreen>
                {isValidating ? (
                    <div data-scheme="secondary" className="h-full bg-primary flex items-center justify-center">
                        <div className="animate-pulse text-secondary text-sm">Loading...</div>
                    </div>
                ) : isModerator ? (
                    <iframe src="https://posthog-art-library.vercel.app" className="w-full h-full border-0" />
                ) : (
                    <ScrollArea className="min-h-0 h-full">
                        <div
                            data-scheme="primary"
                            className="mx-auto max-w-md px-4 py-16 text-center h-full flex flex-col items-center justify-center"
                        >
                            <h1 className="text-2xl font-bold mb-2">Art library</h1>
                            <p className="text-secondary mb-6">
                                {user
                                    ? 'This page is only available to moderators.'
                                    : 'Sign in to the community to access the art library.'}
                            </p>
                            {!user && (
                                <OSButton variant="primary" size="lg" onClick={() => openSignIn()}>
                                    Sign in to the community
                                </OSButton>
                            )}
                        </div>
                    </ScrollArea>
                )}
            </Explorer>
        </>
    )
}
