import { Module } from '@nestjs/common';
import { User } from '../models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
})

@Module({})
export class UsersModule {}
