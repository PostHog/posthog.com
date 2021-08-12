import { readdirSync, lstatSync, writeFileSync } from 'fs'

const baseDir = './src/components'
const componentsToIgnore = new Set(['Layout', 'SidebarContents', 'Header', 'Menu', 'UserLogosCarousel'])

const getComponentsInDir = (dir, components = []) => {
    const dirContents = readdirSync(dir)
    let subdirectories = []
    let indexFileInDir = false
    for (let f of dirContents) {
        if (lstatSync(`${dir}/${f}`).isDirectory() && !componentsToIgnore.has(f)) {
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
    writeFileSync('./src/mdxGlobalComponents.js', imports)
}

generateFile()
