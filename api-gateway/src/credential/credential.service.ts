import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { CreatePersonDto } from "src/person/dto/create-person.dto";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

@Injectable()
export class CredentialService {
  constructor(
    @Inject("CREDENTIAL_SERVICE") private readonly credentialClient: ClientProxy
  ) { }

  // Creacion de credencial Microservicio: CREDENTIAL_SERVICE
  async createFullCredential(personDto: CreatePersonDto, addressDto: CreateAddressDto, credentialDto: CreateCredentialDto) {
    return this.credentialClient.send('createFullCredential', {
      person: personDto,
      address: addressDto,
      credential: credentialDto,
    }).toPromise();
  }

  // Obtener todas las credenciales
  async getAllcredentials() {
    return this.credentialClient
      .send("findAllCredentialsWithAllData", {})
      .toPromise();
  }

  // Obtener credencial por CURP
  async getCredentialByCURP(curp: string) {
    return this.credentialClient
      .send("findCredentialByCURP", curp)
      .toPromise();
  }

  // Obtener credencial por ID
  async getCredentialById(id: string) {
    return this.credentialClient
      .send("findOneCredential", id)
      .toPromise();
  }

  // Eliminar credencial por CURP
  async deleteCredentialByCURP(curp: string) {
    return this.credentialClient
      .send("deleteCredentialByCURP", curp)
      .toPromise();
  }

  // Actualizar credencial por id de credencial
  async updateCredential(credentialId: string, personDto: CreatePersonDto, addressDto: CreateAddressDto, credentialDto: CreateCredentialDto) {
    return this.credentialClient.send('updateFullCredential', {
      id: credentialId,
      person: personDto,
      address: addressDto,
      credential: credentialDto,
    }).toPromise();
  }

  // Actualizar credencial por CURP
  async updateCredentialByCURP(curp: string, personDto: CreatePersonDto, addressDto: CreateAddressDto, credentialDto: CreateCredentialDto) {
    return this.credentialClient.send('updateCredentialByCURP', {
      curp,
      person: personDto,
      address: addressDto,
      credential: credentialDto,
    }).toPromise();
  }
}