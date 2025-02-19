import { Node, NodePluginArgs, Reporter } from 'gatsby';

export function createRemoteImageNode(
  args: CreateRemoteImageNodeArgs
): Promise<CloudinaryAssetNode>;

export interface CreateRemoteImageNodeArgs {
  url: string;
  parentNode: Node;
  overwriteExisting?: boolean;
  createContentDigest: NodePluginArgs['createContentDigest'];
  createNode: NodePluginArgs['actions']['createNode'];
  createNodeId: NodePluginArgs['createNodeId'];
  reporter: Reporter;
}

export interface CloudinaryAssetNode extends Node {
  cloudName: string;
  publicId: string;
  version?: number;
  originalHeight?: number;
  originalWidth?: number;
  originalFormat?: string;
  rawCloudinaryData: Object;
}
