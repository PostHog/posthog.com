import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const files = await glob('contents/**/*.{md,mdx}')
for (const file of files) {
    const fm = matter.read(file)
    const logoDark = fm.data.logoDark
    if (logoDark) {
        const imagePath = `/${path.join(path.dirname(file), logoDark)}`
        fm.data.logoDark = `https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/${imagePath.replace(
            '/contents/',
            ''
        )}`
        const newContent = matter.stringify(fm.content, fm.data)
        fs.writeFileSync(file, newContent)
    }
}
