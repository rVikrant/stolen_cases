import { Test, TestingModule } from '@nestjs/testing';
import { OfficersService } from './officers.service';
import {Officer} from '../models/officer.model';


describe('OfficersService', () => {
  let service: OfficersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficersService],
      imports: [Officer]
    }).compile();

    service = module.get<OfficersService>(OfficersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
