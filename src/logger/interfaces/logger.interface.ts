import { LogLevel } from '../enums/level.enum';
import { LogProperties } from './log.interface';

export const LoggerBaseKey = Symbol();
export const LoggerKey = Symbol();

export default interface Logger {
  log(
    level: LogLevel,
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  debug(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  info(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  warn(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  error(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  fatal(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  emergency(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ): void;

  startProfile(id: string): void;
}
