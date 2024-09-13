const cloudinary = require('cloudinary').v2;
const { getPluginOptions } = require('../options');

let totalImages = 0;
let uploadedImages = 0;

const FIVE_MINUTES = 5 * 60 * 1000;

exports.uploadImageToCloudinary = async ({
  url,
  publicId,
  overwrite,
  reporter,
}) => {
  verifyRequiredOptions(reporter);

  const { apiKey, apiSecret, cloudName, uploadFolder } = getPluginOptions();

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const uploadOptions = {
    folder: uploadFolder,
    overwrite,
    public_id: publicId,
    resource_type: 'auto',
    timeout: FIVE_MINUTES,
  };

  let attempts = 1;

  totalImages++;

  while (true) {
    try {
      const result = await cloudinary.uploader.upload(url, uploadOptions);
      uploadedImages++;
      if (
        uploadedImages == totalImages ||
        uploadedImages % Math.ceil(totalImages / 100) == 0
      )
        reporter.info(
          `[gatsby-transformer-cloudinary] Uploaded ${uploadedImages} of ${totalImages} images to Cloudinary. (${Math.round(
            (100 * uploadedImages) / totalImages
          )}%)`
        );
      return result;
    } catch (error) {
      const stringifiedError = JSON.stringify(error, null, 2);
      if (attempts < 3) {
        attempts += 1;
        reporter.warn(
          `An error occurred when uploading ${url} to Cloudinary: ${stringifiedError}`
        );
      } else {
        reporter.panic(
          `Unable to upload ${url} to Cloudinary after ${attempts} attempts: ${stringifiedError}`
        );
      }
    }
  }
};

exports.uploadImageNodeToCloudinary = async ({ node, reporter }) => {
  const url = node.absolutePath;
  const relativePathWithoutExtension = node.relativePath.replace(
    /\.[^.]*$/,
    ''
  );
  const publicId = relativePathWithoutExtension;
  const overwrite = getPluginOptions().overwriteExisting;
  const result = await exports.uploadImageToCloudinary({
    url,
    publicId,
    overwrite,
    reporter,
  });
  return result;
};

function verifyRequiredOptions(reporter) {
  const requiredOptions = ['apiKey', 'apiSecret', 'cloudName'];
  const pluginOptions = getPluginOptions();
  requiredOptions.forEach((optionKey) => {
    if (pluginOptions[optionKey] == null) {
      reporter.panic(
        `[gatsby-transformer-cloudinary] "${optionKey}" is a required plugin option. You can add it to the options object for "gatsby-transformer-cloudinary" in your gatsby-config file.`
      );
    }
  });
}
