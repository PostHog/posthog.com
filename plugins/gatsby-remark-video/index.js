const visit = require('unist-util-visit')
const fs = require(`fs-extra`)
const path = require(`path`)
const isRelative = require('is-relative')

module.exports = ({ markdownAST }) => {
    visit(markdownAST, `image`, (node) => {
        const fileType = node.url.split('.').pop()
        if (fileType === 'mp4') {
            node.type = `html`
            node.value = `<video autoplay loop muted playsinline src="${node.url}"></video>`
            return node
        } else {
            return null
        }
    })
    return
}
