import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import Logger, { LoggerBaseKey } from './interfaces/logger.interface';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from './enums/level.enum';
import { LogProperties } from './interfaces/log.interface';
import { ContextStorageInterfaceKey } from 'src/logger/context/interfaces/context.interface';
import { ContextStorageService } from 'src/logger/context/context.service';

@Injectable({ scope: Scope.TRANSIENT })
export default class LoggerService implements Logger {
  private sourceClass: string;
  private organization: string;
  private context: string;
  private app: string;

  public constructor(
    @Inject(LoggerBaseKey) private logger: Logger,
    configService: ConfigService,
    @Inject(INQUIRER) parentClass: object,
    @Inject(ContextStorageInterfaceKey)
    private contextStorageService: ContextStorageService,
  ) {
    // Set the source class from the parent class
    this.sourceClass = parentClass?.constructor?.name;

    // Set the organization, context and app from the environment variables
    this.organization = configService.get<string>('ORGANIZATION');
    this.context = configService.get<string>('CONTEXT');
    this.app = configService.get<string>('APP');
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.log(
      level,
      message,
      data,
      this.getLogData(prop),
      profile,
    );
  }

  public debug(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.debug(message, data, this.getLogData(prop), profile);
  }

  public info(
    message: string,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.info(message, data, this.getLogData(prop), profile);
  }

  public warn(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.warn(message, data, this.getLogData(prop), profile);
  }

  public error(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.error(message, data, this.getLogData(prop), profile);
  }

  public fatal(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.fatal(message, data, this.getLogData(prop), profile);
  }

  public emergency(
    message: string | Error,
    data?: NodeJS.Dict<any>,
    prop?: LogProperties,
    profile?: string,
  ) {
    return this.logger.emergency(message, data, this.getLogData(prop), profile);
  }

  private getLogData(prop?: LogProperties): LogProperties {
    return {
      ...prop,
      organization: prop?.organization || this.organization,
      context: prop?.context || this.context,
      app: prop?.app || this.app,
      sourceClass: prop?.sourceClass || this.sourceClass,
      correlationId:
        prop?.correlationId || this.contextStorageService.getContextId(),
    };
  }

  public startProfile(id: string) {
    this.logger.startProfile(id);
  }
}
