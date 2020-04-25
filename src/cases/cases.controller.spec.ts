import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { OfficersService } from '../officers/officers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Case } from '../models/case.model';
import { Officer } from '../models/officer.model';


describe('Cases Controller', () => {
  let controller: CasesController,
    officerService: OfficersService,
    caseService: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasesService, OfficersService],
      controllers: [CasesController],
      imports:[SequelizeModule.forFeature([Case,Officer])]
    }).compile();

    caseService = module.get<CasesService>(CasesService);
    officerService = module.get<OfficersService>(OfficersService);
    controller = module.get<CasesController>(CasesController);

  });

  it('should be defined', (done) => {
    expect(controller).toBeDefined();
    expect(caseService).toBeDefined();
    expect(officerService).toBeDefined();
    done();
  });
});
