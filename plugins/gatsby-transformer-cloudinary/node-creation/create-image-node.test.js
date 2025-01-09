const { createImageNode } = require('./create-image-node');

jest.mock('../options');
const { getPluginOptions } = require('../options');

describe('createImageNode', () => {
  function getDefaultArgs(args) {
    return {
      cloudinaryUploadResult: {},
      parentNode: {},
      createContentDigest: jest.fn(),
      createNodeId: jest.fn(),
      ...args,
    };
  }

  function getDefaultOptions(options) {
    return {
      ...options,
    };
  }

  it('sets the cloud name', async () => {
    const options = getDefaultOptions({ cloudName: 'cloudName' });
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs();
    const actual = createImageNode(args);

    const expected = { cloudName: 'cloudName' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the public ID', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      cloudinaryUploadResult: { public_id: 'public-id' },
    });
    const actual = createImageNode(args);

    const expected = { publicId: 'public-id' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the version', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      cloudinaryUploadResult: { version: 'version' },
    });
    const actual = createImageNode(args);

    const expected = { version: 'version' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the original height', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      cloudinaryUploadResult: { height: 'originalHeight' },
    });
    const actual = createImageNode(args);

    const expected = { originalHeight: 'originalHeight' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the original width', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      cloudinaryUploadResult: { width: 'originalWidth' },
    });
    const actual = createImageNode(args);

    const expected = { originalWidth: 'originalWidth' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the defaultBase64 image', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      defaultBase64: 'defaultBase64',
    });
    const actual = createImageNode(args);

    const expected = { defaultBase64: 'defaultBase64' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the defaultTracedSVG image', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      defaultTracedSVG: 'defaultTracedSVG',
    });
    const actual = createImageNode(args);

    const expected = { defaultTracedSVG: 'defaultTracedSVG' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('creates a node ID', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const createNodeId = jest.fn((createNodeIdArg) => {
      expect(createNodeIdArg).toEqual(
        'CloudinaryAsset-{"cloudName":"cloudName","height":100,"public_id":"public_id","version":7,"width":200}'
      );
      return 'createNodeIdResult';
    });
    const args = getDefaultArgs({
      createNodeId,
      cloudinaryUploadResult: {
        height: 100,
        public_id: 'public_id',
        version: 7,
        width: 200,
      },
      cloudName: 'cloudName',
    });
    const actual = createImageNode(args);

    const expected = { id: 'createNodeIdResult' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('sets the parent', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const args = getDefaultArgs({
      parentNode: { id: 'parentNodeId' },
    });
    const actual = createImageNode(args);

    const expected = { parent: 'parentNodeId' };
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('creates the content digest', async () => {
    const options = getDefaultOptions();
    getPluginOptions.mockReturnValue(options);

    const cloudinaryUploadResult = {
      height: 100,
      public_id: 'public_id',
      version: 7,
      width: 200,
    };

    const createContentDigest = jest.fn((createContentDigestArg) => {
      expect(createContentDigestArg).toEqual(cloudinaryUploadResult);
      return 'createContentDigestResult';
    });
    const args = getDefaultArgs({
      createContentDigest,
      cloudinaryUploadResult,
      cloudName: 'cloudName',
    });
    const actual = createImageNode(args);

    const expected = {
      internal: {
        type: 'CloudinaryAsset',
        contentDigest: 'createContentDigestResult',
      },
    };
    expect(actual).toEqual(expect.objectContaining(expected));
  });
});
