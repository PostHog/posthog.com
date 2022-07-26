const Slugger = require('github-slugger')

// Replacing '/' would result in empty string which is invalid
const replacePath = (path) => (path === `/` ? path : path.replace(/\/$/, ``))

function formatToc(headings) {
    const slugger = new Slugger()
    return headings.map((heading) => {
        return {
            ...heading,
            depth: heading.depth - 2,
            url: slugger.slug(heading.value),
        }
    })
}

function flattenMenu(items, breadcrumb = []) {
    return items.reduce((acc, item) => {
        if (item.url) {
            acc.push({ url: item.url, name: item.name, breadcrumb })
        }
        if (item.children) {
            acc.push(
                ...flattenMenu(item.children, [
                    ...breadcrumb,
                    { name: item.name, url: item.url || item.children[0].url },
                ])
            )
        }
        return acc
    }, [])
}

module.exports = {
    replacePath,
    flattenMenu,
    formatToc,
}
