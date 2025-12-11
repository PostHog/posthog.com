const fs = require('fs-extra')
const path = require('path')

module.exports = ({ markdownAST, markdownNode }, pluginOptions) => {
    const filePath = markdownNode.fileAbsolutePath || ''

    const outputDir = pluginOptions.outputDir || './ast-output/mdast'
    let relativePath = null

    // Process /contents/docs/ pages
    if (filePath.includes('/contents/docs/')) {
        relativePath = filePath.split('/contents/docs/')[1]
    }
    // Process gatsby-source-git docs from posthog-main-repo
    else if (filePath.includes('/gatsby-source-git/posthog-main-repo/docs/')) {
        relativePath = 'main-repo/' + filePath.split('/gatsby-source-git/posthog-main-repo/docs/')[1]
    }

    if (!relativePath) {
        return
    }

    const outputPath = path.join(outputDir, relativePath.replace(/\.mdx?$/, '.json'))

    // Include frontmatter in output
    const output = {
        frontmatter: markdownNode.frontmatter || {},
        ast: markdownAST,
    }

    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
}
