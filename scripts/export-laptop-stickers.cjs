const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const source = path.resolve(__dirname, '../src/components/Stickers/Stickers.tsx')
const artwork = new Module(source, module)
artwork.filename = source
artwork.paths = module.paths
artwork._compile(
    ts.transpileModule(fs.readFileSync(source, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText,
    source
)
const directory = path.resolve(__dirname, '../static/stickers/laptop')
fs.mkdirSync(directory, { recursive: true })
for (const [key, name] of Object.entries({
    coffee: 'Coffee',
    pizza: 'Pizza',
    pineapple: 'Pineapple',
    'palm-tree': 'PalmTree',
    laptop: 'Laptop',
    robot: 'Robot',
    terminal: 'Terminal',
    cloud: 'Cloud',
})) {
    fs.writeFileSync(
        path.join(directory, `${key}.svg`),
        renderToStaticMarkup(React.createElement(artwork.exports[`Sticker${name}`], { width: 512, height: 512 }))
    )
}
