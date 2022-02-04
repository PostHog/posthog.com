// Replacing '/' would result in empty string which is invalid
const replacePath = (path) => (path === `/` ? path : path.replace(/\/$/, ``))

function flattenMenu(items, breadcrumb = []) {
    return items.reduce((acc, item) => {
        if (item.url) {
            acc.push({ url: item.url, title: item.title, breadcrumb })
        }
        if (item.children) {
            acc.push(
                ...flattenMenu(item.children, [
                    ...breadcrumb,
                    { title: item.title, url: item.url || item.children[0].url },
                ])
            )
        }
        return acc
    }, [])
}

module.exports = {
    replacePath,
    flattenMenu,
}
