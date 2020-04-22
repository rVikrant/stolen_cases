import { Module } from '@nestjs/common';
import { Officer } from '../models/officer.model';
import { OfficersService } from './officers.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Officer])],
  providers: [OfficersService],
  exports: [OfficersService]
})
export class OfficersModule {}
