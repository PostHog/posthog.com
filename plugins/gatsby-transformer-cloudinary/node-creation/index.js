const { createAssetNodeFromFile } = require('./create-asset-node-from-file');
const { CloudinaryAssetType } = require('./types');

exports.createCloudinaryAssetType = (gatsbyUtils) => {
  const { actions } = gatsbyUtils;
  actions.createTypes(CloudinaryAssetType);
};

exports.createCloudinaryAssetNodes = async (gatsbyUtils, pluginOptions) => {
  // Create nodes for files to be uploaded to cloudinary
  if (
    pluginOptions.apiKey &&
    pluginOptions.apiSecret &&
    pluginOptions.cloudName
  ) {
    await createAssetNodeFromFile(gatsbyUtils, pluginOptions);
  }
};
