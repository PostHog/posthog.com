import Joi from 'joi';
import { testPluginOptionsSchema } from 'gatsby-plugin-utils';
import { pluginOptionsSchema } from './gatsby-node';

describe('pluginOptionsSchema', () => {
  test('should validate minimal correct options', async () => {
    // cloudName, apiKey, apiSecret
    // only needed if uploading
    const options = {};

    const { isValid } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      options
    );

    expect(isValid).toBe(true);
  });

  test('should invalidate incorrect options', async () => {
    const options = {
      cloudName: 120,
      apiKey: '',
      apiSecret: false,
      uploadFolder: ['test'],
      uploadSourceInstanceNames: 'instanceName',
      transformTypes: [123],
      overwriteExisting: 3,
      defaultTransformations: null,
    };

    const { isValid, errors } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      options
    );

    expect(isValid).toBe(false);
    expect(errors).toEqual([
      `"cloudName" must be a string`,
      `"apiKey" is not allowed to be empty`,
      `"apiSecret" must be a string`,
      `"uploadFolder" must be a string`,
      `"uploadSourceInstanceNames" must be an array`,
      `"transformTypes[0]" must be a string`,
      `"overwriteExisting" must be a boolean`,
      `"defaultTransformations" must be an array`,
    ]);
  });

  test('should add defaults', async () => {
    const schema = pluginOptionsSchema({ Joi });
    const options = {
      cloudName: 'cloudName',
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
    };
    const { value } = schema.validate(options);

    expect(value).toEqual({
      ...options,
      transformTypes: ['CloudinaryAsset'],
      overwriteExisting: false,
      defaultTransformations: ['c_fill', 'g_auto', 'q_auto'],
    });
  });
});
