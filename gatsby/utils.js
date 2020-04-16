// Replacing '/' would result in empty string which is invalid
module.exports = replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
