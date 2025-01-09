exports.CloudinaryAssetType = `
  type CloudinaryAsset implements Node {
    id: ID!
    publicId: String!
    cloudName: String!
    version: String
    originalWidth: Int
    originalHeight: Int
    originalFormat: String
  }
`;
