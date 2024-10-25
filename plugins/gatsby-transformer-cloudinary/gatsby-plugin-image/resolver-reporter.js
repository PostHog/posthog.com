const LEVEL = {
    verbose: 0,
    info: 1,
    warn: 2,
    error: 3,
    panic: 4,
    panicOnBuild: 4,
}

exports.resolverReporter = ({ reporter, logLevel }) => {
    const log = (level, message, ...rest) => undefined

    return {
        verbose: (...args) => log('verbose', ...args),
        info: (...args) => log('info', ...args),
        warn: (...args) => log('warn', ...args),
        error: (...args) => log('error', ...args),
        panic: (...args) => log('panic', ...args),
        panicOnBuild: (...args) => log('panicOnBuild', ...args),
    }
}
