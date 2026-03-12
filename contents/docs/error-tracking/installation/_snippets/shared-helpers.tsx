import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSButton from 'components/OSButton'
import { CallToAction } from 'components/CallToAction'

/**
 * Adds the "Verify error tracking" step, "Upload source maps" step, and "Next steps" step to an array of steps
 * Also removes any existing verify steps from the onboarding content since we have our own flavors
 * Note: For error tracking, we don't have a next steps component yet,
 * but this follows the same pattern as experiments for consistency
 */
export const addNextStepsStep = (
    steps: StepDefinition[],
    platformSlug?: string,
    options?: { mappingsUrl?: string; mappingsLabel?: string }
): StepDefinition[] => {
    // Filter out any existing verify steps from onboarding content
    const filteredSteps = steps.filter(
        (step) =>
            !step.title.toLowerCase().includes('verify error tracking') &&
            !step.title.toLowerCase().includes('verify source map')
    )

    return [
        ...filteredSteps,
        {
            title: 'Verify error tracking',
            badge: 'recommended' as const,
            checkpoint: true,
            subtitle: 'Confirm events are being sent to PostHog',
            content: (
                <>
                    Before proceeding, let's make sure exception events are being captured and sent to PostHog. You
                    should see events appear in the activity feed.
                    <br />
                    <ProductScreenshot
                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250729_ouxl_f788dd8cd2.png"
                        imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250729_owae_7c3490822c.png"
                        alt="Activity feed with events"
                        classes="rounded"
                        className="mt-10"
                        padding={false}
                    />
                    <OSButton
                        asLink
                        size="sm"
                        variant="secondary"
                        to="https://app.posthog.com/activity/explore"
                        external={true}
                    >
                        Check for exceptions in PostHog
                    </OSButton>
                </>
            ),
        },
        {
            title: options?.mappingsLabel || 'Upload source maps',
            badge: 'required' as const,
            content: (
                <>
                    <p>
                        Great, you're capturing exceptions! If you serve minified bundles, the next step is to upload
                        source maps to generate accurate stack traces.
                    </p>
                    <p>Let's continue to the next section.</p>
                    <CallToAction
                        className="my-2"
                        size="sm"
                        to={
                            options?.mappingsUrl ||
                            `/docs/error-tracking/upload-source-maps${platformSlug ? `/${platformSlug}` : ''}`
                        }
                        external={true}
                    >
                        {options?.mappingsLabel || 'Upload source maps'}
                    </CallToAction>
                </>
            ),
        },
        // Next steps can be added here later if needed
    ]
}
