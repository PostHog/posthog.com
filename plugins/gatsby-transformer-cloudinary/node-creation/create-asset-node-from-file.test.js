jest.mock('./upload');
jest.mock('./create-image-node');

const { createAssetNodeFromFile } = require('./create-asset-node-from-file');
const { uploadImageNodeToCloudinary } = require('./upload');
const { createImageNode } = require('./create-image-node');

const gatsbyUtilsMock = {
  actions: { createNode: jest.fn(), createParentChildLink: jest.fn() },
  createNodeId: jest.fn(),
  createContentDigest: jest.fn(),
  reporter: jest.fn(),
};

describe('createAssetNodeFromFile', () => {
  beforeEach(() => {
    createImageNode.mockReturnValue({ id: 'image-node' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates an image node and connects it to the node', async () => {
    const node = {
      id: 'node',
      internal: { mediaType: 'image/png' },
    };
    await createAssetNodeFromFile({ node, ...gatsbyUtilsMock });
    expect(createImageNode).toHaveBeenCalledTimes(1);
    expect(gatsbyUtilsMock.actions.createParentChildLink).toBeCalledTimes(1);
    expect(gatsbyUtilsMock.actions.createParentChildLink).toBeCalledWith({
      parent: node,
      child: { id: 'image-node' },
    });
  });

  test('does not create an image node for invalid media type', async () => {
    const node = {
      id: 'node',
      internal: { mediaType: 'image/svg' },
    };
    await createAssetNodeFromFile({ node, ...gatsbyUtilsMock });
    expect(createImageNode).toHaveBeenCalledTimes(0);
    expect(gatsbyUtilsMock.actions.createParentChildLink).toBeCalledTimes(0);
  });

  test('does not create an image node for invalid sourceInstanceName', async () => {
    const node = {
      id: 'node',
      sourceInstanceName: '__PROGRAMMATIC__',
      internal: { mediaType: 'image/png' },
    };
    await createAssetNodeFromFile(
      { node, ...gatsbyUtilsMock },
      { uploadSourceInstanceNames: ['cloudinary'] }
    );
    expect(createImageNode).toHaveBeenCalledTimes(0);
    expect(gatsbyUtilsMock.actions.createParentChildLink).toBeCalledTimes(0);
  });
});
