import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credential]),
    ClientsModule.register([
      {
        name: 'PERSON_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 }
      },
      {
        name: 'ADDRESS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 }
      }
    ])
],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}
