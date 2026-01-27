import React from 'react'
import { RubyInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const RubyInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <RubyInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
