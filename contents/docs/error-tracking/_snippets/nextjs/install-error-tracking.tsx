import React from 'react'
import Step1 from './steps/step1-install-web-sdk.mdx'
import Step2 from './steps/step2-capture-client-exceptions.mdx'
import Step3 from './steps/step3-install-node-sdk.mdx'
import Step4 from './steps/step4-capture-server-exceptions.mdx'
import Step5 from './steps/step5-upload-source-maps.mdx'
import { StepList, StepDef } from '../StepList'

const steps: StepDef[] = [
    {
        title: 'Installing PostHog web SDK',
        goal: 'Install the PostHog web JavaScript SDK.',
        required: 'required',
        content: <Step1 />,
    },
    {
        title: 'Capturing client-side exceptions',
        goal: 'Capture your first client-side exception event.',
        required: 'required',
        content: <Step2 />,
    },
    {
        title: 'Installing PostHog Node.js SDK',
        goal: 'Install the PostHog Node.js SDK.',
        required: 'required',
        content: <Step3 />,
    },
    {
        title: 'Capturing server-side exceptions',
        goal: 'Capture your first server-side exception event.',
        required: 'required',
        content: <Step4 />,
    },
    {
        title: 'Next steps',
        content: <Step5 />,
    },
]

export default function NextJSErrorTrackingSteps() {
    return <StepList steps={steps} />
}
