import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const files = await glob('contents/**/*.{md,mdx}')
for (const file of files) {
    const fm = matter.read(file)
    const icon = fm.data.icon
    if (icon) {
        const imagePath = `/${path.join(path.dirname(file), icon)}`
        fm.data.icon = `https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/${imagePath.replace(
            '/contents/',
            ''
        )}`
        const newContent = matter.stringify(fm.content, fm.data)
        fs.writeFileSync(file, newContent)
    }
}
