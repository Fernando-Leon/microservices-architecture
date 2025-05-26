import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { dataSourceOptions } from "db/data-source";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        AddressModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
