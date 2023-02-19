import fs from 'fs'
import path from 'path'
import { GatsbyNode } from 'gatsby'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
    const {
        data: [careersPage],
    } = await fetch(`${process.env.STRAPI_URL}/api/pages?populate=*&filters[slug][$eq]=/careers`, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
    }).then((res) => res.json())
    if (careersPage) {
        const url = careersPage?.attributes?.ogImage?.data?.attributes?.url
        if (!url) return
        const dir = path.resolve(__dirname, '../public/og-images')
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        const response = await fetch(`${process.env.STRAPI_URL}${url}`)
        const blob = await response.blob()
        const arrayBuffer = await blob.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFileSync(`${dir}/careers.jpeg`, buffer)
    }
}
