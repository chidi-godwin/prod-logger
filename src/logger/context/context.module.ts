import { Global, Module } from '@nestjs/common';
import { ContextStorageService } from './context.service';
import { v4 } from 'uuid';
import { ClsModule } from 'nestjs-cls';
import { ContextStorageInterfaceKey } from './interfaces/context.interface';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ContextStorageInterfaceKey,
      useClass: ContextStorageService,
    },
  ],
  exports: [ContextStorageInterfaceKey],
})
export class ContextModule {}
