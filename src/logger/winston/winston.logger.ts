import * as winston from 'winston';
import { Inject, Injectable } from '@nestjs/common';
import Logger from '../interfaces/logger.interface';
import { LogLevel } from '../enums/level.enum';
import { LogProperties } from '../interfaces/log.interface';

export const WinstonLoggerTransportsKey = Symbol();

@Injectable()
export default class WinstonLogger implements Logger {
  private logger: winston.Logger;

  public constructor(
    @Inject(WinstonLoggerTransportsKey) transports: winston.transport[],
  ) {
    // Create winston logger
    this.logger = winston.createLogger(this.getLoggerFormatOptions(transports));
  }

  private getLoggerFormatOptions(transports: winston.transport[]) {
    // Setting log levels for winston
    const levels: any = {};
    let cont = 0;
    Object.values(LogLevel).forEach((level) => {
      levels[level] = cont;
      cont++;
    });

    return {
      level: LogLevel.Debug,
      levels: levels,
      format: winston.format.combine(
        // Add timestamp and format the date
        winston.format.timestamp({
          format: 'DD/MM/YYYY, HH:mm:ss',
        }),
        // Errors will be logged with stack trace
        winston.format.errors({ stack: true }),
        // Add custom Log fields to the log
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        winston.format((info, opts) => {
          // Info contains an Error property
          if (info.error && info.error instanceof Error) {
            info.stack = info.error.stack;
            info.error = undefined;
          }

          info.label = `${info.organization}.${info.context}.${info.app}`;

          return info;
        })(),
        // Add custom fields to the data property
        winston.format.metadata({
          key: 'prop',
          fillExcept: ['timestamp', 'level', 'message', 'data', 'error'],
        }),
        // Format the log as JSON
        winston.format.json(),
      ),
      transports: transports,
      exceptionHandlers: transports,
      rejectionHandlers: transports,
    };
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    const logData = {
      level: level,
      message: message instanceof Error ? message.message : message,
      error: message instanceof Error ? message : undefined,
      data,
      ...prop,
    };

    if (profile) {
      this.logger.profile(profile, logData);
    } else {
      this.logger.log(logData);
    }
  }

  public debug(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Debug, message, data, prop, profile);
  }

  public info(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Info, message, data, prop, profile);
  }

  public warn(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Warn, message, data, prop, profile);
  }

  public error(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Error, message, data, prop, profile);
  }

  public fatal(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Fatal, message, data, prop, profile);
  }

  public emergency(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    this.log(LogLevel.Emergency, message, data, prop, profile);
  }

  public startProfile(id: string) {
    this.logger.profile(id);
  }
}
