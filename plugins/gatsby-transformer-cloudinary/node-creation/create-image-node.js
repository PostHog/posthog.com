const stringify = require('fast-json-stable-stringify');
const { getPluginOptions } = require('../options');

exports.createImageNode = ({
  cloudinaryUploadResult,
  parentNode,
  createContentDigest,
  createNodeId,
  cloudName,
  defaultBase64,
  defaultTracedSVG,
}) => {
  const { public_id, height, width, version, format } = cloudinaryUploadResult;

  const fingerprint = stringify({
    cloudName,
    height,
    public_id,
    version,
    width,
  });

  const imageNode = {
    // These helper fields are only here so the resolvers have access to them.
    // They will *not* be available via Gatsby’s data layer.
    cloudName: cloudName || getPluginOptions().cloudName,
    publicId: public_id,
    version: version,
    originalHeight: height,
    originalWidth: width,
    originalFormat: format,
    rawCloudinaryData: cloudinaryUploadResult,
    defaultBase64,
    defaultTracedSVG,

    // Add the required internal Gatsby node fields.
    id: createNodeId(`CloudinaryAsset-${fingerprint}`),
    parent: parentNode.id,
    internal: {
      type: 'CloudinaryAsset',
      // Gatsby uses the content digest to decide when to reprocess a given
      // node. We can use the Cloudinary URL to avoid doing extra work.
      contentDigest: createContentDigest(cloudinaryUploadResult),
    },
  };

  return imageNode;
};
