import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from "db/data-source";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
