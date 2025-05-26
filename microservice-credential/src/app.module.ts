import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from "db/data-source";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CredentialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
