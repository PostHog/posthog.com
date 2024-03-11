import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const files = await glob('contents/**/*.{md,mdx}')

for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf-8')
    const { data, content } = matter(fileContent)
    let edited = false
    // Replace img src
    const imgSrcRegex = /<img[^>]*src="([^"]*)"[^>]*>/g
    const updatedContent = content.replace(imgSrcRegex, (match, src) => {
        if (src.startsWith('/') || src.startsWith('.')) {
            const imagePath = `/${path.join(path.dirname(file), src)}`
            const fileExtension = path.extname(src)
            const newSrc = `https://res.cloudinary.com/dmukukwp6/${
                ['.mp4', '.avi', '.mov'].includes(fileExtension) ? 'video' : 'image'
            }/upload/v1710055416/posthog.com/contents/${imagePath.replace('/contents/', '')}`
            edited = true
            return match.replace(src, newSrc)
        }
        return match
    })

    // Replace markdown image sources
    const markdownImgRegex = /!\[[^\]]*\]\(([^)]+)\)/g
    const updatedMarkdownContent = updatedContent.replace(markdownImgRegex, (match, src) => {
        if (src.startsWith('/') || src.startsWith('.')) {
            const imagePath = `/${path.join(path.dirname(file), src)}`
            const fileExtension = path.extname(src)
            const newSrc = `https://res.cloudinary.com/dmukukwp6/${
                ['.mp4', '.avi', '.mov'].includes(fileExtension) ? 'video' : 'image'
            }/upload/v1710055416/posthog.com/contents/${imagePath.replace('/contents/', '')}`
            edited = true
            return match.replace(src, newSrc)
        }
        return match
    })

    // Write the updated content back to the file
    if (edited) {
        fs.writeFileSync(file, matter.stringify(updatedMarkdownContent, data))
    }
}
