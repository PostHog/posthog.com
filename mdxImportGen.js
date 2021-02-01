const fs = require('fs')

const baseDir = './src/components'

const getComponentsInDir = async (dir, components) => {
    const dirContents = fs.readdirSync(dir)
    return dirContents.filter((f) => !f.includes('.'))
}

const generateImportsForComponents = () => {
    getComponentsInDir(baseDir)
}
