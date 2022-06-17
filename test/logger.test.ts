import { Logger, LogLevel } from '../index';

const mockConsole = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('Logger', () => {
  it('Interprets logLevel DEBUG correctly', () => {
    const logger = new Logger({
      entity: mockConsole,
      logLevel: LogLevel.DEBUG,
    });
    logger.debug('debug-log');
    logger.info('info-log');
    logger.warn('warn-log');
    logger.error('error-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({ message: 'debug-log' });
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect(mockConsole.info).toHaveBeenLastCalledWith({ message: 'info-log' });
    expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockConsole.warn).toHaveBeenLastCalledWith({ message: 'warn-log' });
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'error-log' });
  });
  it('Interprets logLevel INFO correctly', () => {
    const logger = new Logger({
      entity: mockConsole,
      logLevel: LogLevel.INFO,
    });
    logger.debug('debug-log');
    logger.info('info-log');
    logger.warn('warn-log');
    logger.error('error-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(0);
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect(mockConsole.info).toHaveBeenLastCalledWith({ message: 'info-log' });
    expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockConsole.warn).toHaveBeenLastCalledWith({ message: 'warn-log' });
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'error-log' });
  });
  it('Interprets logLevel WARN correctly', () => {
    const logger = new Logger({
      entity: mockConsole,
      logLevel: LogLevel.WARN,
    });
    logger.debug('debug-log');
    logger.info('info-log');
    logger.warn('warn-log');
    logger.error('error-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(0);
    expect(mockConsole.info).toHaveBeenCalledTimes(0);
    expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockConsole.warn).toHaveBeenLastCalledWith({ message: 'warn-log' });
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'error-log' });
  });
  it('Interprets logLevel ERROR correctly', () => {
    const logger = new Logger({
      entity: mockConsole,
      logLevel: LogLevel.ERROR,
    });
    logger.debug('debug-log');
    logger.info('info-log');
    logger.warn('warn-log');
    logger.error('error-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(0);
    expect(mockConsole.info).toHaveBeenCalledTimes(0);
    expect(mockConsole.warn).toHaveBeenCalledTimes(0);
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'error-log' });
  });
  it('Sets logLevel DEBUG on default', () => {
    const logger = new Logger({
      entity: mockConsole,
    });
    logger.debug('debug-log');
    logger.info('info-log');
    logger.warn('warn-log');
    logger.error('error-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({ message: 'debug-log' });
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect(mockConsole.info).toHaveBeenLastCalledWith({ message: 'info-log' });
    expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockConsole.warn).toHaveBeenLastCalledWith({ message: 'warn-log' });
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'error-log' });
  });
  it('addContext', () => {
    const logger = new Logger({
      entity: mockConsole,
    });
    logger.addContext({ someContext: 'foo' });
    logger.debug('debug-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({ message: 'debug-log', someContext: 'foo' });
  });
  it('addTags', () => {
    const logger = new Logger({
      entity: mockConsole,
    });
    logger.addTags(['tagA']);
    logger.debug('debug-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({ message: 'debug-log', tags: ['tagA'] });
  });
  it('Correcly interprets tags and context', () => {
    const logger = new Logger({
      entity: mockConsole,
      context: { someContext: 'foo' },
      tags: ['tagA'],
    });
    logger.debug('debug-log', { moreContext: 'bar' }, ['tagB']);
    logger.info('info-log', { someContext: 'differentValue', moreContext: 'bar' }, ['tagC']);
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({
      message: 'debug-log', tags: ['tagA', 'tagB'], someContext: 'foo', moreContext: 'bar',
    });
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect(mockConsole.info).toHaveBeenLastCalledWith({
      message: 'info-log', tags: ['tagA', 'tagC'], someContext: 'differentValue', moreContext: 'bar',
    });
  });
  it('Extends logger with tags and context', () => {
    const logger = new Logger({
      entity: mockConsole,
      context: { someContext: 'foo' },
      tags: ['tagA'],
    });
    const logger2 = logger.extend();
    logger2.addTags(['tagB']);
    logger2.addContext({ moreContext: 'bar' });
    logger.debug('debug-log');
    logger2.info('info-log');
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    expect(mockConsole.debug).toHaveBeenLastCalledWith({
      message: 'debug-log', tags: ['tagA'], someContext: 'foo',
    });
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect(mockConsole.info).toHaveBeenLastCalledWith({
      message: 'info-log', tags: ['tagA', 'tagB'], someContext: 'foo', moreContext: 'bar',
    });
  });
  it('handles throwLoggedError', () => {
    const logger = new Logger({
      entity: mockConsole,
    });
    let errorMessage = null;
    try {
      logger.throwLoggedError('logged-error');
    } catch (err: any) {
      errorMessage = err.message;
    }
    expect(errorMessage).toStrictEqual('logged-error');
    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    expect(mockConsole.error).toHaveBeenLastCalledWith({ message: 'logged-error' });
  });
  it('uses console as default entity', () => {
    // eslint-disable-next-line no-console
    console.info = jest.fn();
    const logger = new Logger();
    logger.info('some message');
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenLastCalledWith({ message: 'some message' });
  });
});
