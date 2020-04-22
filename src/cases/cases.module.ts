import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Case } from '../models/case.model';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import {OfficersModule} from '../officers/officers.module'

@Module({
  imports: [SequelizeModule.forFeature([Case]), OfficersModule],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [SequelizeModule]
})
export class CasesModule {}
