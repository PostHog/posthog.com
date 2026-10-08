import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { JobOg } from '../../src/templates/OG/job'
import { fitRoleFontSize, ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'
import { sfBenchmark } from '../../src/components/CompensationCalculator/compensation_data/sf_benchmark'
import { levelModifier } from '../../src/components/CompensationCalculator/compensation_data/level_modifier'
import { stepModifier } from '../../src/components/CompensationCalculator/compensation_data/step_modifier'
import { locationFactor } from '../../src/components/CompensationCalculator/compensation_data/location_factor'

const require = createRequire(__filename)
const imagesDir = path.resolve(__dirname, '../../src/templates/OG/images')
const remoteHogPng = path.join(
    path.dirname(require.resolve('@posthog/brand/hoggies/png/remote-work')),
    'remote-work.png'
)

const readImage = (src: string, name: string): ImageSource => ({
    src,
    data: fs.readFileSync(path.join(imagesDir, name)),
})

export const jobImages: ImageSource[] = [
    readImage('wordmark', 'posthog-wordmark.svg'),
    readImage('grass', 'grass.jpg'),
    { src: 'remote-hog', data: fs.readFileSync(remoteHogPng) },
]

type JobNode = {
    title: string
    fields: { slug: string }
    parent?: {
        customFields?: { title: string; value?: string }[]
    } | null
}

const compactUsd = (amount: number) => `$${Math.round(amount / 1000)}K`

// Same defaults as CompensationCalculator: San Francisco, Senior, Established.
const defaultLocation = locationFactor.find(
    (location) => location.country === 'United States' && location.area === 'San Francisco, California'
)

const salaryRange = (role?: string) => {
    const benchmark = role ? sfBenchmark[role] : undefined
    if (!benchmark || !defaultLocation) return undefined

    const level = levelModifier.Senior
    const [low, high] = stepModifier.Established
    const base = benchmark * defaultLocation.locationFactor * level
    return `${compactUsd(base * low)}–${compactUsd(base * high)}`
}

export async function createJobOgImages(renderer: Renderer, jobs: JobNode[], dir: string) {
    await Promise.all(
        jobs.map((job) =>
            ogRenderLimit(async () => {
                const timezone = job.parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
                const salaryRole =
                    job.parent?.customFields?.find(({ title }) => title === 'Salary')?.value ||
                    job.title.replace(' (Remote)', '')
                const role = job.title.replace(' (Remote)', '')
                const bytes = await renderOgJpeg(
                    renderer,
                    <JobOg
                        role={role}
                        roleFontSize={await fitRoleFontSize(renderer, role)}
                        timezone={timezone}
                        salary={salaryRange(salaryRole)}
                    />,
                    jobImages
                )
                writeOgJpeg(dir, job.fields.slug, bytes)
            })
        )
    )
}
