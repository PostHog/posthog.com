import React from 'react'
import { StepList, StepDef } from '../../_snippets/StepList'
import { CallToAction } from 'components/CallToAction'
import InstallCLI from './nextjs/install-cli.mdx'
import OutputSourceMaps from './nextjs/output-source-maps.mdx'
import InjectSourceMap from './nextjs/inject-source-map.mdx'
import UploadSourceMap from './nextjs/upload-source-map.mdx'

const steps: StepDef[] = [
    {
        title: 'Install the PostHog CLI',
        goal: 'Install the PostHog CLI tool (included in the Next.js package).',
        required: 'required',
        content: <InstallCLI />,
    },
    {
        title: 'Output source maps for your framework',
        goal: 'Configure Next.js to generate source maps and set up automatic processing.',
        required: 'required',
        content: <OutputSourceMaps />,
    },
    {
        title: 'Inject source map',
        goal: 'Automatically inject metadata during the build process.',
        required: 'required',
        content: <InjectSourceMap />,
    },
    {
        title: 'Upload source map',
        goal: 'Automatically upload source maps to PostHog during build.',
        required: 'required',
        content: (
            <div>
                <UploadSourceMap />
            </div>
        ),
    },
]

export default function NextJSUploadSourceMaps() {
    return <StepList steps={steps} />
}
