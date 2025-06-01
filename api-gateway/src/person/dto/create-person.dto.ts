import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellidoPaterno: string;

  @ApiProperty()
  apellidoMaterno: string;
  
  @ApiProperty()
  CURP: string;

  @ApiProperty()
  sexo: string;

  @ApiProperty()
  fechaNacimiento: string;
}
