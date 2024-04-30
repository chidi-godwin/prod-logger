import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }

  @Get()
  findAll(): string[] {
    return this.appService.findAll();
  }
}
