const path = require('path');
const { createRemoteImageNode } = require('./create-remote-image-node');

jest.mock('./create-image-node');
jest.mock('../options');
jest.mock('./upload');

const { createImageNode } = require('./create-image-node');
const { getPluginOptions } = require('../options');
const { uploadImageToCloudinary } = require('./upload');

function getDefaultArgs(args) {
  return {
    url: 'https://www.google.com/images/puppy.jpg#anchor?abc=def',
    createNode: jest.fn(() => 'createNode'),
    createNodeId: jest.fn(() => 'createNodeId'),
    createContentDigest: jest.fn(() => 'createContentDigest'),
    reporter: {
      panic: (msg) => {
        throw Error(`[reporter] ${msg}}`);
      },
    },
    parentNode: { id: 'abc-123' },
    overwriteExisting: false,
    ...args,
  };
}

describe('createRemoteImageNode', () => {
  test('requires url', async () => {
    const args = getDefaultArgs();
    delete args.url;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      '[reporter] `url` is a required argument. Pass the URL where the image is currently hosted so it can be downloaded by Cloudinary.'
    );
  });

  test('requires parentNode', async () => {
    const args = getDefaultArgs();
    delete args.parentNode;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      "[reporter] `parentNode` is a required argument. This parameter is used to link a newly created node representing the image to a parent node in Gatsby's GraphQL layer."
    );
  });

  test('requires createContentDigest', async () => {
    const args = getDefaultArgs();
    delete args.createContentDigest;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      "[reporter] `createContentDigest` is a required argument. It's available at `CreateNodeArgs.createContentDigest`."
    );
  });

  test('requires createNode', async () => {
    const args = getDefaultArgs();
    delete args.createNode;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      "[reporter] `createNode` is a required argument. It's available at `CreateNodeArgs.actions.createNode`."
    );
  });

  test('requires createNodeId', async () => {
    const args = getDefaultArgs();
    delete args.createNodeId;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      "[reporter] `createNodeId` is a required argument. It's available at `CreateNodeArgs.createNodeId`."
    );
  });

  test('requires reporter', async () => {
    const args = getDefaultArgs();
    delete args.reporter;

    await expect(createRemoteImageNode(args)).rejects.toThrow(
      "`reporter` is a required argument. It's available at `CreateNodeArgs.reporter`."
    );
  });

  test('calls uploadImageToCloudinary with overwrite from plugin options by default', async () => {
    const args = getDefaultArgs();
    delete args.overwriteExisting;

    const optionOverwrite = 'optionOverwrite';
    getPluginOptions.mockReturnValue({ overwriteExisting: optionOverwrite });
    createImageNode.mockReturnValue({ id: 'image-node-id' });

    await createRemoteImageNode(args);

    const expectedArgs = { overwrite: optionOverwrite };
    expect(uploadImageToCloudinary).toHaveBeenCalledWith(
      expect.objectContaining(expectedArgs)
    );
  });

  test('calls uploadImageToCloudinary with overwrite from args if provided', async () => {
    const argsOverwrite = 'argsOverwrite';
    const args = getDefaultArgs({ overwriteExisting: argsOverwrite });

    const optionOverwrite = 'optionOverwrite';
    getPluginOptions.mockReturnValue({ overwriteExisting: optionOverwrite });
    createImageNode.mockReturnValue({ id: 'image-node-id' });

    await createRemoteImageNode(args);

    const expectedArgs = { overwrite: argsOverwrite };
    expect(uploadImageToCloudinary).toHaveBeenCalledWith(
      expect.objectContaining(expectedArgs)
    );
  });

  test('calls uploadImageToCloudinary with the correct arguments', async () => {
    const imageNodeId = 'image-node-id';
    createImageNode.mockReturnValue({ id: imageNodeId });
    const reporter = 'reporter';
    const args = getDefaultArgs({ reporter });
    await createRemoteImageNode(args);
    const expectedArgs = {
      url: args.url,
      publicId: path.parse(args.url).name,
      reporter,
    };
    expect(uploadImageToCloudinary).toHaveBeenCalledWith(
      expect.objectContaining(expectedArgs)
    );
  });

  test('passes the correct arguments to createImageNode', async () => {
    const args = getDefaultArgs();
    createImageNode.mockReturnValue({ id: 'image-node-id' });
    const cloudinaryUploadResult = 'cloudinaryUploadResult';
    uploadImageToCloudinary.mockReturnValue(cloudinaryUploadResult);

    await createRemoteImageNode(args);

    const expectedArgs = {
      cloudinaryUploadResult,
      parentNode: args.parentNode,
      createContentDigest: args.createContentDigest,
      createNodeId: args.createNodeId,
    };

    expect(createImageNode).toHaveBeenCalledWith(
      expect.objectContaining(expectedArgs)
    );
  });

  test("creates an imageNode in Gatsby's GraphQL layer", async () => {
    const createNode = jest.fn();
    const args = getDefaultArgs({ createNode });
    const createImageNodeResult = 'createImageNodeResult';
    createImageNode.mockReturnValue(createImageNodeResult);

    await createRemoteImageNode(args);
    expect(createNode).toHaveBeenCalledWith(createImageNodeResult, {
      name: 'gatsby-transformer-cloudinary',
    });
  });

  test('returns the image node that it created', async () => {
    const args = getDefaultArgs();
    const imageNodeId = 'image-node-id';
    const imageNode = { id: imageNodeId };
    createImageNode.mockReturnValue(imageNode);

    const actual = await createRemoteImageNode(args);

    expect(actual).toEqual(imageNode);
  });
});
