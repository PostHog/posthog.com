const {
  initializaGlobalState,
  getCoreSupportsOnPluginInit,
} = require('./options');
const {
  createCloudinaryAssetType,
  createCloudinaryAssetNodes,
} = require('./node-creation');

const { createGatsbyImageDataResolver } = require('./gatsby-plugin-image');

let coreSupportsOnPluginInit = getCoreSupportsOnPluginInit();

if (coreSupportsOnPluginInit === 'stable') {
  exports.onPluginInit = initializaGlobalState;
} else if (coreSupportsOnPluginInit === 'unstable') {
  exports.unstable_onPluginInit = initializaGlobalState;
} else {
  exports.onPreInit = initializaGlobalState;
}

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    cloudName: Joi.string(),
    apiKey: Joi.string(),
    apiSecret: Joi.string(),
    uploadFolder: Joi.string(),
    uploadSourceInstanceNames: Joi.array().items(Joi.string()),
    transformTypes: Joi.array()
      .items(Joi.string())
      .default(['CloudinaryAsset']),
    overwriteExisting: Joi.boolean().default(false),
    defaultTransformations: Joi.array()
      .items(Joi.string())
      .default(['c_fill', 'g_auto', 'q_auto']),
  });
};

exports.createSchemaCustomization = (gatsbyUtils) => {
  // Type to be used for node creation
  createCloudinaryAssetType(gatsbyUtils);
};

exports.createResolvers = (gatsbyUtils, pluginOptions) => {
  // Resolvers to be used with gatsby-plugin-image
  createGatsbyImageDataResolver(gatsbyUtils, pluginOptions);
};

exports.onCreateNode = async (gatsbyUtils, pluginOptions) => {
  // Upload and create Cloudinary Asset nodes if applicable
  await createCloudinaryAssetNodes(gatsbyUtils, pluginOptions);
};
