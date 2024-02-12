const fs = require('fs')
const path = require('path')

const baseDir = './src/components'
const mdxIgnore = fs.readFileSync(path.join(baseDir, './.mdxignore'), 'utf8')
const componentsToIgnore = new Set(mdxIgnore.split('\n'))

const getComponentsInDir = (dir, components = []) => {
    const dirContents = fs.readdirSync(dir)
    let subdirectories = []
    let indexFileInDir = false
    for (let f of dirContents) {
        if (fs.lstatSync(`${dir}/${f}`).isDirectory() && !componentsToIgnore.has(f)) {
            subdirectories.push(f)
            continue
        }
        if (!indexFileInDir && f.includes('index') && !f.includes('css')) {
            indexFileInDir = true
        }
    }
    if (!subdirectories || indexFileInDir) {
        return [...components, dir]
    }
    for (let subdir of subdirectories) {
        components = getComponentsInDir(`${dir}/${subdir}`, components)
    }
    return components
}

const generateFile = () => {
    let imports = '// AUTO GENERATED FILE \n\n'
    let componentNames = []
    for (let component of getComponentsInDir(baseDir)) {
        const destructuredPath = component.split('/')
        const relativePath = './' + destructuredPath.slice(2).join('/')
        const componentName = destructuredPath[destructuredPath.length - 1]
        imports += `import { ${componentName} } from '${relativePath}'\n`
        componentNames.push(componentName)
    }
    imports += '\nexport const shortcodes = {\n\t' + componentNames.join(',\n\t') + '\n}'
    fs.writeFileSync('./src/mdxGlobalComponents.ts', imports)
}

generateFile()
