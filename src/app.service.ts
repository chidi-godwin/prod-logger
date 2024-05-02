import { Inject, Injectable } from '@nestjs/common';
import Logger, { LoggerKey } from './logger/interfaces/logger.interface';

type Cat = { id: number; name: string };

@Injectable()
export class AppService {
  private readonly cats: Cat[];

  constructor(@Inject(LoggerKey) private readonly logger: Logger) {
    this.cats = [
      {
        id: 1,
        name: 'Cat 1',
      },
      {
        id: 2,
        name: 'Cat 2',
      },
      {
        id: 3,
        name: 'Cat 3',
      },
    ];
  }

  findOne(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  findAll(): Cat[] {
    this.logger.info('returning all cats');
    this.logger.debug('cats', { data: this.cats });
    return this.cats;
  }
}
