import React from 'react'
import { StepList, StepDef } from '../../_snippets/StepList'
import { CallToAction } from 'components/CallToAction'
import InstallCLI from './nuxt/install-cli.mdx'
import OutputSourceMaps from './nuxt/output-source-maps.mdx'
import InjectSourceMap from './nuxt/inject-source-map.mdx'
import UploadSourceMap from './nuxt/upload-source-map.mdx'

const steps: StepDef[] = [
    {
        title: 'Install the PostHog CLI',
        goal: 'Install the PostHog CLI tool.',
        required: 'required',
        content: <InstallCLI />,
    },
    {
        title: 'Output source maps for your framework',
        goal: 'Configure Nuxt to generate source maps during build.',
        required: 'required',
        content: <OutputSourceMaps />,
    },
    {
        title: 'Inject source map',
        goal: 'Inject metadata into source maps to associate them with your code.',
        required: 'required',
        content: <InjectSourceMap />,
    },
    {
        title: 'Upload source map',
        goal: 'Upload the injected source maps to PostHog during build.',
        required: 'required',
        content: (
            <div>
                <UploadSourceMap />
            </div>
        ),
    },
]

export default function NuxtUploadSourceMaps() {
    return <StepList steps={steps} />
}
