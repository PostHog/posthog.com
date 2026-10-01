import fs from 'fs'
import path from 'path'
import React from 'react'
import pLimit from 'p-limit'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { JobOg } from '../../src/templates/OG/job'
import { renderOgJpeg, writeOgJpeg } from './takumi'
import { sfBenchmark } from '../../src/components/CompensationCalculator/compensation_data/sf_benchmark'
import { levelModifier } from '../../src/components/CompensationCalculator/compensation_data/level_modifier'
import { stepModifier } from '../../src/components/CompensationCalculator/compensation_data/step_modifier'
import { locationFactor } from '../../src/components/CompensationCalculator/compensation_data/location_factor'

const imagesDir = path.resolve(__dirname, '../../src/templates/OG/images')

const readImage = (src: string, name: string): ImageSource => ({
    src,
    data: fs.readFileSync(path.join(imagesDir, name)),
})

const jobImages: ImageSource[] = [
    readImage('wordmark', 'posthog-wordmark.svg'),
    readImage('pin', 'pin.svg'),
    readImage('clock', 'clock.svg'),
    readImage('detective-hog', 'detective-hog.png'),
]

type JobNode = {
    title: string
    fields: { slug: string }
    parent?: {
        customFields?: { title: string; value?: string }[]
    } | null
}

const formatUsd = (amount: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount)

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
    return `${formatUsd(base * low)} - ${formatUsd(base * high)}`
}

// One renderer is shared, so job cards render one at a time.
const limit = pLimit(1)

export async function createJobOgImages(renderer: Renderer, jobs: JobNode[], dir: string) {
    await Promise.all(
        jobs.map((job) => {
            limit(async () => {
                const timezone = job.parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
                const salaryRole =
                    job.parent?.customFields?.find(({ title }) => title === 'Salary')?.value ||
                    job.title.replace(' (Remote)', '')
                const bytes = await renderOgJpeg(
                    renderer,
                    <JobOg
                        role={job.title.replace(' (Remote)', '')}
                        timezone={timezone}
                        salary={salaryRange(salaryRole)}
                    />,
                    jobImages
                )
                writeOgJpeg(dir, job.fields.slug, bytes)
            })
        })
    )
}
