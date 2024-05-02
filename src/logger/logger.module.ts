import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import * as morgan from 'morgan';
import Logger, {
  LoggerBaseKey,
  LoggerKey,
} from './interfaces/logger.interface';
import WinstonLogger, {
  WinstonLoggerTransportsKey,
} from './winston/winston.logger';
import LoggerService from './logger.service';
import LoggerServiceAdapter from './logger.adapter';
import { ConfigService } from '@nestjs/config';
import ConsoleTransport from './winston/transports/consoleTransport';
import FileTransport from './winston/transports/fileTransport';
import SlackTransport from './winston/transports/slackTransport';
import { ContextModule } from './context/context.module';

@Global()
@Module({
  imports: [ContextModule],
  controllers: [],
  providers: [
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: LoggerService,
    },
    {
      provide: LoggerServiceAdapter,
      useFactory: (logger: Logger) => new LoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
    {
      provide: WinstonLoggerTransportsKey,
      useFactory: (configService: ConfigService) => {
        const transports = [];
        const environment = configService.get<string>('NODE_ENV') ?? 'dev';
        const isProduction = environment === 'prod';
        const slackWebhookUrl = configService.get<string>('SLACK_WEBHOOK_URL');

        transports.push(ConsoleTransport.createColorize());

        transports.push(FileTransport.create());

        if (isProduction) {
          if (slackWebhookUrl) {
            transports.push(SlackTransport.create(slackWebhookUrl));
          }
        }

        return transports;
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerKey, LoggerServiceAdapter],
})
export class LoggerModule implements NestModule {
  public constructor(
    @Inject(LoggerKey) private logger: Logger,
    private configService: ConfigService,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    const environment = this.configService.get<string>('NODE_ENV') ?? 'dev';
    consumer
      .apply(
        morgan(environment ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
