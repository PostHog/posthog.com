const pageChunksExcludedFromDevelopHtml = new Proxy(
    {},
    {
        get(_, componentChunkName) {
            if (typeof componentChunkName !== 'string') {
                return undefined
            }
            throw new Error(
                `${componentChunkName} needs its page chunk in the develop-html bundle (getServerData or config export). ` +
                    'Remove the develop-html async-requires replacement in gatsby-node.ts.'
            )
        },
    }
)

export default {
    components: pageChunksExcludedFromDevelopHtml,
    head: pageChunksExcludedFromDevelopHtml,
}
