exports.createGatsbyPluginImageResolver = (gatsbyUtils, pluginOptions) => {
  const { reporter } = gatsbyUtils;
  try {
    const {
      getGatsbyImageResolver,
    } = require('gatsby-plugin-image/graphql-utils');
    const { createResolveCloudinaryAssetData } = require('./resolve-asset');
    const { CloudinaryPlaceholderType } = require('./types');

    return getGatsbyImageResolver(
      createResolveCloudinaryAssetData(gatsbyUtils),
      {
        transformations: {
          type: '[String]',
          defaultValue: pluginOptions.defaultTransformations,
        },
        chained: '[String]',
        placeholder: {
          type: CloudinaryPlaceholderType,
        },
        secure: {
          type: 'Boolean',
          defaultValue: true,
        },
        logLevel: {
          type: 'String',
        },
      }
    );
  } catch (error) {
    reporter.warn(
      '[gatsby-transformer-cloudinary] Install and configure gatsby-plugin-image to use the new GatsbyImage component and gatsbyImageData resolver'
    );
  }
};
