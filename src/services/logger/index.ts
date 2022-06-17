import { ObjectType } from '../../types';
import { isArray } from '../../utils/isArray';
import { isObject } from '../../utils/isObject';
import { merge } from '../../utils/merge';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

type Message = string;
type Tags = string[];
type Context = ObjectType;
type LogEntetyProperty = (message?: any) => void;

interface LogEntity {
  debug: LogEntetyProperty;
  info: LogEntetyProperty;
  warn: LogEntetyProperty;
  error: LogEntetyProperty;
}

interface LoggerParams {
  logLevel?: LogLevel,
  context?: ObjectType,
  tags?: string[],
  entity?: LogEntity,
}

export class Logger {
  private logLevel: LogLevel;

  private context: Context;

  private tags: Tags;

  private entity: LogEntity;

  constructor(params: LoggerParams) {
    this.logLevel = params.logLevel || LogLevel.DEBUG;
    this.context = params.context || {};
    this.tags = params.tags || [];
    this.entity = params.entity || console;
  }

  private formatLog(message: Message, ...parameters: (Context | Tags)[]): ObjectType {
    const tagsArray = parameters.filter((param) => isArray(param)) as Tags[];
    const contextArray = parameters.filter((param) => isObject(param)) as Context[];
    return merge(this.context, ...contextArray, { message, tags: merge(this.tags, ...tagsArray) });
  }

  /**
   * Calls entity.debug if logLevel >= DEBUG
   */
  public debug(message: Message, ...parameters: (Context | Tags)[]): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      this.entity.debug(this.formatLog(message, ...parameters));
    }
  }

  /**
   * Calls entity.info if logLevel >= INFO
   */
  public info(message: Message, ...parameters: (Context | Tags)[]): void {
    if (this.logLevel >= LogLevel.INFO) {
      this.entity.info(this.formatLog(message, ...parameters));
    }
  }

  /**
   * Calls entity.warn if logLevel >= WARN
   */
  public warn(message: Message, ...parameters: (Context | Tags)[]): void {
    if (this.logLevel >= LogLevel.WARN) {
      this.entity.warn(this.formatLog(message, ...parameters));
    }
  }

  /**
   * Calls entity.error if logLevel >= ERROR
   */
  public error(message: Message, ...parameters: (Context | Tags)[]): void {
    if (this.logLevel >= LogLevel.ERROR) {
      this.entity.error(this.formatLog(message, ...parameters));
    }
  }

  /**
   * Calls entity.error regardless of logLevel and throws new Error(message)
   */
  public throwLoggedError(message: Message, ...parameters: (Context | Tags)[]): void {
    this.entity.error(this.formatLog(message, ...parameters));
    throw new Error(message);
  }

  /**
   * Add context to logger
   */
  public addContext(context: Context) {
    this.context = merge(this.context, context);
  }

  /**
   * Add tags to logger
   */
  public addTags(tags: Tags) {
    this.tags = merge(this.tags, tags);
  }

  /**
   * Returns new logger with current tags and context.
   * Adding tags and context to this new logger will not affect current logger.
   */
  public extend() {
    return new Logger({
      logLevel: this.logLevel,
      tags: this.tags,
      context: this.context,
      entity: this.entity,
    });
  }
}
