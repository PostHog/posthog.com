const pkg = require('./package.json')
const { execSync } = require('child_process')

Object.keys(pkg.dependencies)
    .concat(...Object.keys(pkg.devDependencies))
    .map((key) => {
        // see if the package is used
        try {
            execSync(
                `git grep -q "${key}" -- ./src ./functions ./plugins ./api ./gatsby gatsby-config.js gatsby-node.ts`,
                {
                    encoding: 'utf8',
                }
            )
        } catch {
            console.log(`Removing ${key}`)
        }
    })
