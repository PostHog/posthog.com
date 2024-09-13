const { resolverReporter } = require('./resolver-reporter');

const gatsbyUtilsMocks = {
  reporter: {
    panicOnBuild: jest.fn(),
    panic: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    verbose: jest.fn(),
  },
};

describe('resolverReporter', () => {
  it('reports only panic', () => {
    const reporter = resolverReporter({
      reporter: gatsbyUtilsMocks.reporter,
      logLevel: 'panic',
    });

    reporter.panicOnBuild('message');
    reporter.panic('message');
    reporter.error('message');
    reporter.warn('message');
    reporter.info('message');
    reporter.verbose('message');

    expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.error).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.warn).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.info).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledTimes(0);
  });

  it('reports only errors and above', () => {
    const reporter = resolverReporter({
      reporter: gatsbyUtilsMocks.reporter,
      logLevel: 'error',
    });

    reporter.panicOnBuild('message');
    reporter.panic('message');
    reporter.error('message');
    reporter.warn('message');
    reporter.info('message');
    reporter.verbose('message');

    expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.error).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.warn).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.info).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledTimes(0);
  });

  it('reports only warnings and above', () => {
    const reporter = resolverReporter({
      reporter: gatsbyUtilsMocks.reporter,
      logLevel: 'warn',
    });

    reporter.panicOnBuild('message');
    reporter.panic('message');
    reporter.error('message');
    reporter.warn('message');
    reporter.info('message');
    reporter.verbose('message');

    expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.error).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.warn).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.info).toBeCalledTimes(0);
    expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledTimes(0);
  });

  it('reports only info and above', () => {
    const reporter = resolverReporter({
      reporter: gatsbyUtilsMocks.reporter,
      logLevel: 'info',
    });

    reporter.panicOnBuild('message');
    reporter.panic('message');
    reporter.error('message');
    reporter.warn('message');
    reporter.info('message');
    reporter.verbose('message');

    expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.error).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.warn).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.info).toBeCalledWith('message');
    expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledTimes(0);
  });

  describe('reports all', () => {
    it('when log level is verbose', () => {
      const reporter = resolverReporter({
        reporter: gatsbyUtilsMocks.reporter,
        logLevel: 'verbose',
      });

      reporter.panicOnBuild('message');
      reporter.panic('message');
      reporter.error('message');
      reporter.warn('message');
      reporter.info('message');
      reporter.verbose('message');

      expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.error).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.warn).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.info).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledWith('message');
    });

    it('when log level is undefined', () => {
      const reporter = resolverReporter({
        reporter: gatsbyUtilsMocks.reporter,
      });

      reporter.panicOnBuild('message');
      reporter.panic('message');
      reporter.error('message');
      reporter.warn('message');
      reporter.info('message');
      reporter.verbose('message');

      expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.panic).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.panicOnBuild).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.error).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.warn).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.info).toBeCalledWith('message');
      expect(gatsbyUtilsMocks.reporter.verbose).toBeCalledWith('message');
    });
  });
});
