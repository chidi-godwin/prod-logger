import { LogLevel } from 'src/logger/enums/level.enum';
import * as winston from 'winston';

enum LogColors {
  red = '\x1b[31m',
  green = '\x1b[32m',
  yellow = '\x1b[33m',
  blue = '\x1b[34m',
  magenta = '\x1b[35m',
  cyan = '\x1b[36m',
  pink = '\x1b[38;5;206m',
}

export default class ConsoleTransport {
  public static createColorize() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf((log) => {
          const color = this.mapLogLevelColor(log.level as LogLevel);
          const prefix = `${log.prop.label ? `[${log.prop.label}]` : ''}`;
          return `${this.colorize(color, prefix + '  -')} ${log.timestamp}    ${
            log.prop.correlationId
              ? `(${this.colorize(LogColors.cyan, log.prop.correlationId)})`
              : ''
          } ${this.colorize(color, log.level.toUpperCase())} ${
            log.prop.sourceClass
              ? `${this.colorize(LogColors.cyan, `[${log.prop.sourceClass}]`)}`
              : ''
          } ${this.colorize(
            color,
            log.message + ' - ' + (log.error ? log.error : ''),
          )}${
            log.prop.durationMs !== undefined
              ? this.colorize(color, ' +' + log.prop.durationMs + 'ms')
              : ''
          }${
            log.prop.stack ? this.colorize(color, `  - ${log.prop.stack}`) : ''
          }${
            log.data ? `\n  - Data: ${JSON.stringify(log.data, null, 4)}` : ''
          }`;
        }),
      ),
    });
  }

  private static colorize(color: LogColors, message: string): string {
    return `${color}${message}\x1b[0m`;
  }

  private static mapLogLevelColor(level: LogLevel): LogColors {
    switch (level) {
      case LogLevel.Debug:
        return LogColors.blue;
      case LogLevel.Info:
        return LogColors.green;
      case LogLevel.Warn:
        return LogColors.yellow;
      case LogLevel.Error:
        return LogColors.red;
      case LogLevel.Fatal:
        return LogColors.magenta;
      case LogLevel.Emergency:
        return LogColors.pink;
      default:
        return LogColors.cyan;
    }
  }
}
