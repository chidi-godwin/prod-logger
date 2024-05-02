import 'winston-daily-rotate-file';
import { DailyRotateFile } from 'winston/lib/winston/transports';

export default class FileTransport {
  public static create() {
    return new DailyRotateFile({
      dirname: 'logs',
      filename: 'log-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });
  }
}
