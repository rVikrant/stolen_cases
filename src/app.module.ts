import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { OfficersModule } from './officers/officers.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.HOST,
      port: parseInt(process.env.DBPORT),
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DBNAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    CasesModule,
    OfficersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
