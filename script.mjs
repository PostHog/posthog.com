import { glob } from 'glob'
import fs from 'fs'

const files = await glob('contents/**/*.{jpg,jpeg,png,gif}')

files.forEach((file) => {
    console.log(file)
    fs.unlinkSync(file) // Delete the file
    console.log('Deleted:', file)
})
