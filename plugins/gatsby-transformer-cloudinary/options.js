let options = {};

exports.initializaGlobalState = (_, pluginOptions) => {
  // Make options available for createRemoteImageNode
  // as it can be used outside of gatsby-node lifecycle hooks
  Object.assign(options, pluginOptions);
};

exports.getPluginOptions = () => {
  return options;
};

exports.getCoreSupportsOnPluginInit = () => {
  let coreSupportsOnPluginInit = undefined;
  try {
    const { isGatsbyNodeLifecycleSupported } = require(`gatsby-plugin-utils`);
    if (isGatsbyNodeLifecycleSupported(`onPluginInit`)) {
      coreSupportsOnPluginInit = 'stable';
    } else if (isGatsbyNodeLifecycleSupported(`unstable_onPluginInit`)) {
      coreSupportsOnPluginInit = 'unstable';
    }
  } catch (error) {
    console.error(
      `[gatsby-transformer-cloudinary] Cannot check if Gatsby supports onPluginInit`
    );
  }
  return coreSupportsOnPluginInit;
};
