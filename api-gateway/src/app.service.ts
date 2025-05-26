import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PERSON_SERVICE') private readonly personClient: ClientProxy,
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
    @Inject('CREDENTIAL_SERVICE') private readonly credentialClient: ClientProxy,
  ) {}
  
  getHello(): string {
    return 'API GATEWAY!';
  }

  // Creacion de credencial Microservicio: CREDENTIAL_SERVICE
  async createFullCredential(personDto, addressDto, credentialDto) {
    return this.credentialClient.send('createFullCredential', {
      person: personDto,
      address: addressDto,
      credential: credentialDto,
    }).toPromise();
  }

  // Obtener toddas las credenciales con sus datos asociados 
  async getAllCredentialsWithAllData() {
    return this.credentialClient.send('findAllCredentialsWithAllData', {}).toPromise();
  }

  // Obtener credencial por CURP 
  async getCredentialByCURP(curp: string) {
    return this.credentialClient.send('findCredentialByCURP', curp).toPromise();
  }

  // Eliminar por CURP
  async deleteCredentialByCURP(curp: string) {
    return this.credentialClient.send('deleteCredentialByCURP', curp).toPromise();
  }

  // Obtener persona por ID
  async getPersonById(id: string) {
    return this.personClient.send('findOnePerson', id).toPromise();
  }

  // Obtener todas las personas
  async getAllPersons() {
    return this.personClient.send('findAllPerson', {}).toPromise();
  }
}
