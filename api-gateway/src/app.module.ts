import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
