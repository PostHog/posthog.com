const PLUGIN_NAME = 'gatsby-transformer-sdk-references'

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions

    // Only process JSON files from the sdkReferences source
    if (node.internal.type !== 'File' || node.sourceInstanceName !== 'sdkReferences') {
        return
    }

    console.log(`[${PLUGIN_NAME}] Processing file: ${node.relativePath}`)

    // Parse the original content
    const originalData = JSON.parse(node.internal.content)
    console.log(`[${PLUGIN_NAME}] Original name: ${originalData.name}`)

    // Transform the data by prepending 'sdk-' to the name field
    const transformedData = {
        ...originalData,
        name: originalData.name ? `sdk-${originalData.name}` : originalData.name,
    }
    console.log(`[${PLUGIN_NAME}] Transformed name: ${transformedData.name}`)

    // Create a new node for the transformed data
    const transformedNode = {
        id: createNodeId(`sdk-reference-${node.id}`),
        parent: node.id,
        internal: {
            type: 'SdkReference',
            contentDigest: createContentDigest(transformedData),
        },
        ...transformedData,
    }

    // Create the new node
    await createNode(transformedNode)
    console.log(`[${PLUGIN_NAME}] Created new node with ID: ${transformedNode.id}`)
}
