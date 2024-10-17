const fs = require('fs')
const path = require('path')
const { glob } = require('glob')

// Base URL for new image paths
const baseURL = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/'

// Function to update image paths
function updateImagePaths(content, filePath) {
    const regex = /<StaticImage\s+src=["']([^"']+)["']/g
    return content.replace(regex, (match, p1) => {
        const relativePath = path.relative(process.cwd(), path.resolve(path.dirname(filePath), p1))
        const newPath = `${baseURL}${relativePath}`
        return match.replace(p1, newPath)
    })
}

// Find all .tsx files in the project

glob('src/**/*.{js,ts,tsx}').then((files) => {
    files.forEach((file) => {
        console.log(file)
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err)
                return
            }

            const updatedContent = updateImagePaths(content, file)

            fs.writeFile(file, updatedContent, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file ${file}:`, err)
                } else {
                    console.log(`Updated image paths in ${file}`)
                }
            })
        })
    })
    console.log('All image paths updated successfully')
})
