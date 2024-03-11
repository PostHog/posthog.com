import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const files = await glob('contents/**/*.{md,mdx}')

for (const file of files) {
    const fm = matter.read(file)
    const split = fm.content.split('\n')
    let edited = false
    split.forEach((str, index) => {
        if (str.trim().startsWith('import') && str.includes('from')) {
            const importStr = str.split('from')[1].trim().replaceAll("'", '').replaceAll('"', '')
            const importVar = str.split(' ')[1].replace('{', '').replace('}', '')

            if (importStr.startsWith('.') || importStr.startsWith('/')) {
                const fileExtension = path.extname(importStr)

                if (['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.mov'].includes(fileExtension)) {
                    const imagePath = `/${path.join(path.dirname(file), importStr)}`
                    const cloudinaryImage = `https://res.cloudinary.com/dmukukwp6/${
                        ['.mp4', '.avi', '.mov'].includes(fileExtension) ? 'video' : 'image'
                    }/upload/v1710055416/posthog.com/contents/${imagePath.replace('/contents/', '')}`
                    split[index] = `export const ${importVar} = "${cloudinaryImage}"`
                    edited = true
                }
            }
        }
    })
    if (edited) {
        const newContent = matter.stringify(split.join('\n'), fm.data)
        fs.writeFileSync(file, newContent)
    }
}
