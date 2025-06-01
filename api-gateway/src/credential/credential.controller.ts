import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { ApiParam, ApiTags, ApiBody, ApiProperty } from '@nestjs/swagger';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateFullCredentialBodyDto {
  @ApiProperty({ type: CreatePersonDto })
  person: CreatePersonDto;

  @ApiProperty({ type: CreateAddressDto })
  address: CreateAddressDto;

  @ApiProperty({ type: CreateCredentialDto })
  credential: CreateCredentialDto;
}

@ApiTags('Credential')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get()
  async getAllCredentialsWithAllData() {
    return this.credentialService.getAllcredentials();
  }

  @Get('curp/:curp')
  @ApiParam({ name: 'curp', type: String, description: 'Obtener credencial por CURP' })
  async getCredentialByCURP(@Param('curp') curp: string) {
    return this.credentialService.getCredentialByCURP(curp);
  }

  @Get('id/:id')
  @ApiParam({ name: 'id', type: String, description: 'Obtener credencial por ID' })
  async getCredentialById(@Param('id') id: string) {
    return this.credentialService.getCredentialById(id);
  }

  // Crear credencial 
  @Post('crear-credencial')
  @ApiBody({ type: CreateFullCredentialBodyDto, description: 'Crear una nueva credencial con persona y dirección' })
  async createFullCredential(@Body() body: CreateFullCredentialBodyDto) {
    const { person, address, credential } = body;
    return await this.credentialService.createFullCredential(person, address, credential);
  }

  // Elimibar credencial por CURP
  @Delete('curp/:curp')
  @ApiParam({ name: 'curp', type: String, description: 'Eliminar credencial por CURP' })
  async deleteCredentialByCURP(@Param('curp') curp: string) {
    return this.credentialService.deleteCredentialByCURP(curp);
  }

  // Actualizar credencial por id de credencial
  @Patch('actualizar-credencial/:credentialId')
  @ApiParam({ name: 'credentialId', type: String, description: 'ID de la credencial a actualizar' })
  @ApiBody({ type: CreateFullCredentialBodyDto, description: 'Actualizar una credencial existente con persona y dirección' })
  async updateCredential(
    @Param('credentialId') credentialId: string,
    @Body() body: CreateFullCredentialBodyDto
  ) {
    const { person, address, credential } = body;
    return this.credentialService.updateCredential(credentialId, person, address, credential);
  }

  // Actualizar credencial por CURP
  @Patch('actualizar-credencial-curp/:curp')
  @ApiParam({ name: 'curp', type: String, description: 'CURP de la credencial a actualizar' })
  @ApiBody({ type: CreateFullCredentialBodyDto, description: 'Actualizar una credencial existente con persona y dirección' })
  async updateCredentialByCURP(
    @Param('curp') curp: string,
    @Body() body: CreateFullCredentialBodyDto
  ) {
    const { person, address, credential } = body;
    return this.credentialService.updateCredentialByCURP(curp, person, address, credential);
  }
}