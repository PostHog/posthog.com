module.exports = function rawSourceLoader(source) {
    return `export default ${JSON.stringify(source)}`
}
