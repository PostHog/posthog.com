import React from 'react'
import { StepList, StepDef } from '../../_snippets/StepList'
import InstallCLI from './install-cli.mdx'
import OutputSourceMaps from './output-source-maps.mdx'
import InjectSourceMap from './inject-source-map.mdx'
import UploadSourceMap from './upload-source-map.mdx'

const steps: StepDef[] = [
    {
        title: 'Install the PostHog CLI',
        goal: 'Get the CLI tool or framework-specific package.',
        required: 'required',
        content: <InstallCLI />,
    },
    {
        title: 'Output source maps for your framework',
        goal: 'Configure your build to generate source maps.',
        required: 'required',
        content: <OutputSourceMaps />,
    },
    {
        title: 'Inject source map',
        goal: 'Add metadata to associate maps with your code.',
        required: 'required',
        content: <InjectSourceMap />,
    },
    {
        title: 'Upload source map',
        goal: 'Send the processed source maps to PostHog.',
        required: 'required',
        content: <UploadSourceMap />,
    },
]

export default function UploadSourceMapsOverview() {
    return <StepList steps={steps} />
}
