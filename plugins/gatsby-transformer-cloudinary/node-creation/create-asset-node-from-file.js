const { uploadImageNodeToCloudinary } = require('./upload');
const { createImageNode } = require('./create-image-node');

const ALLOWED_MEDIA_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

exports.createAssetNodeFromFile = async (gatsbyUtils, pluginOptions) => {
  const {
    node,
    actions: { createNode, createParentChildLink },
    createNodeId,
    createContentDigest,
    reporter,
  } = gatsbyUtils;

  const { uploadSourceInstanceNames } = pluginOptions || {};

  if (!ALLOWED_MEDIA_TYPES.includes(node.internal.mediaType)) {
    return;
  }

  if (
    uploadSourceInstanceNames &&
    !uploadSourceInstanceNames.includes(node.sourceInstanceName)
  ) {
    return;
  }

  const cloudinaryUploadResult = await uploadImageNodeToCloudinary({
    node,
    reporter,
  });

  const imageNode = createImageNode({
    cloudinaryUploadResult,
    parentNode: node,
    createContentDigest,
    createNode,
    createNodeId,
  });

  // Add the new node to Gatsby’s data layer.
  createNode(imageNode);

  // Tell Gatsby to add `childCloudinaryAsset` to the parent `File` node.
  createParentChildLink({
    parent: node,
    child: imageNode,
  });

  return imageNode;
};
