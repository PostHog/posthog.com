import React from 'react'
import { SEO } from 'components/seo'
import Wizard from 'components/Wizard'
import { Authentication } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import EmbeddedSurvey from 'components/Docs/EmbeddedSurvey'
import ScrollArea from 'components/RadixUI/ScrollArea'

const SURVEY_ID = process.env.GATSBY_EVENTS_FEEDBACK_SURVEY_ID ?? ''

export default function EventsFeedbackForm() {
    const { user, isLoading } = useUser()
    const isPostHogTeam = !!user?.email?.endsWith('@posthog.com')

    return (
        <>
            <SEO
                title="IRL events feedback"
                description="Sign in to submit IRL events feedback"
                image="/images/og/default.png"
            />
            <Wizard>
                {!isLoading && user && isPostHogTeam ? (
                    <ScrollArea>
                        <div className="p-6 max-w-2xl mx-auto">
                            <EmbeddedSurvey surveyId={SURVEY_ID} />
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div className="max-w-xs w-full space-y-6 text-center">
                            <div className="space-y-1">
                                <h1 className="text-xl font-bold text-primary m-0">IRL events feedback</h1>
                                <p className="text-secondary text-sm m-0">
                                    Requires a <strong>@posthog.com</strong> community account.
                                </p>
                            </div>
                            {!isLoading && (
                                <>
                                    {user && !isPostHogTeam && (
                                        <p className="bg-red/10 border border-red/20 rounded p-3 text-sm text-red text-left m-0">
                                            Access is restricted to @posthog.com accounts. You're signed in as{' '}
                                            <strong>{user.email}</strong>.
                                        </p>
                                    )}
                                    {!user && (
                                        <Authentication initialView="sign-in" showBanner={false} showProfile={false} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Wizard>
        </>
    )
}
