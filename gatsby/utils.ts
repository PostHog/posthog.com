// Replacing '/' would result in empty string which is invalid
export const replacePath = (path: string) => (path === `/` ? path : path.replace(/\/$/, ``))

export function flattenMenu(items, breadcrumb = []) {
    return items.reduce((acc, item) => {
        if (item.url) {
            acc.push({
                url: item.url,
                name: item.name,
                breadcrumb: [...breadcrumb, { url: item.url, name: item.name }],
            })
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

export const stripFrontmatter = (body: string) => {
    return body.replace(/^---[\s\S]*?---\n*/m, '')
}
