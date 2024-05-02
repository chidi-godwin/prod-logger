import { Injectable } from '@nestjs/common';

type Cat = { id: number; name: string };

@Injectable()
export class AppService {
  private readonly cats: Cat[];

  constructor() {
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
    return this.cats;
  }
}
