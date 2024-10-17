const fs = require('fs')
const path = require('path')
const { glob } = require('glob')

// Base URL for new image paths
const baseURL = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/'

// Function to update image paths
function updateImagePaths(content, filePath) {
    const regex = /<StaticImage[^>]*\s+src=["']([^"']+)["']/g
    return content.replace(regex, (match, p1) => {
        const relativePath = path.relative(process.cwd(), path.resolve(path.dirname(filePath), p1))
        const newPath = `${baseURL}${relativePath}`
        return match.replace(p1, newPath)
    })
}

// Function to replace <StaticImage with <CloudinaryImage and add import statement
function replaceStaticImageWithCloudinaryImage(content) {
    const importStatement = "import CloudinaryImage from 'components/CloudinaryImage'\n"
    const hasImport = content.includes(importStatement)
    const updatedContent = content.replace(/<StaticImage/g, '<CloudinaryImage')
    return hasImport ? updatedContent : importStatement + updatedContent
}

glob('src/**/*.{js,ts,tsx}').then((files) => {
    // Update files to replace <StaticImage with <CloudinaryImage and add import statement
    files.forEach((file) => {
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err)
                return
            }

            if (!content.includes('<StaticImage')) {
                return
            }

            let updatedContent = updateImagePaths(content, file)
            updatedContent = replaceStaticImageWithCloudinaryImage(updatedContent)

            fs.writeFile(file, updatedContent, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file ${file}:`, err)
                } else {
                    console.log(`Updated image paths and replaced <StaticImage> in ${file}`)
                }
            })
        })
    })
})
