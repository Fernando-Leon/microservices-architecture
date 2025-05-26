import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Crear credencial 
  @Post('crear-credencial')
  async createFullCredential(@Body() body) {
    const { person, address, credential } = body;
    return await this.appService.createFullCredential(person, address, credential);
  }

  // Obtener credenciales
  @Get('obtener-credenciales')
  async getAllCredentialsWithAllData() {
    return await this.appService.getAllCredentialsWithAllData();
  }

  // Obtener credencial por CURP
  @Get('obtener-credencial-curp/:curp')
  async getCredentialByCURP(@Param('curp') curp: string) {
    return await this.appService.getCredentialByCURP(curp);
  }

  // Eliminar credential por CURP
  @Delete('eliminar-credencial-curp/:curp')
  async deleteCredentialByCURP(@Param('curp') curp: string) {
    return await this.appService.deleteCredentialByCURP(curp);
  }
}
