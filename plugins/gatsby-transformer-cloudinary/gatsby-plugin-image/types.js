const { GraphQLEnumType } = require('gatsby/graphql');

exports.CloudinaryPlaceholderType = new GraphQLEnumType({
  name: `CloudinaryPlaceholder`,
  values: {
    TRACED_SVG: { value: `tracedSVG` },
    BLURRED: { value: `blurred` },
    NONE: { value: `none` },
  },
});
