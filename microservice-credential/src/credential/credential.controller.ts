import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

@Controller()
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @MessagePattern('createCredential')
  create(@Payload() createCredentialDto: CreateCredentialDto) {
    return this.credentialService.create(createCredentialDto);
  }

  @MessagePattern('createFullCredential')
  createFullCredential(
    @Payload() { person, address, credential }: { person: any; address: any; credential: CreateCredentialDto }
  ) {
    return this.credentialService.createFullCredential(person, address, credential);
  }

  @MessagePattern('findAllCredentialsWithAllData')
  findAllCredentialsWithAllData() {
    return this.credentialService.findAllCredentialsWithAllData();
  }

  @MessagePattern('findCredentialByCURP')
  findCredentialByCURP(@Payload() curp: string) {
    return this.credentialService.findCredentialByCURP(curp);
  }

  @MessagePattern('findAllCredential')
  findAll() {
    return this.credentialService.findAll();
  }

  @MessagePattern('findOneCredential')
  findOne(@Payload() id: number) {
    return this.credentialService.findOne(id);
  }

  @MessagePattern('updateCredential')
  update(@Payload() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialService.update(updateCredentialDto.id, updateCredentialDto);
  }

  @MessagePattern('removeCredential')
  remove(@Payload() id: number) {
    return this.credentialService.remove(id);
  }

  @MessagePattern('deleteCredentialByCURP')
  deleteCredentialByCURP(@Payload() curp: string) {
    return this.credentialService.deleteCredentialByCURP(curp);
  }
}
