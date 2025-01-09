const {
  uploadImageToCloudinary,
  uploadImageNodeToCloudinary,
} = require('./upload');

jest.mock('../options');
jest.mock('cloudinary');

const { getPluginOptions } = require('../options');
const cloudinary = require('cloudinary').v2;

const defaultPluginOptions = {
  apiKey: 'apiKey',
  apiSecret: 'apiSecret',
  cloudName: 'cloudName',
};

describe('uploadImageToCloudinary', () => {
  function getDefaultArgs(args) {
    return {
      url: 'url',
      overwrite: 'overwrite',
      publicId: 'publicId',
      reporter: {
        info: jest.fn(),
        warn: jest.fn(),
        panic: jest.fn(),
      },
      ...args,
    };
  }

  function getDefaultOptions(options) {
    return {
      cloudName: 'cloudName',
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
      uploadFolder: 'uploadFolder',
      createDerived: false,
      ...options,
    };
  }

  it('configures cloudinary with the appropriate plugin options', async () => {
    const cloudinaryConfig = jest.fn();
    cloudinary.config = cloudinaryConfig;

    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs();
    await uploadImageToCloudinary(args);

    const expected = {
      cloud_name: options.cloudName,
      api_key: options.apiKey,
      api_secret: options.apiSecret,
    };
    expect(cloudinaryConfig).toHaveBeenCalledWith(expected);
  });

  it('overwrites when passed overwrite:true', async () => {
    const cloudinaryUpload = jest.fn();
    cloudinary.uploader.upload = cloudinaryUpload;

    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({ overwrite: true });
    await uploadImageToCloudinary(args);

    const expectedUrl = args.url;
    const expectedOptions = {
      folder: options.uploadFolder,
      overwrite: true,
      public_id: args.publicId,
      resource_type: 'auto',
      timeout: 5 * 60 * 1000,
    };
    expect(cloudinaryUpload).toHaveBeenCalledWith(expectedUrl, expectedOptions);
  });

  it('returns the result returned from the Cloudinary uploader', async () => {
    const cloudinaryUpload = jest.fn();
    const cloudinaryUploadResult = 'cloudinaryUploadResult';
    cloudinaryUpload.mockReturnValue(cloudinaryUploadResult);
    cloudinary.uploader.upload = cloudinaryUpload;

    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs();
    expect(await uploadImageToCloudinary(args)).toEqual(cloudinaryUploadResult);
  });
});

describe('uploadImageNodeToCloudinary', () => {
  it("uses the image's relative path without the extension as the public ID", async () => {
    const cloudinaryUpload = jest.fn();
    cloudinary.uploader.upload = cloudinaryUpload;

    const reporter = { info: jest.fn() };
    const node = {
      relativePath: 'folder-name/image.name.with.dots.jpg',
    };

    await uploadImageNodeToCloudinary({ node, reporter });

    expect(cloudinaryUpload).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        public_id: 'folder-name/image.name.with.dots',
      })
    );
  });

  it('passes the overwrite setting from the plugin options', async () => {
    const cloudinaryUpload = jest.fn();
    cloudinary.uploader.upload = cloudinaryUpload;

    const reporter = { info: jest.fn() };
    const node = {
      relativePath: 'relativePath.jpg',
    };
    const overwriteExisting = 'overwriteExistingDouble';
    getPluginOptions.mockReturnValue({
      ...defaultPluginOptions,
      overwriteExisting,
    });

    await uploadImageNodeToCloudinary({ node, reporter });

    expect(cloudinaryUpload).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        overwrite: overwriteExisting,
      })
    );
  });

  it('requires the apiKey option', async () => {
    const reporter = {
      panic: jest.fn(() => {
        throw Error();
      }),
    };
    const node = { relativePath: 'relativePath.jpg' };
    getPluginOptions.mockReturnValue({
      ...defaultPluginOptions,
      apiKey: null,
    });

    try {
      await uploadImageNodeToCloudinary({ node, reporter });
    } catch {}

    expect(reporter.panic).toHaveBeenCalledWith(
      '[gatsby-transformer-cloudinary] "apiKey" is a required plugin option. You can add it to the options object for "gatsby-transformer-cloudinary" in your gatsby-config file.'
    );
  });

  it('requires the apiSecret option', async () => {
    const reporter = {
      panic: jest.fn(() => {
        throw Error();
      }),
    };
    const node = { relativePath: 'relativePath.jpg' };
    getPluginOptions.mockReturnValue({
      ...defaultPluginOptions,
      apiSecret: null,
    });

    try {
      await uploadImageNodeToCloudinary({ node, reporter });
    } catch {}

    expect(reporter.panic).toHaveBeenCalledWith(
      '[gatsby-transformer-cloudinary] "apiSecret" is a required plugin option. You can add it to the options object for "gatsby-transformer-cloudinary" in your gatsby-config file.'
    );
  });

  it('requires the cloudName option', async () => {
    const reporter = {
      panic: jest.fn(() => {
        throw Error();
      }),
    };
    const node = { relativePath: 'relativePath.jpg' };
    getPluginOptions.mockReturnValue({
      ...defaultPluginOptions,
      cloudName: null,
    });

    try {
      await uploadImageNodeToCloudinary({ node, reporter });
    } catch {}

    expect(reporter.panic).toHaveBeenCalledWith(
      '[gatsby-transformer-cloudinary] "cloudName" is a required plugin option. You can add it to the options object for "gatsby-transformer-cloudinary" in your gatsby-config file.'
    );
  });
});
