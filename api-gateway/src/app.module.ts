import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CredentialController } from './credential/credential.controller';
import { CredentialService } from './credential/credential.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
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
      },
      {
        name: 'CREDENTIAL_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 }
      }
    ])
  ],
  controllers: [AppController, AddressController, PersonController, CredentialController],
  providers: [AppService, AddressService, PersonService, CredentialService],
})
export class AppModule {}
