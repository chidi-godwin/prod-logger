import { ConsoleLogger } from '@nestjs/common';
import { LoggerService } from '@nestjs/common/services/logger.service';
import Logger from './interfaces/logger.interface';

export default class LoggerServiceAdapter
  extends ConsoleLogger
  implements LoggerService
{
  public constructor(private logger: Logger) {
    super();
  }

  public log(message: any, ...optionalParams: any[]) {
    return this.logger.info(
      message,
      null,
      this.getLogProperties(optionalParams),
    );
  }

  public error(message: any, ...optionalParams: any[]) {
    return this.logger.error(
      message,
      null,
      this.getLogProperties(optionalParams),
    );
  }

  public warn(message: any, ...optionalParams: any[]) {
    return this.logger.warn(
      message,
      null,
      this.getLogProperties(optionalParams),
    );
  }

  public debug(message: any, ...optionalParams: any[]) {
    return this.logger.debug(
      message,
      null,
      this.getLogProperties(optionalParams),
    );
  }

  public verbose(message: any, ...optionalParams: any[]) {
    return this.logger.info(
      message,
      null,
      this.getLogProperties(optionalParams),
    );
  }

  private getLogProperties(...optionalParams: any[]) {
    return {
      sourceClass: optionalParams[0] ? optionalParams[0] : undefined,
    };
  }
}
