import { Test, TestingModule } from '@nestjs/testing';
import { ContextStorageService } from './context.service';

describe('ContextService', () => {
  let service: ContextStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContextStorageService],
    }).compile();

    service = module.get<ContextStorageService>(ContextStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
