import slugify from 'slugify'

export const normalizeSlug = (value = '') => slugify(value, { lower: true, remove: /and/ })
