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

// A Cloudinary delivery URL can carry chained transformation segments and a version segment
// between /upload/ and the public ID, e.g. /upload/w_800,q_auto/v1712355416/folder/image.png.
// Neither is part of the public ID, so remove them before you look the asset up.
const TRANSFORMATION_PARAM = /^(?:a|ar|b|bo|c|co|cs|d|dpr|du|e|eo|f|fl|fn|g|h|l|o|pg|q|r|so|t|u|vs|w|x|y|z)_[^,/]+$/
const VERSION = /^v\d+$/

const isTransformation = (segment: string) => segment.split(',').every((param) => TRANSFORMATION_PARAM.test(param))

export const getPublicID = (image: string) => {
    const segments = image.split('/upload/')[1].split('/')
    while (segments.length > 1 && (VERSION.test(segments[0]) || isTransformation(segments[0]))) {
        segments.shift()
    }
    const imagePath = segments.join('/')
    const extension = imagePath.lastIndexOf('.')
    return extension > imagePath.lastIndexOf('/') ? imagePath.substring(0, extension) : imagePath
}

// Browser extensions inject scripts into every page they open. When one of those scripts throws,
// posthog-js autocapture sees it through window.onerror with a single "global code" frame, so the
// page path is the only thing that separates one report from the next and each new path becomes a
// new error tracking issue. posthog.com reads none of these globals, so nothing on the page is
// broken and there is nothing to fix. Match the injected global, not the message around it.
export const EXTENSION_INJECTED_EXCEPTION = /window\.ethereum|__firefox__|sendExtensionMessage\(/
