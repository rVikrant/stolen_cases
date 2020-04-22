import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { OfficersService } from '../officers/officers.service';

describe('Cases Controller', () => {
  let controller: CasesController,
    officerService: OfficersService,
    caseService: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService, OfficersService ],
    }).compile();

    controller = module.get<CasesController>(CasesController);
    caseService = module.get<CasesService>(CasesService);
    officerService = module.get<OfficersService>(OfficersService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(caseService).toBeDefined();
    expect(officerService).toBeDefined();
  });
});
