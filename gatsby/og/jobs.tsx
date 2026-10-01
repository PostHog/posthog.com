import fs from 'fs'
import path from 'path'
import React from 'react'
import pLimit from 'p-limit'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { JobOg } from '../../src/templates/OG/job'
import { renderOgJpeg, writeOgJpeg } from './takumi'

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

// One renderer is shared, so job cards render one at a time.
const limit = pLimit(1)

export async function createJobOgImages(renderer: Renderer, jobs: JobNode[], dir: string) {
    await Promise.all(
        jobs.map((job) =>
            limit(async () => {
                const timezone = job.parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
                const bytes = await renderOgJpeg(
                    renderer,
                    <JobOg role={job.title.replace(' (Remote)', '')} timezone={timezone} />,
                    jobImages
                )
                writeOgJpeg(dir, job.fields.slug, bytes)
            })
        )
    )
}
