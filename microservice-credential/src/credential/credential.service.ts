import { Injectable, Inject } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CredentialService {

  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    @Inject('PERSON_SERVICE') private readonly personClient: ClientProxy,
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
  ) {}

  create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const credential = this.credentialRepository.create(createCredentialDto);
    return this.credentialRepository.save(credential);
  }

  async createFullCredential(personDto, addressDto, credentialDto): Promise<Credential> {
    let person, address, credential;
    try {
      // Creamos la persona
      person = await this.personClient.send('createPerson', personDto).toPromise();

      // Creamos la direccion
      addressDto.personId = person.id;
      address = await this.addressClient.send('createAddress', addressDto).toPromise();

      // Creamos la credencial
      credentialDto.personId = person.id;
      credential = await this.create(credentialDto);

      return credential;
    } catch (error) {
      // Compensación: deshacer lo que ya se creó
      if (address && address.id) {
        await this.addressClient.send('removeAddress', address.id).toPromise();
      }
      if (person && person.id) {
        await this.personClient.send('removePerson', person.id).toPromise();
      }
      throw new Error('Error en la creación, se realizó compensación', error);
    }
  }

  async findAllCredentialsWithAllData(): Promise<any[]> {
    // Obtener todas las credenciales
    const credentials = await this.credentialRepository.find();

    const result = await Promise.all(credentials.map(async (credential) => {
      const person = await this.personClient.send('findOnePerson', credential.personId).toPromise();
      const address = await this.addressClient.send('findAddressByPersonId', credential.personId).toPromise();
      return {
        ...credential,
        person,
        address,
      };
    }));

    return result;
  }

  async findCredentialByCURP(curp: string): Promise<any> {
    // Buscar la persona por CURP
    const person = await this.personClient.send('findPersonByCURP', curp).toPromise();
    if (!person || !person.id) {
      return { status: 'error', message: 'Persona no encontrada' };
    }

    // Buscar la credencial por el id de la persona
    const credential = await this.credentialRepository.findOne({
      where: { personId: person.id },
    });
    if (!credential) {
      return { status: 'error', message: 'Credencial no encontrada para la persona' };
    }

    // Buscar la dirección por el id de la persona
    const address = await this.addressClient.send('findAddressByPersonId', person.id).toPromise();

    return {
      status: 'success',
      credential,
      person,
      address,
    };
  }

  async deleteCredentialByCURP(curp: string): Promise<{ status: string; message: string }> {
    // Buscar la persona por CURP
    const person = await this.personClient.send('findPersonByCURP', curp).toPromise();
    if (!person || !person.id) {
      return { status: 'error', message: 'Persona no encontrada' };
    }

    // Buscar la credencial por personId
    const credential = await this.credentialRepository.findOne({
      where: { personId: person.id },
    });
    if (!credential) {
      return { status: 'error', message: 'Credencial no encontrada' };
    }

    // Eliminar la dirección asociada
    await this.addressClient.send('removeAddressByPersonId', person.id).toPromise();

    // Eliminar la persona asociada
    await this.personClient.send('removePerson', person.id).toPromise();

    // Eliminar la credencial
    await this.credentialRepository.delete(credential.id);

    return { status: 'success', message: 'Credencial, persona y dirección eliminadas' };
  }

  findAll(): Promise<Credential[]> {
    return this.credentialRepository.find();
  }

  findOne(id: number): Promise<Credential | null> {
    return this.credentialRepository.findOne({
      where: { id: id.toString() },
    });
  }

  async updateFullCredential(
    credentialId: string,
    personDto,
    addressDto,
    credentialDto
  ): Promise<any> {
    // Buscar la credencial existente
    const credential = await this.credentialRepository.findOne({
      where: { id: credentialId },
    });
    if (!credential) {
      throw new Error('Credencial no encontrada');
    } else {
      console.log('Credencial encontrada:', credential);
    }

    // Actualizar persona
    const person = await this.personClient
      .send('updatePerson', { id: credential.personId, ...personDto })
      .toPromise();

    console.log('Persona actualizada:', person);


    console.log('Dirección a actualizar:', addressDto);

    // Actualizar dirección
    addressDto.personId = credential.personId;
    const address = await this.addressClient
      .send('updateAddressByPersonId', { personId: credential.personId, ...addressDto })
      .toPromise();

    console.log('Dirección actualizada:', address);

    // Actualizar credencial
    await this.credentialRepository.update(credentialId, credentialDto);
    const updatedCredential = await this.credentialRepository.findOne({
      where: { id: credentialId.toString() },
    });

  const updatedPerson = await this.personClient
    .send('findOnePerson', credential.personId)
    .toPromise();

  const updatedAddress = await this.addressClient
    .send('findAddressByPersonId', credential.personId)
    .toPromise();

    return {
      status: 'success',
      credential: updatedCredential,
      person: updatedPerson,
      address: updatedAddress,
    };
  }

  async updateFullCredentialByCURP(
    curp: string,
    personDto,
    addressDto,
    credentialDto
  ): Promise<any> {
    // Buscar la persona por CURP
    const person = await this.personClient.send('findPersonByCURP', curp).toPromise();
    if (!person || !person.id) {
      throw new Error('Persona no encontrada');
    }

    // Buscar la credencial por personId
    const credential = await this.credentialRepository.findOne({
      where: { personId: person.id },
    });
    if (!credential) {
      throw new Error('Credencial no encontrada');
    }

    // Actualizar persona
    await this.personClient
      .send('updatePerson', { id: person.id, ...personDto })
      .toPromise();

    // Actualizar dirección
    addressDto.personId = person.id;
    await this.addressClient
      .send('updateAddressByPersonId', { personId: person.id, ...addressDto })
      .toPromise();

    // Actualizar credencial
    await this.credentialRepository.update(credential.id, credentialDto);

    // Consultar datos actualizados
    const updatedCredential = await this.credentialRepository.findOne({
      where: { id: credential.id.toString() },
    });
    const updatedPerson = await this.personClient
      .send('findOnePerson', person.id)
      .toPromise();
    const updatedAddress = await this.addressClient
      .send('findAddressByPersonId', person.id)
      .toPromise();

    return {
      status: 'success',
      credential: updatedCredential,
      person: updatedPerson,
      address: updatedAddress,
    };
  }
}
