import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import { createCareersOG, createOGImages, createOrUpdateStrapiPosts } from '../gatsby/postBuildTasks'

dotenv.config({ path: path.resolve(process.cwd(), '.env.production') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const DATA_URL = process.env.POST_BUILD_DATA_URL || 'https://posthog.com/post-build-data.json'
const task = process.argv[2]

const fetchData = async () => {
    console.log(`Loading post-build data from ${DATA_URL}`)
    if (DATA_URL.startsWith('http://') || DATA_URL.startsWith('https://')) {
        const res = await fetch(DATA_URL)
        if (!res.ok) {
            throw new Error(`Failed to fetch ${DATA_URL}: ${res.status}`)
        }
        return res.json()
    }
    return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), DATA_URL), 'utf8'))
}

const main = async () => {
    if (task === 'strapi') {
        const data = await fetchData()
        await createOrUpdateStrapiPosts(data.allMDXPosts.nodes, data.allRoadmap.nodes)
        return
    }

    if (task === 'og') {
        const data = await fetchData()
        console.log('Creating OG images')
        await createCareersOG()
        await createOGImages(data)
        console.log('Finished creating OG images')
        return
    }

    throw new Error(`Unknown task "${task}". Use "strapi" or "og".`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
