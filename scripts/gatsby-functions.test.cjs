const assert = require('node:assert/strict')
const { readdirSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const babel = require('@babel/core')

const functionsDir = path.resolve(__dirname, '../src/api')
for (const file of readdirSync(functionsDir).filter((name) => name.endsWith('.ts'))) {
    test(`Gatsby Functions can compile ${file} from the project root`, () => {
        // Gatsby 4 passes this preset name to babel-loader. Babel resolves it
        // from cwd, so Gatsby's transitive dependency is insufficient with pnpm.
        const result = babel.transformFileSync(path.join(functionsDir, file), {
            presets: ['@babel/typescript'],
            babelrc: false,
            configFile: false,
        })
        assert.ok(result.code.length)
    })
}
