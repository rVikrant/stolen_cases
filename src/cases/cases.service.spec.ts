import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';

describe('CasesService', () => {
  let service: CasesService;
  console.log("serefgdgfdgfd", service, CasesService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasesService],
    }).compile();

    service = await module.get<CasesService>(CasesService);
    console.log("service----", module);
  });

  it('should be defined', () => {
    console.log("service----", service);
    expect(service).toBeDefined();
  });
});
