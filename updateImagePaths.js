const fs = require('fs')
const path = require('path')
const { glob } = require('glob')

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

            if (!content.includes('<StaticImage') || !content.match(/<StaticImage[^>]*src="https?:\/\//)) {
                return
            }

            let updatedContent = replaceStaticImageWithCloudinaryImage(content)

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
