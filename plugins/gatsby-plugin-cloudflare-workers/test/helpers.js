const Chance = require('chance')
const execa = require('execa')

const chance = new Chance()

module.exports.buildSite = async () => {
    const { exitCode, stdout, stderr } = await execa('netlify', ['build', '--offline'], { reject: false })
    return {
        logs: { stdout, stderr },
        success: exitCode === 0,
        severityCode: exitCode,
    }
}

module.exports.enableGatsbyExcludeDatastoreFromBundle = () => {
    process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'true'
    process.env.DEPLOY_PRIME_URL = chance.url()
}
