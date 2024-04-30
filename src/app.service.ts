import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly cats: { id: number; name: string }[];

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

  findOne(id: number): { id: number; name: string } {
    return this.cats.find((cat) => cat.id === id);
  }

  findAll(): string[] {
    return this.cats.map((cat) => cat.name);
  }
}
