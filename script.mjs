import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const files = await glob('contents/**/*.{jpg,jpeg,png,gif,mp4,avi,mov}')
for (const file of files) {
    fs.unlinkSync(file)
}
