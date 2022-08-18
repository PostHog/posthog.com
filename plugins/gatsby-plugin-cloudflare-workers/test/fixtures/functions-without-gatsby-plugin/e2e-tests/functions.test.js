const { runTests } = require('./test-helpers')

if (process.env.TEST_ENV === 'netlify') {
    const { deploy_url } = require('../deployment.json')
    runTests('Netlify', deploy_url)
} else {
    runTests('Local', 'http://localhost:8888')
}
